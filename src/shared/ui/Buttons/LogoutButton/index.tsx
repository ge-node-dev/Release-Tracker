'use client';
import { logoutUserAccount } from '@/modules/auth/services/authActions';
import ActionButton from '@/shared/ui/Buttons/ActionButton';

const LogoutButton = () => {
   return (
      <ActionButton
         variant="filled"
         onClick={async () => {
            try {
               await logoutUserAccount();
            } finally {
               window.location.href = '/';
            }
         }}
      >
         Logout
      </ActionButton>
   );
};

export default LogoutButton;
