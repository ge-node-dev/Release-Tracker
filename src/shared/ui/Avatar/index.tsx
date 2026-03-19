import Image from 'next/image';

import { UserIcon } from '@/shared/ui/Icons';
import { optimizeCloudinaryUrl } from '@/shared/utils/integrations/cloudinary';

import styles from './Avatar.module.scss';

interface AvatarProps {
   alt?: string;
   avatarUrl: null | string;
   size?: 'small' | 'large' | 'medium';
}

export const AVATAR_WIDTHS_BY_SIZE = {
   small: 46,
   large: 278,
   medium: 75,
} as const;

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
