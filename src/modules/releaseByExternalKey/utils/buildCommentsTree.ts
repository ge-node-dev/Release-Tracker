import {
   CommentNode,
   ReleaseByExternalKeyType,
   ReleaseComment,
} from '@/modules/releaseByExternalKey/types/releaseTypes';

const getParentId = (comment: ReleaseComment): null | string => {
   if (comment.parent_id === null) return null;
   if (typeof comment.parent_id === 'object' && 'id' in comment.parent_id) {
      return comment.parent_id.id;
   }
   return null;
};

export const buildCommentsTree = (comments: ReleaseByExternalKeyType['comments']): CommentNode[] => {
   const byParentId = new Map<null | string, ReleaseComment[]>();

   for (const comment of comments) {
      const parentId = getParentId(comment);
      const group = byParentId.get(parentId) ?? [];
      group.push(comment);
      byParentId.set(parentId, group);
   }

   const buildNode = (comment: ReleaseComment): CommentNode => ({
      comment,
      replies: (byParentId.get(comment.id) ?? []).map(buildNode),
   });

   const roots = byParentId.get(null) ?? [];
   return roots.map(buildNode);
};
