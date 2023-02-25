import React from "react";
import { Navigate } from "react-router-dom";

import { useCommunityContext } from "../../context/CommunityContext";

export const withCommunityAdminContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { community, loading } = useCommunityContext();
    if (loading) return <>Loading...</>;
    if (!community?._id) {
      return (
        <Navigate
          to={`/d/${community?.bebdomain}`}
          state={{ from: location }}
          replace
        />
      );
    }
    if (!community.currentAccountPermissions.canAdmin)
      return <>Only the owner can access the admin page</>;

    return <Memo />;
  };
};
