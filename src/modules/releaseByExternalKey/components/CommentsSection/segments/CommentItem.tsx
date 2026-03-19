'use client';
import type { ReleaseComment } from '@/modules/releaseByExternalKey/types/releaseTypes';

import Link from 'next/link';

import { Avatar } from '@/shared/ui/Avatar';
import DeleteModal from '@/shared/ui/DeleteModal/DeleteModal';
import { ReplyIcon } from '@/shared/ui/Icons';
import { formatCommentDate } from '@/shared/utils/date/formatCommentDate';

import styles from './CommentItem.module.scss';

type CommentItemProps = {
   isReply?: boolean;
   onReply: () => void;
   comment: ReleaseComment;
   authUserId: null | string;
   highlightedCommentId: null | string;
   parentComment?: null | ReleaseComment;
   handleCommentDelete: () => Promise<boolean>;
   setHighlightedCommentId: (id: null | string) => void;
};

const CommentItem = ({
   comment,
   onReply,
   authUserId,
   isReply = false,
   handleCommentDelete,
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
         <Avatar size="small" alt={username} avatarUrl={avatar_url} />
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
            <div className={styles.commentActions}>
               <button onClick={onReply} aria-label="Reply to comment" className={styles.replyButton}>
                  <ReplyIcon width={16} height={16} />
                  <span>Reply</span>
               </button>

               {authUserId === comment.profiles.id && <DeleteModal handleDelete={handleCommentDelete} />}
            </div>
         </div>
      </article>
   );
};

export default CommentItem;
