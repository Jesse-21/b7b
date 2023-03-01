/* eslint-disable no-inline-comments */
import React from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_CURRENT_ACCOUNT } from "../../graphql/mutations/UPDATE_CURRENT_ACCOUNT";
import { lazyQueryWithTimeout } from "../lazyQuery";

export const useUpdateCurrentAccount = () => {
  const [
    _updateCurrentAccount,
    {
      loading: updateCurrentAccountLoading,
      error: updateCurrentAccountError,
      data: updateCurrentAccountData,
    },
  ] = useMutation(UPDATE_CURRENT_ACCOUNT);

  const onUpdateCurrentAccount = React.useCallback(
    (values) => {
      try {
        return lazyQueryWithTimeout(
          _updateCurrentAccount({
            variables: {
              ...values,
            },
          })
        );
      } catch (e) {
        throw new Error(e);
      }
    },
    [_updateCurrentAccount]
  );

  /** Variables */
  const updateCurrentAccountFailed =
    updateCurrentAccountData?.updateCurrentAccount?.success === false;

  const loading = updateCurrentAccountLoading;

  const error =
    updateCurrentAccountError ||
    (updateCurrentAccountFailed &&
      updateCurrentAccountData?.updateCurrentAccount?.message);

  return {
    onUpdateCurrentAccount,
    loading: loading,
    error: error,
  };
};
