import type { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import { getProfile } from '@/modules/profile/services/profileActions';
import { Avatar } from '@/shared/ui/Avatar';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { ROUTES } from '@/shared/utils/constants';

import CommentForm from './segments/CommentForm';
import CommentList from './segments/CommentsList';

import styles from './CommentsSection.module.scss';

type CommentsSectionProps = {
   releaseId: string;
   externalKey: string;
   comments: ReleaseByExternalKeyType['comments'];
};

const CommentsSection = async ({ comments, releaseId, externalKey }: CommentsSectionProps) => {
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
               <CommentForm releaseId={releaseId} externalKey={externalKey} />
            </div>
         )}
         <CommentList comments={comments} releaseId={releaseId} externalKey={externalKey} />
      </section>
   );
};

export default CommentsSection;
