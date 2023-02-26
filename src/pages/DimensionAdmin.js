import React from "react";

import { AdminCommunityBasicWithContext } from "../containers/community/AdminCommunityBasicWithContext";
import { RolesTableWithContext } from "../containers/roles/RolesTableWithContext";

export const withDimensionAdminContext = (Component) => {
  const Memo = React.memo(Component);

  // query roles and permissions here

  // eslint-disable-next-line react/display-name
  return () => {
    return <Memo />;
  };
};
export const DimensionAdminContent = () => {
  return (
    <>
      <AdminCommunityBasicWithContext />
      <RolesTableWithContext />
    </>
  );
};

export const DimensionAdmin = withDimensionAdminContext(DimensionAdminContent);
