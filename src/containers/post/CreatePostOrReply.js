import { IconButton, Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { ChevronRightIcon, ChatIcon } from "@chakra-ui/icons";

import { RichEditor } from "../../components/richText/RichEditor";

import { useErrorToast } from "../../helpers/hooks/useErrorToast";
import { useRichEditor } from "../../helpers/hooks/richText/useRichEditor";
import { useCreatePostOrReply } from "../../helpers/hooks/useCreatePostOrReply";

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
    });

    if (res?.data.createPostOrReplyForAccount?.success && !editor.isDestroyed) {
      callback?.();
    }
  };

  return (
    <Flex flexDir={size === "lg" ? "column" : "row"} alignItems="center">
      <RichEditor
        editor={editor}
        id={id}
        loading={uploadImageProps.loading}
        size={size}
        content={content}
        onImageUpload={uploadImageProps?.onImageUpload}
        setContent={setContent}
        richBlocks={richBlocks}
      ></RichEditor>
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
