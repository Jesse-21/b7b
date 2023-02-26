import React from "react";
import { IconButton } from "@chakra-ui/button";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/table";

import { DeleteIcon } from "@chakra-ui/icons";

export const RolesTable = ({
  roles = [],
  onClick,
  onDelete,
  isDeleting,
  communityDomain,
  communityTld,
}) => {
  const onRowClick = React.useCallback(
    (id) => {
      if (onClick) {
        onClick(id);
      }
    },
    [onClick]
  );
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption color="text.secondary">
          Roles are aliases for one or multiple members, and can have different
          permissions. You can have at most 10 roles during Alpha.
        </TableCaption>
        <Thead>
          <Tr>
            <Th color="text.secondary">Roles - {roles.length}</Th>
            <Th color="text.secondary">Address</Th>
            <Th color="text.secondary">Members</Th>
            {/* <Th color="text.secondary">Actions</Th> */}
          </Tr>
        </Thead>

        <Tbody>
          {roles.map((role) => (
            <Tr
              onClick={() => onRowClick(role._id)}
              key={role._id}
              _hover={{
                cursor: onClick ? "pointer" : "default",
              }}
            >
              <Td>{role.name}</Td>
              <Td>
                {role.slug}@{communityDomain}.{communityTld}
              </Td>

              <Td>{!role.editable ? "" : role.membersCount || 0}</Td>
              {/* <Td>
                {!role.editable ? (
                  ""
                ) : (
                  <ConfirmationAlertWrapper
                    title={`Delete ${role.name}?`}
                    description={`Are you sure you want to delete the role ${role.name}? This action cannot be undone.`}
                    onConfirm={() => {
                      onDelete(role._id);
                    }}
                  >
                    {({ onOpen }) => (
                      <IconButton
                        isDisabled={isDeleting}
                        variant={"ghost"}
                        icon={<DeleteIcon color="red.300" />}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen();
                        }}
                      ></IconButton>
                    )}
                  </ConfirmationAlertWrapper>
                )}
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
