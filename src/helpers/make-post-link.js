export const makePostLink = (post, absolute = false) => {
  if (!post?.community?.bebdomain) return "/";
  const str = `/${post?.community?.bebdomain}.beb/posts/${post._id}`;
  if (absolute) return `${window.location.origin}${str}`;
  return str;
};

export const makePostChannelLink = (post, absolute = false) => {
  if (!post?.community?.bebdomain) return "/";
  let str;
  if (!post?.channel?._id) {
    str = `/${post?.community?.bebdomain}.beb`;
  } else {
    str = `/${post?.community?.bebdomain}.beb/channels/${post?.channel?._id}`;
  }
  if (absolute) return `${window.location.origin}${str}`;
  return str;
};
