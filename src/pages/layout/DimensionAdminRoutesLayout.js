import React from "react";

import { useCommunityContext } from "../../context/CommunityContext";

import { SetupCommunityWithContext } from "../../containers/community/SetupCommunityWithContext";

export const withCommunityAdminContext = (Component) => {
  const Memo = React.memo(Component);
  const SetupCommunityWithContextMemo = React.memo(SetupCommunityWithContext);

  // eslint-disable-next-line react/display-name
  return () => {
    const { community, loading } = useCommunityContext();
    console.log("withCommunityAdminContext", community, loading);
    if (loading) return <>Loading...</>;
    if (!community?._id) {
      return <SetupCommunityWithContextMemo />;
    }
    if (!community.currentAccountPermissions.canAdmin)
      return <>Only the owner can access the admin page</>;

    return <Memo />;
  };
};
