import React from "react";
import { Box } from "@chakra-ui/layout";
import { AdminCommunityBasicWithContext } from "../containers/community/AdminCommunityBasicWithContext";
import { RolesTableWithContext } from "../containers/roles/RolesTableWithContext";
import { RoleEditModalWithContext } from "../containers/roles/RoleEditModalWithContext";

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
    <Box p={[2, null, null, 4]}>
      <AdminCommunityBasicWithContext />
      <Box mt={8}>
        <RolesTableWithContext />
      </Box>
      <RoleEditModalWithContext />
    </Box>
  );
};

export const DimensionAdmin = withDimensionAdminContext(DimensionAdminContent);
