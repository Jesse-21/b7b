import { useMutation } from "@apollo/client";

import { AUTH_BY_SIGNATURE } from "../../graphql/mutations/AUTH_BY_SIGNATURE";

import { lazyQueryWithTimeout } from "../lazyQuery";

export const useSignin = () => {
  const [
    _onSignin,
    { loading: signinLoading, data: signinData, error: signinError },
  ] = useMutation(AUTH_BY_SIGNATURE);

  const onSignin = async ({ address, signature }) => {
    if (!address || !signature) throw new Error("Missing address or signature");
    try {
      return lazyQueryWithTimeout(
        _onSignin({
          variables: {
            address,
            signature,
            // @TODO chain id
            chainId: 1,
          },
          skip: !address || !signature,
        })
      );
    } catch (e) {
      throw new Error(e.message);
    }
  };

  /** Variables */
  const loading = signinLoading;

  const signinFailed = signinData?.authBySignature?.success === false;

  const error =
    signinError || (signinFailed && signinData?.authBySignature?.message);

  return {
    onSignin,
    loading: loading,
    error: error,
    accessToken: signinData?.authBySignature?.accessToken,
    account: signinData?.authBySignature?.account,
  };
};
