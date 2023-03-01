import React from "react";

import { useBasicEditor } from "./useBasicEditor";
import { useUploadImage } from "../useUploadImage";
import { useDropPasteImage } from "./useDropPasteImage";

export const useRichEditor = ({
  placeholder,
  size,
  limit = 1000,
  keyboardShortcuts = [],
  props = {},
} = {}) => {
  const uploadImageProps = useUploadImage();
  const [richBlocks, setRichBlocks] = React.useState([]);

  React.useEffect(() => {
    setRichBlocks(uploadImageProps?.images || []);
  }, [uploadImageProps?.images]);

  const onUploadImageOnPaste = React.useCallback(
    (f) => {
      if (!f) {
        return;
      }
      uploadImageProps?.onImageUpload?.(f).then(({ image } = {}) => {
        if (!image) {
          return;
        }
        setRichBlocks([image]);
        uploadImageProps?.reset();
      });
    },
    [uploadImageProps?.onImageUpload]
  );

  const { extension: DropPasteImageExtension } =
    useDropPasteImage(onUploadImageOnPaste);

  const onClearRichBlocks = React.useCallback(() => {
    setRichBlocks([]);
  }, []);

  const { setContent, getContent, editor } = useBasicEditor({
    size,
    placeholder,
    limit,
    keyboardShortcuts,
    props,
    extensions: [DropPasteImageExtension],
  });

  return {
    setContent,
    getContent,
    editor,
    limit,
    richBlocks,
    uploadImageProps,
    onClearRichBlocks,
  };
};
