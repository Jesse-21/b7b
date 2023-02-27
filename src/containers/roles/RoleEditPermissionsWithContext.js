import React from "react";
import { useQuery } from "@apollo/client";

import { GET_COMMUNITY_PERMISSIONS } from "../../graphql/queries/GET_COMMUNITY_PERMISSIONS";

import { RolePermissions } from "../../components/roles/RolePermission";
import { useCommunityContext } from "../../context/CommunityContext";

import { isFlagSetForPermissionString } from "../../helpers/is-flag-set-for-permission-string";
import { useRoleMutations } from "../../helpers/hooks/useRoleMutations";
import { useErrorToast } from "../../helpers/hooks/useErrorToast";

const withCommunityPermissionsContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ rolePermissionString, roleId }) => {
    const { community } = useCommunityContext();
    const { onUpdateRolePermissions, error } = useRoleMutations();
    useErrorToast(error);

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

    const onSubmit = React.useCallback(
      (values) => {
        if (!roleId) return;
        const grantedPermissionIds = [];
        Object.keys(values).forEach((permissionName) => {
          if (values[permissionName].isGranted) {
            grantedPermissionIds.push(values[permissionName]._id);
          }
        });

        const variables = {
          roleId: roleId,
          permissionIds: grantedPermissionIds,
        };
        return onUpdateRolePermissions(variables);
      },
      [roleId, onUpdateRolePermissions]
    );

    return (
      <Memo
        permissions={permissions}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    );
  };
};

const RoleEditPermissions = ({ permissions = [], initialValues, onSubmit }) => {
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
