import { getReleaseByExternalKey } from '../services/releaseByExternalKeyServices';

export type ReleaseComment = ReleaseByExternalKeyType['comments'][number];

export type CommentNode = {
   replies: CommentNode[];
   comment: ReleaseComment;
};

export type ReleaseByExternalKeyType = Awaited<ReturnType<typeof getReleaseByExternalKey>>;
