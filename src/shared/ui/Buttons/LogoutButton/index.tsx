'use client';
import { logoutUserAccount } from '@/modules/auth/services/authActions';
import ActionButton, { type ActionButtonProps } from '@/shared/ui/Buttons/ActionButton';

const LogoutButton = ({
   size = 'medium',
   variant = 'primary',
}: {
   size?: ActionButtonProps['size'];
   variant?: ActionButtonProps['variant'];
}) => {
   return (
      <ActionButton
         size={size}
         variant={variant}
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
