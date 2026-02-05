/* eslint-disable no-console */
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import {
   RELEASE_BY_EXTERNAL_KEY_QUERY,
   RELEASES_OF_THE_WEEK_QUERY,
   RELEASES_QUERY,
} from '@/modules/release/services/query';

interface TestResult {
   name: string;
   error?: string;
   passed: boolean;
   duration: number;
}

const supabase = createSupabaseBrowserClient;

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

const testReleasesQuery = async () => {
   const { error } = await supabase.from('releases').select(RELEASES_QUERY).limit(1);

   if (error) {
      throw new Error(`RELEASES_QUERY failed: ${error.message}`);
   }
};

const testReleaseByExternalKeyQuery = async () => {
   const supabase = createSupabaseBrowserClient;
   const { error } = await supabase.from('releases').select(RELEASE_BY_EXTERNAL_KEY_QUERY).limit(1).maybeSingle();

   if (error) {
      throw new Error(`RELEASE_BY_EXTERNAL_KEY_QUERY failed: ${error.message}`);
   }
};

const testReleasesOfTheWeekQuery = async () => {
   const { error } = await supabase.from('releases').select(RELEASES_OF_THE_WEEK_QUERY).limit(1).maybeSingle();

   if (error) {
      throw new Error(`RELEASES_OF_THE_WEEK_QUERY failed: ${error.message}`);
   }
};

const testGetReleasesListWithPagination = async () => {
   const { error } = await supabase
      .from('releases')
      .select(RELEASES_QUERY)
      .order('release_date', { ascending: false })
      .range(0, 9);

   if (error) {
      throw new Error(`Pagination query failed: ${error.message}`);
   }
};

const testGetReleasesListWithDateFilter = async () => {
   const now = new Date();
   const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

   const { error } = await supabase
      .from('releases')
      .select(RELEASES_QUERY)
      .gte('release_date', weekAgo.toISOString())
      .lte('release_date', now.toISOString())
      .limit(1);

   if (error) {
      throw new Error(`Date filter query failed: ${error.message}`);
   }
};

const testTotalCountQuery = async () => {
   const { error } = await supabase.from('releases').select('id', { head: true, count: 'exact' });

   if (error) {
      throw new Error(`Total count query failed: ${error.message}`);
   }
};

const main = async () => {
   console.log('\n🧪 Running Supabase Query Tests...\n');

   const tests = [
      { fn: testReleasesQuery, name: 'RELEASES_QUERY' },
      { fn: testReleaseByExternalKeyQuery, name: 'RELEASE_BY_EXTERNAL_KEY_QUERY' },
      { fn: testReleasesOfTheWeekQuery, name: 'RELEASES_OF_THE_WEEK_QUERY' },
      { name: 'Pagination Query', fn: testGetReleasesListWithPagination },
      { name: 'Date Filter Query', fn: testGetReleasesListWithDateFilter },
      { fn: testTotalCountQuery, name: 'Total Count Query' },
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

   const passedCount = results.filter((r) => r.passed).length;
   const failedCount = results.filter((r) => !r.passed).length;
   const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

   console.log(`\n📊 Test Summary:`);
   console.log(`   Total: ${results.length}`);
   console.log(`   Passed: ${passedCount}`);
   console.log(`   Failed: ${failedCount}`);
   console.log(`   Duration: ${totalDuration.toFixed(2)}ms\n`);

   if (failedCount > 0) {
      console.error('❌ Some tests failed. Please fix the queries before committing.\n');
      process.exit(1);
   }

   console.log('✅ All query tests passed!\n');
   process.exit(0);
};

main().catch((error) => {
   console.error('\n❌ Test runner failed:', error);
   process.exit(1);
});
