import React from "react";
import { useQuery } from "@apollo/client";

import { GET_COMMUNITY_PERMISSIONS } from "../../graphql/queries/GET_COMMUNITY_PERMISSIONS";

import { RolePermissions } from "../../components/roles/RolePermission";
import { useCommunityContext } from "../../context/CommunityContext";

import { isFlagSetForPermissionString } from "../../helpers/is-flag-set-for-permission-string";

const withCommunityPermissionsContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ rolePermissionString }) => {
    const { community } = useCommunityContext();

    const { data } = useQuery(GET_COMMUNITY_PERMISSIONS, {
      variables: { id: community?._id },
      skip: !community?._id,
    });

    const permissions = React.useMemo(() => {
      return data?.CommunityQuery?.getCommunityById?.permissions || [];
    }, [data]);

    const initialValues = React.useMemo(() => {
      const values = {};
      permissions.forEach((permission) => {
        values[permission.name] = {
          isGranted: isFlagSetForPermissionString(
            rolePermissionString,
            permission.bitwiseFlag
          ),
          _id: permission._id,
        };
      });
      return values;
    }, [permissions, rolePermissionString]);

    return <Memo permissions={permissions} initialValues={initialValues} />;
  };
};

const RoleEditPermissions = ({ permissions = [], initialValues }) => {
  const onSubmit = React.useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <RolePermissions
      initialValues={initialValues}
      permissions={permissions}
      onSubmit={onSubmit}
    />
  );
};

export const RoleEditPermissionsWithContext =
  withCommunityPermissionsContext(RoleEditPermissions);
