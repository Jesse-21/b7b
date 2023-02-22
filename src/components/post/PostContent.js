import { Text } from "@chakra-ui/layout";

export const PostContent = ({ blocks, content }) => {
  console.log("PostContent", content);
  return (
    <Text whiteSpace={"pre-wrap"} lineHeight="1">{`${content?.raw}`}</Text>
  );
};

export const PostRichContent = ({ blocks, content }) => {
  return <div>{content?.raw}</div>;
};
