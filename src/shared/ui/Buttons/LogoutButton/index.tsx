'use client';
import { useRouter } from 'next/navigation';

import { createSupabaseStaticClient } from '@/lib/supabase/client';
import ActionButton from '@/shared/ui/Buttons/ActionButton';

const LogoutButton = () => {
   const router = useRouter();

   const handleLogout = async () => {
      const supabase = createSupabaseStaticClient();
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
   };

   return (
      <ActionButton variant="filled" onClick={handleLogout}>
         Logout
      </ActionButton>
   );
};

export default LogoutButton;
