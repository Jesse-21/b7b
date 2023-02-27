/* eslint-disable no-inline-comments */
import { useMutation } from "@apollo/client";

import { CORE_ROLE_FIELDS } from "../../graphql/fragments/CORE_ROLE_FIELDS";
import { CREATE_ROLE_FOR_COMMUNITY } from "../../graphql/mutations/CREATE_ROLE_FOR_COMMUNITY";
import { EDIT_ROLE } from "../../graphql/mutations/EDIT_ROLE";
import { DELETE_ROLE } from "../../graphql/mutations/DELETE_ROLE";
import { UPDATE_ROLE_PERMISSIONS } from "../../graphql/mutations/UPDATE_ROLE_PERMISSIONS";

import { lazyQueryWithTimeout } from "../lazyQuery";

export const useRoleMutations = () => {
  const [
    _createRole,
    {
      loading: createRoleLoading,
      error: createRoleError,
      data: createRoleData,
    },
  ] = useMutation(CREATE_ROLE_FOR_COMMUNITY);
  const [
    _editRole,
    { loading: editRoleLoading, error: editRoleError, data: editRoleData },
  ] = useMutation(EDIT_ROLE);
  const [
    _deleteRole,
    {
      loading: deleteRoleLoading,
      error: deleteRoleError,
      data: deleteRoleData,
    },
  ] = useMutation(DELETE_ROLE);
  const [
    _updateRolePermissions,
    {
      loading: updateRolePermissionsLoading,
      error: updateRolePermissionsError,
      data: updateRolePermissionsData,
    },
  ] = useMutation(UPDATE_ROLE_PERMISSIONS);

  const onCreateRole = (
    { communityId, roleInput, ruleDataInputs } = {},
    props = {}
  ) => {
    return lazyQueryWithTimeout(
      _createRole({
        variables: {
          communityId,
          roleInput,
          ruleDataInputs,
        },
        onCompleted: (data) => {
          props?.onCompleted?.({
            data,
            success: data?.createRoleForCommunity?.success,
          });
        },
        update: (
          cache,
          { data: { createRoleForCommunity: createdRoleData } }
        ) => {
          if (createdRoleData.success) {
            cache.modify({
              id: cache.identify(createdRoleData.role.community),
              fields: {
                roles(existingRef = [], { readField }) {
                  const newRoleRef = cache.writeFragment({
                    id: `Role:${createdRoleData.role._id}`,
                    data: createdRoleData.role,
                    fragment: CORE_ROLE_FIELDS,
                    fragmentName: "CoreRoleFields",
                  });

                  // Quick safety check - if the new comment is already
                  // present in the cache, we don't need to add it again.
                  if (
                    existingRef.some(
                      (ref) =>
                        readField("_id", ref) === createdRoleData.role._id
                    )
                  ) {
                    return existingRef;
                  }

                  return [newRoleRef, ...existingRef];
                },
              },
            });
          }
        },
      })
    );
  };

  const onEditRole = ({ roleId, roleInput } = {}, props = {}) => {
    if (!roleId) {
      return;
    }

    return lazyQueryWithTimeout(
      _editRole({
        variables: {
          roleId,
          roleInput,
        },
        onCompleted: (data) => {
          props?.onCompleted?.({
            data,
            success: data?.editRole.success,
          });
        },
      })
    );
  };

  const onDeleteRole = ({ roleId } = {}, props = {}) => {
    if (!roleId) {
      return;
    }

    return lazyQueryWithTimeout(
      _deleteRole({
        variables: {
          roleId,
        },
        onCompleted: (data) => {
          props?.onCompleted?.({
            data,
            success: data?.deleteRole.success,
          });
        },
        refetchQueries: ["GET_COMMUNITY_ROLES"],
      })
    );
  };

  const onUpdateRolePermissions = (
    { roleId, permissionIds } = {},
    props = {}
  ) => {
    if (!roleId) {
      return;
    }

    return lazyQueryWithTimeout(
      _updateRolePermissions({
        variables: {
          roleId,
          permissionIds,
        },
        onCompleted: (data) => {
          props?.onCompleted?.({
            data,
            success: data?.updateRolePermissions?.success,
          });
        },
      })
    );
  };
  /** Variables */
  const createRoleFailed =
    createRoleData?.createRoleForCommunity?.success === false;
  const editRoleFailed = editRoleData?.editRole?.success === false;
  const updateRolePermissionsFailed =
    updateRolePermissionsData?.updateRolePermissions?.success === false;
  const deleteRoleFailed = deleteRoleData?.deleteRole?.success === false;

  const loading =
    createRoleLoading ||
    editRoleLoading ||
    updateRolePermissionsLoading ||
    deleteRoleLoading;

  const error =
    createRoleError ||
    editRoleError ||
    updateRolePermissionsError ||
    (createRoleFailed && createRoleData?.createRoleForCommunity?.message) ||
    (editRoleFailed && editRoleData?.editRole?.message) ||
    (updateRolePermissionsFailed &&
      updateRolePermissionsData?.updateRolePermissions?.message) ||
    deleteRoleError ||
    (deleteRoleFailed && deleteRoleData?.deleteRole?.message);

  return {
    onCreateRole,
    onEditRole,
    onUpdateRolePermissions,
    onDeleteRole,
    loading: loading,
    error: error,
  };
};
