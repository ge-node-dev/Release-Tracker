'use client';
import Image from 'next/image';

import { useAuthModal } from '@/shared/providers/AuthModalProvider';
import { useAuth } from '@/shared/providers/AuthProvider';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import LinkButton from '@/shared/ui/Buttons/LinkButton';

const UserIcon = () => {
   return <Image width={36} alt="Home" height={36} src="/assets/icons/user-circle.svg" />;
};

const HeaderAuthButton = () => {
   const { handleOpen } = useAuthModal();
   const isAuthenticated = useAuth();

   if (isAuthenticated) {
      return (
         <LinkButton href="/profile" ariaLabel="Profile">
            <UserIcon />
         </LinkButton>
      );
   }

   return (
      <ActionButton onClick={handleOpen} variant="transparent">
         <UserIcon />
      </ActionButton>
   );
};

export default HeaderAuthButton;
