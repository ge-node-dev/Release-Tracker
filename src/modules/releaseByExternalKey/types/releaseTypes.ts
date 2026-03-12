import { getReleaseByExternalKey } from '../services/releaseByExternalKeyServices';

export type ReleaseComment = ReleaseByExternalKeyType['comments'][number];

export type CommentNode = {
   replies: CommentNode[];
   comment: ReleaseComment;
};

export type CommentsListProps = CommentsSectionProps & {
   authUserId: null | string;
};

export type ReleaseByExternalKeyType = Awaited<ReturnType<typeof getReleaseByExternalKey>>;

export type CommentsSectionProps = {
   releaseId: ReleaseByExternalKeyType['id'];
   comments: ReleaseByExternalKeyType['comments'];
   externalKey: ReleaseByExternalKeyType['external_key'];
};
