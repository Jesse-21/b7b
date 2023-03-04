export const makePostLink = (post, absolute = false) => {
  if (!post?.community?.bebdomain) return "/";
  const str = `/d/${post?.community?.bebdomain}/posts/${post._id}`;
  if (absolute) return `${window.location.origin}${str}`;
  return str;
};

export const makePostChannelLink = (post, absolute = false) => {
  if (!post?.community?.bebdomain) return "/";
  let str;
  if (!post?.channel?._id) {
    str = `/d/${post?.community?.bebdomain}`;
  } else {
    str = `/d/${post?.community?.bebdomain}/channels/${post?.channel?._id}`;
  }
  if (absolute) return `${window.location.origin}${str}`;
  return str;
};
