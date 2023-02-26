/* eslint-disable no-inline-comments */
import React from "react";
import { useMutation } from "@apollo/client";

import { EDIT_COMMUNITY } from "../../graphql/mutations/EDIT_COMMUNITY";
import { lazyQueryWithTimeout } from "../lazyQuery";

export const useEditCommunity = () => {
  const [
    _editCommunity,
    {
      loading: editCommunityLoading,
      error: editCommunityError,
      data: editCommunityData,
    },
  ] = useMutation(EDIT_COMMUNITY);

  const onEditCommunity = (
    { communityId, ...props } = {},
    { onCompleted } = {}
  ) => {
    return lazyQueryWithTimeout(
      _editCommunity({
        variables: {
          communityId,
          ...props,
        },
        skip: !communityId,
        onCompleted,
      })
    );
  };
  /** Variables */
  const registerCommunityFailed =
    editCommunityData?.editCommunity?.success === false;

  const loading = editCommunityLoading;

  const error =
    editCommunityError ||
    (registerCommunityFailed && editCommunityData?.editCommunity?.message);

  return {
    onEditCommunity,
    loading: loading,
    error: error,
  };
};
