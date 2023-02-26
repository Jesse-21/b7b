import React from "react";

import { AdminCommunityBasicWithContext } from "../containers/community/AdminCommunityBasicWithContext";

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
    </>
  );
};

export const DimensionAdmin = withDimensionAdminContext(DimensionAdminContent);
