import React from "react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/alert";
import { Link } from "react-router-dom";

import { useCommunityContext } from "../context/CommunityContext";

import { AccountSettingsWithContext } from "../containers/account/AccountSettingsWithContext";

export const withCommunityContext = (Component) => {
  const Memo = React.memo(Component, (prev, next) => {
    return (
      prev.communityId === next.communityId &&
      prev.communityDomain === next.communityDomain &&
      prev.communityName === next.communityName &&
      prev.communityTld === next.communityTld
    );
  });

  // eslint-disable-next-line react/display-name
  return () => {
    const { community, loading } = useCommunityContext();
    if (loading) return <>Loading...</>;
    if (!community?._id) {
      return (
        <>
          No community found. If you are the owner, go to{" "}
          <Link
            to="admin"
            relative="path"
            style={{ textDecoration: "underscore" }}
          >
            /admin to initiate your community
          </Link>
        </>
      );
    }
    return (
      <Memo
        communityId={community?._id}
        communityDomain={community?.bebdomain}
        communityName={community?.name}
        communityTld={community?.tld}
      />
    );
  };
};
export const SettingsContent = ({
  communityName,
  communityDomain,
  communityTld,
}) => {
  return (
    <>
      <Alert status="success" rounded="2xl" mb={2}>
        <AlertIcon />

        <AlertDescription>
          You are editing your account settings for {communityName} (
          {communityDomain}.{communityTld}). This will not affect your account
          on dimensions hosted by different providers.
        </AlertDescription>
      </Alert>
      <AccountSettingsWithContext />
    </>
  );
};

export const Settings = withCommunityContext(SettingsContent);
