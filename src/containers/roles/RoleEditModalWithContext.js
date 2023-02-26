import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { ModalBody } from "@chakra-ui/modal";

import { GET_ROLE } from "../../graphql/queries/GET_ROLE";

import { RoleEditPermissionsWithContext } from "./RoleEditPermissionsWithContext";

import { ModalPrimary } from "../../components/modal/ModalPrimary";
import { RoleEdit } from "../../components/roles/RoleEdit";

const withRoleParams = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const { roleId } = useParams();
    const navigate = useNavigate();

    const onClose = React.useCallback(() => {
      navigate("..", {
        reltive: "path",
      });
    }, [navigate]);

    const { data, loading } = useQuery(GET_ROLE, {
      variables: { id: roleId },
      skip: !roleId,
    });

    const role = React.useMemo(() => {
      return data?.RoleQuery?.getRoleById;
    }, [data]);

    const isOpen = React.useMemo(() => {
      return roleId && !loading && role;
    }, [roleId, role?._id, loading]);

    return (
      <Memo
        roleName={role?.name}
        roleDescription={role?.description?.raw}
        rolePermissionString={role?.permissionString}
        isOpen={isOpen}
        onClose={onClose}
        editable={role?.editable}
      />
    );
  };
};

const RoleEditModal = ({
  isOpen,
  onClose,
  roleName,
  roleDescription,
  editable,
  rolePermissionString,
}) => {
  const onSubmit = React.useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <ModalPrimary
      isOpen={isOpen}
      onClose={onClose}
      header={
        <>
          Edit role <b>{roleName}</b>
        </>
      }
    >
      <ModalBody>
        <RoleEdit
          roleName={roleName}
          roleDescription={roleDescription}
          editable={editable}
          onSubmit={onSubmit}
        />
        <RoleEditPermissionsWithContext
          rolePermissionString={rolePermissionString}
        />
      </ModalBody>
    </ModalPrimary>
  );
};

export const RoleEditModalWithContext = withRoleParams(RoleEditModal);
