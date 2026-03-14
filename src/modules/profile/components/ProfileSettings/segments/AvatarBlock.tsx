import { Avatar } from '@/shared/ui/Avatar';
import ChangeAvatarButton from '@/shared/ui/Buttons/ChangeAvatarButton';

import styles from './AvatarBlock.module.scss';

const AvatarBlock = ({
   userId,
   disabled,
   avatarUrl,
}: {
   userId: string;
   disabled: boolean;
   avatarUrl: null | string;
}) => (
   <div className={styles.avatarBlock}>
      <div className={styles.avatarFrame}>
         <Avatar size="large" avatarUrl={avatarUrl} />
      </div>
      <ChangeAvatarButton userId={userId} disabled={disabled} />
   </div>
);

export default AvatarBlock;
