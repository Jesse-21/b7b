import React from "react";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/alert";

import { useCommunityContext } from "../../context/CommunityContext";
import { useAuthContext } from "../../context/AuthContext";

import { shortenAddress } from "../../helpers/shorten-address";
import { useRegisterCommunity } from "../../helpers/hooks/useRegisterCommunity";

import { GET_COMMUNITY_TOKEN_OWNER_ADDRESS } from "../../graphql/queries/GET_COMMUNITY_TOKEN_OWNER_ADDRESS";

/** Component to Initialize a community */
export const SetupCommunity = ({
  loading,
  isOwner,
  tokenOwnerAddress,
  onRegisterCommunity,
}) => {
  return (
    <Box display={"flex"} flexDir="column">
      <Box>
        {isOwner ? (
          <Alert status="success" rounded="2xl" mb={2}>
            <AlertIcon />
            <Box>
              <AlertDescription>
                You can initialize your dimension as long as your registration
                is active.
                <br />
                <b>Optional:</b> If you wish to change the server URI to host
                your dimension, click here and follow this guide.
              </AlertDescription>
            </Box>
          </Alert>
        ) : (
          <Alert status="warning" rounded="2xl" mb={2}>
            <AlertIcon />
            <Box>
              <AlertDescription>
                Only the owner{" "}
                {tokenOwnerAddress && `(${shortenAddress(tokenOwnerAddress)})`}{" "}
                can initialize a dimension.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Button
          isDisabled={!isOwner}
          isLoading={loading}
          loadingText="Registering"
          onClick={onRegisterCommunity}
        >
          2. Initialize dimension
        </Button>
      </Box>
    </Box>
  );
};

const withCommunityAndAuthContext = (Component) => {
  const Memo = React.memo(Component, (prevProps, nextProps) => {
    return (
      prevProps.loading === nextProps.loading &&
      prevProps.isOwner === nextProps.isOwner &&
      prevProps.tokenOwnerAddress === nextProps.tokenOwnerAddress
    );
  });

  // eslint-disable-next-line react/display-name
  return () => {
    const { activeAddress } = useAuthContext();
    const { community } = useCommunityContext();
    const { onRegisterCommunity, loading: registerCommunityLoading } =
      useRegisterCommunity();
    const { data, loading } = useQuery(GET_COMMUNITY_TOKEN_OWNER_ADDRESS, {
      variables: {
        bebdomain: community?.bebdomain,
        tld: community?.tld || "beb",
      },
      skip: !community?.bebdomain,
    });

    const isOwner = React.useMemo(() => {
      const tokenOwnerAddress =
        data?.CommunityQuery?.getCommunityByDomainOrTokenId?.tokenOwnerAddress;
      if (!tokenOwnerAddress) return false;
      return activeAddress?.toLowerCase() === tokenOwnerAddress?.toLowerCase();
    }, [activeAddress, data]);
    const isLoading = React.useMemo(() => {
      return loading || registerCommunityLoading;
    }, [loading, registerCommunityLoading]);

    const onRegisterCommunityClick = React.useCallback(
      (e) => {
        e.preventDefault();
        onRegisterCommunity(community?.bebdomain, community?.tld);
      },
      [onRegisterCommunity, community?.bebdomain, community?.tld]
    );

    return (
      <Memo
        loading={isLoading}
        isOwner={isOwner}
        tokenOwnerAddress={community?.tokenOwnerAddress}
        onRegisterCommunity={onRegisterCommunityClick}
      />
    );
  };
};

export const SetupCommunityWithContext =
  withCommunityAndAuthContext(SetupCommunity);
