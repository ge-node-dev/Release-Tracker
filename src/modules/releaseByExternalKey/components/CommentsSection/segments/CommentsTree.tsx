import type { CommentNode, ReleaseComment } from '@/modules/releaseByExternalKey/types/releaseTypes';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import styles from './CommentsTree.module.scss';

type CommentsTreeProps = {
   isRoot?: boolean;
   node: CommentNode;
   releaseId: string;
   externalKey: string;
   replyingToCommentId: null | string;
   highlightedCommentId: null | string;
   parentComment?: null | ReleaseComment;
   setReplyingToCommentId: (id: null | string) => void;
   setHighlightedCommentId: (id: null | string) => void;
};

const CommentsTree = ({
   node,
   releaseId,
   externalKey,
   isRoot = false,
   replyingToCommentId,
   highlightedCommentId,
   parentComment = null,
   setReplyingToCommentId,
   setHighlightedCommentId,
}: CommentsTreeProps) => {
   const { comment, replies } = node;
   const isReply = !!(typeof comment.parent_id === 'object' && comment.parent_id);

   return (
      <li className={isRoot ? styles.commentListItem : undefined}>
         <CommentItem
            comment={comment}
            isReply={isReply}
            highlightedCommentId={highlightedCommentId}
            parentComment={isReply ? parentComment : null}
            setHighlightedCommentId={setHighlightedCommentId}
            onReply={() => setReplyingToCommentId(comment.id)}
         />
         {replyingToCommentId === comment.id && (
            <div className={styles.replyFormWrapper}>
               <CommentForm
                  parentId={comment.id}
                  releaseId={releaseId}
                  externalKey={externalKey}
                  onSuccess={() => setReplyingToCommentId(null)}
               />
            </div>
         )}
         {replies.length > 0 && (
            <ul className={styles.replyList}>
               {replies.map((replyNode) => (
                  <CommentsTree
                     isRoot={false}
                     node={replyNode}
                     releaseId={releaseId}
                     parentComment={comment}
                     externalKey={externalKey}
                     key={replyNode.comment.id}
                     replyingToCommentId={replyingToCommentId}
                     highlightedCommentId={highlightedCommentId}
                     setReplyingToCommentId={setReplyingToCommentId}
                     setHighlightedCommentId={setHighlightedCommentId}
                  />
               ))}
            </ul>
         )}
      </li>
   );
};

export default CommentsTree;
