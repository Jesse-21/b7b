/* eslint-disable no-inline-comments */
import React from "react";
import { useMutation } from "@apollo/client";

import { REGISTER_COMMUNITY } from "../../graphql/mutations/REGISTER_COMMUNITY";
import { lazyQueryWithTimeout } from "../lazyQuery";

export const useRegisterCommunity = () => {
  const [
    _registerCommunity,
    {
      loading: registerCommunityLoading,
      error: registerCommunityError,
      data: registerCommunityData,
    },
  ] = useMutation(REGISTER_COMMUNITY);

  const onRegisterCommunity = React.useCallback(
    (bebdomain, tld) => {
      try {
        return lazyQueryWithTimeout(
          _registerCommunity({
            variables: {
              bebdomain,
              tld,
            },
            skip: !bebdomain,
          })
        );
      } catch (e) {
        throw new Error(e);
      }
    },
    [_registerCommunity]
  );

  /** Variables */
  const registerCommunityFailed =
    registerCommunityData?.registerCommunity?.success === false;

  const loading = registerCommunityLoading;

  const error =
    registerCommunityError ||
    (registerCommunityFailed &&
      registerCommunityData?.registerCommunity?.message);

  return {
    onRegisterCommunity,
    loading: loading,
    error: error,
  };
};
