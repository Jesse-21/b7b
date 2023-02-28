import React from "react";
import { VisuallyHidden } from "@chakra-ui/visually-hidden";
import { Image } from "@chakra-ui/image";

// eslint-disable-next-line react/display-name
const Upload = React.forwardRef(({ accept, name, ...inputProps }, ref) => {
  return (
    <VisuallyHidden>
      <input
        ref={ref}
        type="file"
        accept={accept}
        name={name}
        {...inputProps}
      ></input>
    </VisuallyHidden>
  );
});

export const ImageWithUpload = ({
  defaultSrc,
  onImageUpload,
  src,
  loading,
  ...props
}) => {
  const _src = React.useMemo(() => {
    return src || defaultSrc;
  }, [src, defaultSrc]);

  const uploadRef = React.createRef();

  const onUploadClick = () => {
    uploadRef?.current?.click();
  };

  const onChange = (event) => {
    onImageUpload(event.currentTarget.files[0]);
  };

  return (
    <>
      <Image
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
      ></Upload>
    </>
  );
};
