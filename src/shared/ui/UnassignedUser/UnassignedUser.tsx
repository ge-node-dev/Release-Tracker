import React from 'react';

import { AVATAR_WIDTHS_BY_SIZE } from '@/shared/constants';
import { UserIcon } from '@/shared/ui/Icons';

export const UnassignedUser = () => {
   return (
      <UserIcon aria-label="User" width={AVATAR_WIDTHS_BY_SIZE.extraSmall} height={AVATAR_WIDTHS_BY_SIZE.extraSmall} />
   );
};
