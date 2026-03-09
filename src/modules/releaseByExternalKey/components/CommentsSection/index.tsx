import { getProfile } from '@/modules/profile/services/profileActions';
import { Avatar } from '@/shared/ui/Avatar';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import TextArea from '@/shared/ui/TextArea';
import { ROUTES } from '@/shared/utils/constants';

import styles from './CommentsSection.module.scss';

const CommentsSection = async () => {
   const { profile } = await getProfile();

   return (
      <section className={styles.wrapper}>
         <h3 className={styles.sectionTitle}>COMMENTS</h3>
         {!profile && (
            <div className={styles.signInBlock}>
               <LinkButton href={ROUTES.AUTH} ariaLabel="Sign in">
                  Sing in to leave comments
               </LinkButton>
            </div>
         )}
         {profile && (
            <div className={styles.commentWrapper}>
               <Avatar size="medium" avatarUrl={profile?.avatar_url || null} />
               <TextArea />
            </div>
         )}
      </section>
   );
};

export default CommentsSection;
