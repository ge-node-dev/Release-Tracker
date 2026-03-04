/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';

interface TestResult {
   name: string;
   error?: string;
   passed: boolean;
   duration: number;
}

const TEST_EMAIL = `test_auth_${Date.now()}@test.local`;
const TEST_PASSWORD = 'TestPassword123!';
const TEST_USERNAME = `testuser_${Date.now()}`;

const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
   {
      auth: { persistSession: false, autoRefreshToken: false },
   },
);

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
   auth: { persistSession: false, autoRefreshToken: false },
});

let registeredUserId: null | string = null;

const runTest = async (name: string, testFn: () => Promise<void>): Promise<TestResult> => {
   const startTime = performance.now();
   try {
      await testFn();
      const duration = performance.now() - startTime;
      return { name, duration, passed: true };
   } catch (error) {
      const duration = performance.now() - startTime;
      return {
         name,
         duration,
         passed: false,
         error: error instanceof Error ? error.message : String(error),
      };
   }
};

const testRegisterUser = async () => {
   const { data, error } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
   });

   if (error) {
      throw new Error(`Registration failed: ${error.message}`);
   }

   if (!data.user) {
      throw new Error('Registration returned no user');
   }

   registeredUserId = data.user.id;
};

const testRegisterWithDuplicateEmail = async () => {
   const { data, error } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: 'DifferentPassword999!',
   });

   const isDuplicateHandled = !!error || data.user?.id === registeredUserId;
   if (!isDuplicateHandled) throw new Error('Duplicate email registration should have been blocked');
};

const testLoginWithCorrectCredentials = async () => {
   const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
   });

   if (error) {
      throw new Error(`Login failed: ${error.message}`);
   }

   if (!data.session) {
      throw new Error('Login returned no session');
   }

   await supabase.auth.signOut();
};

const testLogout = async () => {
   const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
   });

   if (error || !data.session) throw new Error(`Pre-logout login failed: ${error?.message}`);

   await supabase.auth.signOut();

   const { data: sessionData } = await supabase.auth.getSession();
   if (sessionData.session) throw new Error('Session should be null after logout');
};

const testLoginWithWrongPassword = async () => {
   const { error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: 'WrongPassword999!',
   });

   if (!error) {
      throw new Error('Login with wrong password should have failed but succeeded');
   }
};

const testSetUsernameOnProfile = async () => {
   if (!registeredUserId) throw new Error('No registered user');

   const { error } = await supabaseAdmin
      .from('profiles')
      .update({ username: TEST_USERNAME })
      .eq('id', registeredUserId);

   if (error) throw new Error(`Failed to set username: ${error.message}`);
};

const testDuplicateUsernameExact = async () => {
   const { data } = await supabase.from('profiles').select('username').ilike('username', TEST_USERNAME).maybeSingle();

   if (!data) throw new Error('Exact duplicate username check failed to detect existing username');
};

const testDuplicateUsernameCaseInsensitive = async () => {
   const { data } = await supabase
      .from('profiles')
      .select('username')
      .ilike('username', TEST_USERNAME.toUpperCase())
      .maybeSingle();

   if (!data) throw new Error('Case-insensitive check failed to detect existing username');
};

const testLoginWithNonExistentEmail = async () => {
   const { error } = await supabase.auth.signInWithPassword({
      password: TEST_PASSWORD,
      email: 'nonexistent_test_user@test.local',
   });

   if (!error) {
      throw new Error('Login with non-existent email should have failed but succeeded');
   }
};

const deleteTestUser = async () => {
   if (!registeredUserId) return;

   const { error } = await supabaseAdmin.auth.admin.deleteUser(registeredUserId);
   if (error) throw new Error(`Failed to delete test user: ${error.message}`);

   registeredUserId = null;
};

const main = async () => {
   if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local\n');
      process.exit(1);
   }

   console.log('\n🧪 Running Auth Tests...\n');
   console.log(`   Test email: ${TEST_EMAIL}\n`);

   const tests = [
      { fn: testRegisterUser, name: 'Register new user' },
      { fn: testRegisterWithDuplicateEmail, name: 'Register with duplicate email (expect blocked)' },
      { fn: testLoginWithCorrectCredentials, name: 'Login with correct credentials' },
      { fn: testLogout, name: 'Logout clears session' },
      { fn: testLoginWithWrongPassword, name: 'Login with wrong password (expect failure)' },
      { fn: testLoginWithNonExistentEmail, name: 'Login with non-existent email (expect failure)' },
      { fn: testSetUsernameOnProfile, name: 'Set username on profile' },
      { fn: testDuplicateUsernameExact, name: 'Duplicate username exact match (expect blocked)' },
      { fn: testDuplicateUsernameCaseInsensitive, name: 'Duplicate username case-insensitive detection' },
   ];

   const results: TestResult[] = [];

   for (const test of tests) {
      const result = await runTest(test.name, test.fn);
      results.push(result);

      if (result.passed) {
         console.log(`✅ ${result.name} - ${result.duration.toFixed(2)}ms`);
      } else {
         console.log(`❌ ${result.name} - ${result.error}`);
      }
   }

   console.log('\n🗑️  Cleaning up test user...');
   try {
      await deleteTestUser();
      console.log('✅ Test user deleted\n');
   } catch (err) {
      console.error(`❌ Cleanup failed: ${err instanceof Error ? err.message : String(err)}\n`);
   }

   const passedCount = results.filter((r) => r.passed).length;
   const failedCount = results.filter((r) => !r.passed).length;
   const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

   console.log('📊 Test Summary:');
   console.log(`   Total: ${results.length}`);
   console.log(`   Passed: ${passedCount}`);
   console.log(`   Failed: ${failedCount}`);
   console.log(`   Duration: ${totalDuration.toFixed(2)}ms\n`);

   if (failedCount > 0) {
      console.error('❌ Some tests failed.\n');
      process.exit(1);
   }

   console.log('✅ All auth tests passed!\n');
   process.exit(0);
};

main().catch((error) => {
   console.error('\n❌ Test runner failed:', error);

   const cleanup = registeredUserId
      ? deleteTestUser().catch((err) => console.error('Cleanup also failed:', err))
      : Promise.resolve();

   cleanup.finally(() => process.exit(1));
});
