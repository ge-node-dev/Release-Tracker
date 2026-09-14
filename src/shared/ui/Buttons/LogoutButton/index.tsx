'use client';
import { useRouter } from 'next/navigation';

import { logoutUserAccount } from '@/modules/auth/services/authActions';
import ActionButton, { type ActionButtonProps } from '@/shared/ui/Buttons/ActionButton';

const LogoutButton = ({
   size = 'medium',
   disabled = false,
   variant = 'primary',
}: {
   disabled?: boolean;
   size?: ActionButtonProps['size'];
   variant?: ActionButtonProps['variant'];
}) => {
   const router = useRouter();

   return (
      <ActionButton
         size={size}
         variant={variant}
         disabled={disabled}
         onClick={async () => {
            try {
               await logoutUserAccount();
            } finally {
               router.push('/');
            }
         }}
      >
         Logout
      </ActionButton>
   );
};

export default LogoutButton;
