import React from "react";

import { RoleEdit } from "../../components/roles/RoleEdit";
import { useRoleMutations } from "../../helpers/hooks/useRoleMutations";

const withEditActions = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return ({ roleName, roleDescription, editable, roleId }) => {
    const { onEditRole } = useRoleMutations();

    const onSubmit = React.useCallback(
      (values = {}) => {
        if (!roleId) return;

        const variables = {
          roleId: roleId,
          roleInput: {
            name: values.name,
            description: values.content?.raw ? values.content : null,
          },
        };
        return onEditRole(variables);
      },
      [roleId, onEditRole]
    );

    return (
      <Memo
        roleName={roleName}
        roleDescription={roleDescription}
        editable={editable}
        onSubmit={onSubmit}
      />
    );
  };
};

const RoleEditPermissions = ({
  roleName,
  roleDescription,
  editable,
  onSubmit,
}) => {
  return (
    <RoleEdit
      roleName={roleName}
      roleDescription={roleDescription}
      editable={editable}
      onSubmit={onSubmit}
    />
  );
};

export const RoleEditWithContext = withEditActions(RoleEditPermissions);
