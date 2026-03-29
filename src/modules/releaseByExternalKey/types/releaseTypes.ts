import { type Profile } from '@/modules/profile/types/profileTypes';

import { getReleaseByExternalKey } from '../services/releaseByExternalKeyServices';

export type ReleaseComment = ReleaseByExternalKeyType['comments'][number];

export type CommentNode = {
   replies: CommentNode[];
   comment: ReleaseComment;
};

export type ReleaseByExternalKeyType = Awaited<ReturnType<typeof getReleaseByExternalKey>>;

export type CommentsListProps = Omit<CommentsSectionProps, 'userProfile'> & {
   authUserId: null | string;
};

export type CommentsSectionProps = {
   userProfile: null | Profile;
   releaseId: ReleaseByExternalKeyType['id'];
   comments: ReleaseByExternalKeyType['comments'];
   externalKey: ReleaseByExternalKeyType['external_key'];
};
