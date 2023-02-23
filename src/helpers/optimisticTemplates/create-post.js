import { getCurrentAccount } from "../cache/get-current-account";
import { getCommunity } from "../cache/get-community";
import { getPostWithParent } from "../cache/get-post-with-parent";
import { getChannel } from "../cache/get-channel";
import { ObjectId } from "../make-object-id";

export const makeOptimisticPost = ({
  _id,
  contentRaw,
  contentHtml,
  communityId,
  parentId,
  channelId,
} = {}) => {
  return {
    __typename: "Post",
    _id: _id || ObjectId(),
    createdAt: new Date().getTime(),
    reactionCount: 0,
    commentCount: 0,
    rootCommentCount: 0,
    isHidden: false,
    richContent: {
      __typename: "RichContent",
      _id: ObjectId(),
      content: {
        html: contentHtml,
        raw: contentRaw,
      },
      blocks: [],
    },
    account: getCurrentAccount()?.getCurrentAccount || {
      _id: ObjectId(),
      __typename: "Account",
    },
    channel: channelId ? getChannel(channelId) : null,
    community: communityId ? getCommunity(communityId) : null,
    currentAccountPermissions: {
      _id: ObjectId(),
      __typename: "PostCurrentAccountPermissions",
      canRead: true,
    },
    parent: parentId
      ? getPostWithParent(parentId) || {
          _id: parentId,
          __typename: "Post",
          account: {
            _id: ObjectId(),
            __typename: "Account",
          },
        }
      : null,
  };
};
