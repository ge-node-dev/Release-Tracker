import type { ReleaseComment } from '@/modules/releaseByExternalKey/types/releaseTypes';

import Link from 'next/link';

import { Avatar } from '@/shared/ui/Avatar';
import { ReplyIcon } from '@/shared/ui/Icons';
import { formatCommentDate } from '@/shared/utils/date/formatCommentDate';

import styles from './CommentItem.module.scss';

type CommentItemProps = {
   isReply?: boolean;
   onReply: () => void;
   comment: ReleaseComment;
   highlightedCommentId: null | string;
   parentComment?: null | ReleaseComment;
   setHighlightedCommentId: (id: null | string) => void;
};

const CommentItem = ({
   comment,
   onReply,
   isReply = false,
   highlightedCommentId,
   parentComment = null,
   setHighlightedCommentId,
}: CommentItemProps) => {
   const { username, avatar_url } = comment.profiles;
   const parentUsername = parentComment?.profiles?.username;
   const isHighlighted = highlightedCommentId === comment.id;

   return (
      <article
         className={`${isReply ? styles.commentItemReply : styles.commentItem} ${isHighlighted ? styles.highlighted : ''}`}
      >
         <Avatar size="small" avatarUrl={avatar_url} />
         <div className={styles.commentBody}>
            <header className={styles.commentHeader}>
               <Link href={`/profile/${username}`} className={styles.commentAuthor}>
                  {username}
               </Link>
               {parentUsername && (
                  <span
                     className={styles.replyTo}
                     onMouseLeave={() => setHighlightedCommentId(null)}
                     onMouseEnter={() => setHighlightedCommentId(parentComment!.id)}
                  >
                     Reply to {parentUsername}
                  </span>
               )}
               <time className={styles.commentDate} dateTime={comment.created_at ?? undefined}>
                  {formatCommentDate(comment.created_at)}
               </time>
            </header>
            <p className={styles.commentContent}>{comment.content}</p>
            <button onClick={onReply} aria-label="Reply to comment" className={styles.replyButton}>
               <ReplyIcon width={14} height={14} />
               <span>Reply</span>
            </button>
         </div>
      </article>
   );
};

export default CommentItem;
