import Image from 'next/image';

import { AVATAR_WIDTHS_BY_SIZE } from '@/shared/constants';
import { UserIcon } from '@/shared/ui/Icons';
import { optimizeCloudinaryUrl } from '@/shared/utils/integrations/cloudinary';

import styles from './Avatar.module.scss';

interface AvatarProps {
   alt?: string;
   avatarUrl: null | string;
   size?: keyof typeof AVATAR_WIDTHS_BY_SIZE;
}

export const Avatar = ({ avatarUrl, alt = 'avatar', size = 'small' }: AvatarProps) => {
   const image = avatarUrl ? (
      <Image
         alt={alt}
         className={styles.avatarImg}
         width={AVATAR_WIDTHS_BY_SIZE[size]}
         height={AVATAR_WIDTHS_BY_SIZE[size]}
         src={optimizeCloudinaryUrl(avatarUrl)}
         sizes={`${AVATAR_WIDTHS_BY_SIZE[size]}px`}
      />
   ) : (
      <UserIcon className={styles.avatarPlaceholder} />
   );

   return <div className={`${styles.avatarSquare} ${styles[size]}`}>{image}</div>;
};
