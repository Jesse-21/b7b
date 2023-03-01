/* eslint-disable no-undef */
import React from "react";

export const useUploadImage = () => {
  const [images, setImages] = React.useState([]);
  const [loading, toggleLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const _beforeUploadCheck = React.useCallback((f) => {
    if (!f) {
      return "No file selected";
    }
    if (f.size && f.size > 1024 * 1024 * 10) {
      return "File must be less than 10 MB";
    }
    return null;
  }, []);

  const _onImageUpload = React.useCallback(
    async (f) => {
      const _error = _beforeUploadCheck(f);
      if (_error) throw new Error(_error);
      try {
        const formData = new FormData();
        formData.append("files", f);
        let uri = window.hostUri?.toString?.();
        uri = uri.replace(/\/graphql$/, "");
        const res = await fetch(`${uri}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const resjson = await res.json();
        if (resjson?.image) {
          return resjson.image;
        } else {
          throw new Error(resjson?.message);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    },
    [_beforeUploadCheck]
  );

  const onImageUpload = async (files = [], reset = true) => {
    const targets = files?.length ? files : [files];
    toggleLoading(true);
    setError(null);
    try {
      const promises = await Promise.all(
        targets.map(async (target) => {
          return await _onImageUpload(target);
        })
      );
      if (reset) {
        setImages(promises);
      } else {
        setImages((_images) => [..._images, ...promises]);
      }
      toggleLoading(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const reset = () => {
    setImages([]);
    setError(null);
  };

  return {
    onImageUpload,
    error: error,
    loading: loading,
    image: images?.[0],
    images,
    reset,
  };
};
