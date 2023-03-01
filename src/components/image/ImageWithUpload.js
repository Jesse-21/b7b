import React from "react";
import { VisuallyHidden } from "@chakra-ui/visually-hidden";
import { Image } from "@chakra-ui/image";

// eslint-disable-next-line react/display-name
const Upload = React.forwardRef(
  ({ accept, name, allowMultiple, ...inputProps }, ref) => {
    return (
      <VisuallyHidden>
        <input
          ref={ref}
          type="file"
          accept={accept}
          name={name}
          {...inputProps}
          multiple={allowMultiple}
        ></input>
      </VisuallyHidden>
    );
  }
);

export const ImageWithUpload = ({
  defaultSrc,
  onImageUpload,
  src,
  loading,
  allowMultiple = false,
  ...props
}) => {
  const _src = React.useMemo(() => {
    return src || defaultSrc;
  }, [src, defaultSrc]);

  const uploadRef = React.createRef();

  const onUploadClick = () => {
    uploadRef?.current?.click();
  };

  const onChange = React.useCallback(
    (event) => {
      if (!onImageUpload) return;
      const target = allowMultiple
        ? [...event.target.files]
        : event.target.files[0];
      onImageUpload(target);
    },
    [onImageUpload, allowMultiple]
  );

  return (
    <>
      <Image
        _hover={{ cursor: "pointer" }}
        onClick={onUploadClick}
        src={_src}
        opacity={loading ? 0.5 : 1}
        {...props}
      ></Image>
      <Upload
        accept="image/JPEG,image/PNG,image/GIF"
        name="files"
        ref={uploadRef}
        onClick={(event) => (event.target.value = null)}
        onChange={onChange}
        allowMultiple={allowMultiple}
      ></Upload>
    </>
  );
};
