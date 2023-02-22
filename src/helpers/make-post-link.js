export const makePostLink = (post, absolute = false) => {
  if (!post?.community?.bebdomain) return "/";
  const str = `/#/d/${post?.community?.bebdomain}/posts/${post._id}`;
  if (absolute) return `${window.location.origin}${str}`;
  return str;
};
