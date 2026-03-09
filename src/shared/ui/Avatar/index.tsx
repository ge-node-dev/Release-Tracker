import Image from 'next/image';

import { UserIcon } from '@/shared/ui/Icons';
import { optimizeCloudinaryUrl } from '@/shared/utils/integrations/cloudinary';

import styles from './Avatar.module.scss';

interface AvatarProps {
   avatarUrl: null | string;
   size?: 'small' | 'large' | 'medium';
}

export const Avatar = ({ avatarUrl, size = 'small' }: AvatarProps) => {
   const image = avatarUrl ? (
      <Image
         width={278}
         height={278}
         alt="avatar"
         sizes="278px"
         className={styles.avatarImg}
         src={optimizeCloudinaryUrl(avatarUrl)}
      />
   ) : (
      <UserIcon className={styles.avatarPlaceholder} />
   );

   return <div className={`${styles.avatarSquare} ${styles[size]}`}>{image}</div>;
};
