'use client';

import type { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import { useState } from 'react';

import { buildCommentsTree } from '@/modules/releaseByExternalKey/utils/buildCommentsTree';

import CommentsTree from './CommentsTree';

import styles from './CommentsList.module.scss';

type CommentListProps = {
   releaseId: string;
   externalKey: string;
   comments: ReleaseByExternalKeyType['comments'];
};

const CommentList = ({ comments, releaseId, externalKey }: CommentListProps) => {
   const commentsTree = buildCommentsTree(comments);
   const [highlightedCommentId, setHighlightedCommentId] = useState<null | string>(null);
   const [replyingToCommentId, setReplyingToCommentId] = useState<null | string>(null);

   return (
      <ul className={styles.commentList}>
         {commentsTree.map((node) => (
            <CommentsTree
               node={node}
               key={node.comment.id}
               releaseId={releaseId}
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
