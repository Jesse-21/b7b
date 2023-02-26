import React from "react";
import { Text, Box, Badge } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";

import { Field, Form, Formik } from "formik";

import { BasicEditor } from "../richText/BasicEditor";
import { AutoSave } from "../input/FormikAutoSave";

import { useBasicEditor } from "../../helpers/hooks/richText/useBasicEditor";

const fields = [
  {
    id: "name",
    title: "Role name",
    description: "Choose a role name between 1 - 64 characters.",
    placeholder: "Beb NFT owners",
    required: true,
  },
];

const RoleEditTabInputField = ({
  id,
  title,
  description,
  required,
  ...inputProps
}) => {
  return (
    <>
      <Text as="label" htmlFor={id} fontWeight={"semibold"} mb={2}>
        {title}
        {required && (
          <Badge colorScheme={"purple"} ml={2}>
            required
          </Badge>
        )}
      </Text>
      {description && (
        <Text color={"text.secondary"} mb={4}>
          {description}
        </Text>
      )}
      <Field id={id} name={id}>
        {({ field, meta }) => (
          <>
            <Input type="text" {...inputProps} {...field} />
            {meta.touched && meta.error && (
              <Text color="error">{meta.error}</Text>
            )}
          </>
        )}
      </Field>
    </>
  );
};

export const RoleEdit = ({ roleName, onSubmit, roleDescription, editable }) => {
  const { getContent, editor, setContent } = useBasicEditor({
    size: "lg",
    placeholder: "Role for the cool beans",
    limit: 240,
  });

  React.useEffect(() => {
    if (roleDescription && editor) {
      setContent(roleDescription);
    }
  }, [roleDescription, editor]);

  const onSave = React.useCallback(
    async (values) => {
      const content = getContent();
      onSubmit({
        content,
        ...values,
      });
    },
    [getContent, onSubmit]
  );

  return (
    <Formik
      onSubmit={onSave}
      enableReinitialize
      initialValues={{
        name: roleName || "",
      }}
    >
      <Form style={{ display: "flex", flexDirection: "column" }} id="role-form">
        {fields.map((field) => {
          return (
            <Box key={field.id} mb={8}>
              <RoleEditTabInputField {...field} isDisabled={!editable} />
            </Box>
          );
        })}
        <Box mb={8}>
          <Text as="label" fontWeight={"semibold"} mb={2}>
            Role description
          </Text>
          <Text color={"text.secondary"} mb={4}>
            Describe the role in details.
          </Text>
          <BasicEditor editor={editor} />
        </Box>
        <AutoSave />
      </Form>
    </Formik>
  );
};
