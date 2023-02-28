/* eslint-disable no-undef */
import React from "react";

export const useUploadImageOrNft = () => {
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [loading, toggleLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const _beforeUploadCheck = (f) => {
    if (!f) {
      setError("No file selected");
      return false;
    }
    if (f.size && f.size > 1024 * 1024 * 10) {
      setError("File must be less than 10 MB");
      return false;
    }
    return true;
  };

  const onImageUpload = async (f) => {
    if (!_beforeUploadCheck(f)) return;
    setFile(f);
    toggleLoading(true);
    setError(null);
    setImage(null);
    try {
      const formData = new FormData();
      formData.append("files", f);
      const res = await fetch(`${window.hostUri}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const resjson = await res.json();
      toggleLoading(false);
      if (resjson.image) {
        setImage(resjson.image);
        setLastUploaded(UPLOAD_TYPES.IMAGE);
      } else {
        setError(resjson.message);
        setFile(null);
        logError(new Error(resjson.message), {
          functionName: "onImageUpload",
          errorDisplayed: resjson.message,
        });
      }
      return resjson;
    } catch (e) {
      logError(e, {
        functionName: "onImageUpload",
        errorDisplayed: e.message,
      });
      setFile(null);
      toggleLoading(false);
      setError(e.message);
    }
  };

  const reset = () => {
    setFile(null);
    setImage(null);
    setError(null);
  };

  return {
    file,
    onImageUpload,
    error: error || NFTError,
    loading: loading || NFTLoading,
    image,
    reset,
  };
};
