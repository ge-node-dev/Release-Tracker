'use client';

import type { CommentsListProps } from '@/modules/releaseByExternalKey/types/releaseTypes';

import { useState } from 'react';

import { buildCommentsTree } from '@/modules/releaseByExternalKey/utils/buildCommentsTree';

import CommentsTree from './CommentsTree';

import styles from './CommentsList.module.scss';

const CommentList = ({ comments, releaseId, authUserId, externalKey }: CommentsListProps) => {
   const commentsTree = buildCommentsTree(comments);
   const [highlightedCommentId, setHighlightedCommentId] = useState<null | string>(null);
   const [replyingToCommentId, setReplyingToCommentId] = useState<null | string>(null);

   if (commentsTree.length === 0) {
      return null;
   }

   return (
      <ul className={styles.commentList}>
         {commentsTree.map((node) => (
            <CommentsTree
               node={node}
               key={node.comment.id}
               releaseId={releaseId}
               authUserId={authUserId}
               externalKey={externalKey}
               replyingToCommentId={replyingToCommentId}
               highlightedCommentId={highlightedCommentId}
               setReplyingToCommentId={setReplyingToCommentId}
               setHighlightedCommentId={setHighlightedCommentId}
            />
         ))}
      </ul>
   );
};

export default CommentList;
