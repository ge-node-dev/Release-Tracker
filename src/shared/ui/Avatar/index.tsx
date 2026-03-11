import Image from 'next/image';

import { UserIcon } from '@/shared/ui/Icons';
import { optimizeCloudinaryUrl } from '@/shared/utils/integrations/cloudinary';

import styles from './Avatar.module.scss';

interface AvatarProps {
   avatarUrl: null | string;
   size?: 'small' | 'large' | 'medium';
}

const WIDTHS_BY_SIZE = {
   small: 36,
   large: 278,
   medium: 54,
} as const;

export const Avatar = ({ avatarUrl, size = 'small' }: AvatarProps) => {
   const image = avatarUrl ? (
      <Image
         alt="avatar"
         width={WIDTHS_BY_SIZE[size]}
         className={styles.avatarImg}
         height={WIDTHS_BY_SIZE[size]}
         sizes={`${WIDTHS_BY_SIZE[size]}px`}
         src={optimizeCloudinaryUrl(avatarUrl)}
      />
   ) : (
      <UserIcon className={styles.avatarPlaceholder} />
   );

   return <div className={`${styles.avatarSquare} ${styles[size]}`}>{image}</div>;
};
