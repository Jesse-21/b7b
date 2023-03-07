import React from "react";
import debounce from "lodash/debounce";
import { IconButton, Button } from "@chakra-ui/button";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { ChevronRightIcon, ChatIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";

import { RichEditor } from "../../components/richText/RichEditor";

import { useErrorToast } from "../../helpers/hooks/useErrorToast";
import { useRichEditor } from "../../helpers/hooks/richText/useRichEditor";
import { useCreatePostOrReply } from "../../helpers/hooks/useCreatePostOrReply";

import { getDimensionHostUri } from "../../helpers/make-apollo-client";

export const CreatePostOrReply = ({
  parentId,
  content,
  communityId,
  placeholder,
  disabled,
  size = "lg",
  colorScheme = "purple",
  id,
  channelId,
  // eslint-disable-next-line no-empty-function
  callback = () => {},
  editorProps = {},
  uri,
}) => {
  const { loading, error, createPostOrReply } = useCreatePostOrReply();
  useErrorToast(error);

  const {
    getContent,
    editor,
    uploadImageProps,
    onClearRichBlocks,
    setContent,
    richBlocks,
  } = useRichEditor({
    size,
    placeholder,
    limit: 2000,
    props: editorProps,
  });

  const onSubmitPostOrReply = async () => {
    if (loading) return;
    const blocks = (richBlocks || []).map((rb) => ({
      blockId: rb._id,
      blockType: "IMAGE",
    }));

    const { html, json, raw } = getContent();

    try {
      editor?.commands?.clearContent();
      onClearRichBlocks?.();
    } catch (e) {
      // this happens when the editor is destroyed on dev? see https://github.com/ueberdosis/tiptap/issues/1451
    }

    const res = await createPostOrReply({
      contentRaw: raw,
      contentJson: json,
      contentHtml: html,
      channelId,
      blocks,
      parentId,
      communityId,
      uri,
    });

    if (res?.data.createPostOrReplyForAccount?.success && !editor.isDestroyed) {
      callback?.();
    }
  };

  return (
    <Flex
      flexDir={size === "lg" ? "column" : "row"}
      alignItems="center"
      maxW="lg"
      m="auto"
    >
      <RichEditor
        editor={editor}
        id={id}
        loading={uploadImageProps.loading}
        size={size}
        content={content}
        onImageUpload={uploadImageProps?.onImageUpload}
        setContent={setContent}
        richBlocks={richBlocks}
        footer={
          <>
            {size === "lg" && (
              <Button
                onClick={onSubmitPostOrReply}
                isDisabled={loading || disabled}
                colorScheme={colorScheme}
                size={"md"}
                rounded="full"
                leftIcon={<ChatIcon />}
              >
                {parentId ? "Comment" : "Send"}
              </Button>
            )}
          </>
        }
      ></RichEditor>
      {size === "sm" && (
        <IconButton
          ml={2}
          icon={<ChevronRightIcon />}
          onClick={onSubmitPostOrReply}
          isDisabled={loading || disabled}
          colorScheme={colorScheme}
          size={"md"}
          rounded="2xl"
        ></IconButton>
      )}
    </Flex>
  );
};

const ChangeCommunity = ({ bebdomain, setUri, setLoading }) => {
  const debounceGetUri = React.useCallback(
    debounce(() => {
      getDimensionHostUri(bebdomain).then((uri) => {
        setUri(uri?.toString());
        setLoading(false);
      });
    }, 300),
    [bebdomain, setUri, setLoading]
  );

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (mounted) {
      debounceGetUri();
    }

    return () => {
      mounted = false;
    };
  }, [bebdomain]);

  return <></>;
};

export const CreatePostOrReplyWithSelectCommunity = ({
  size,
  bebdomain,
  ...props
}) => {
  const [selectedBebDomain, setSelectedBebDomain] = React.useState(
    bebdomain || "playground"
  );
  const [uri, setUri] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <Box>
      <ChangeCommunity
        bebdomain={selectedBebDomain}
        setUri={setUri}
        setLoading={setLoading}
      />
      <Text color="text.secondary" lineHeight={1.2} mb={1}>
        Choose a community. Examples:{" "}
        <Text
          as="span"
          onClick={() => setSelectedBebDomain("playground")}
          _hover={{ cursor: "pointer" }}
          color="blue.500"
        >
          playground
        </Text>
        ,{" "}
        <Text
          as="span"
          onClick={() => setSelectedBebDomain("wholesome-memes")}
          _hover={{ cursor: "pointer" }}
          color="blue.500"
        >
          wholesome-memes
        </Text>
        ,{" "}
        <Text
          as="span"
          onClick={() => setSelectedBebDomain("music")}
          _hover={{ cursor: "pointer" }}
          color="blue.500"
        >
          music
        </Text>
      </Text>
      <InputGroup size={size} mb={2}>
        <Input
          placeholder="Input a community"
          value={selectedBebDomain}
          onChange={(e) => setSelectedBebDomain(e.target.value)}
        ></Input>
        <InputRightAddon>.beb</InputRightAddon>
      </InputGroup>
      <CreatePostOrReply {...props} size={size} disabled={loading} uri={uri} />
    </Box>
  );
};
