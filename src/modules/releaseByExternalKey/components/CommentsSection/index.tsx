import type { CommentsSectionProps } from '@/modules/releaseByExternalKey/types/releaseTypes';

import { Avatar } from '@/shared/ui/Avatar';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { ROUTES } from '@/shared/utils/constants';

import CommentForm from './segments/CommentForm';
import CommentList from './segments/CommentsList';

import styles from './CommentsSection.module.scss';

const CommentsSection = ({ comments, releaseId, externalKey, userProfile }: CommentsSectionProps) => {
   return (
      <section className={styles.wrapper}>
         <h3 className={styles.sectionTitle}>COMMENTS</h3>
         {!userProfile && (
            <div>
               <LinkButton href={ROUTES.AUTH} ariaLabel="Sign in">
                  Sing in to leave comments
               </LinkButton>
            </div>
         )}
         {userProfile && (
            <div className={styles.commentWrapper}>
               <Avatar size="small" alt={userProfile.username} avatarUrl={userProfile.avatar_url || null} />
               <CommentForm releaseId={releaseId} disabledOpenBtn={false} externalKey={externalKey} />
            </div>
         )}
         <CommentList
            comments={comments}
            releaseId={releaseId}
            externalKey={externalKey}
            authUserId={userProfile?.id ?? null}
         />
      </section>
   );
};

export default CommentsSection;
