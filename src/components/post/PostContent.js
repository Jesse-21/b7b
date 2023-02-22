import { Text, Box } from "@chakra-ui/layout";

/** @TODO while the post don't have title, use the sliced content as title */
export const PostContent = ({ blocks, content }) => {
  return (
    <Text whiteSpace={"pre-wrap"} lineHeight="1">{`${content?.raw}`}</Text>
  );
};

export const PostRichContent = ({ blocks, content }) => {
  return <div>{content?.raw}</div>;
};
