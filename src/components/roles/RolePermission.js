import React from "react";
import { Text, Box, Badge } from "@chakra-ui/layout";

import { Switch } from "@chakra-ui/switch";
import { Field, Form, Formik } from "formik";

import { AutoSave } from "../input/FormikAutoSave";

const RoleEditPermissionField = ({ permission }) => {
  return (
    <>
      <Text as="label" fontWeight={"semibold"} mb={2}>
        Grant role members permission to{" "}
        <Badge as="span" rounded="md" colorScheme={"gray"}>
          {permission?.name}
        </Badge>{" "}
        ?
      </Text>
      {permission?.description?.raw && (
        <Text color={"text.secondary"} mb={4}>
          By granting this permission, the selected roles can perform the
          following actions: <br />
          {permission?.description?.raw} in the community.
        </Text>
      )}
      <Field
        id={`${permission?.name}.isGranted`}
        name={`${permission?.name}.isGranted`}
      >
        {({ field, meta }) => (
          <>
            <Switch
              {...field}
              isChecked={field.value}
              size="lg"
              colorScheme="gray"
            />
            {meta.touched && meta.error && (
              <Text color="error">{meta.error}</Text>
            )}
          </>
        )}
      </Field>
    </>
  );
};

export const RolePermissions = ({
  permissions = [],
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form
        style={{ display: "flex", flexDirection: "column" }}
        id="role-form-permissions"
      >
        {permissions.map((permission) => {
          return (
            <Box key={permission._id} mb={8}>
              <RoleEditPermissionField permission={permission} />
            </Box>
          );
        })}
        <AutoSave />
      </Form>
    </Formik>
  );
};
