import React from "react";
import { Text, Box, Badge } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Field, Form, Formik, useFormikContext } from "formik";

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
          <Badge colorScheme={"gray"} ml={2}>
            required
          </Badge>
        )}
      </Text>
      {description && (
        <Text color={"text.secondary"} mb={4}>
          {inputProps.isDisabled ? (
            <>The field {id} is not editable for this role.</>
          ) : (
            description
          )}
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

const EditorWithAutoSave = ({ content, isDisabled }) => {
  const { editor } = useBasicEditor({
    size: "lg",
    placeholder: "Role for the cool beans",
    limit: 240,
  });
  const formik = useFormikContext();

  React.useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content);
    }
    if (editor) {
      editor.on("update", ({ editor: _editor }) => {
        formik.setFieldValue("content", {
          html: _editor.getHTML(),
          raw: _editor.getText(),
        });
      });
    }
  }, [content, editor]);
  return isDisabled ? (
    <Box
      px={4}
      py={2}
      backgroundColor="background"
      rounded="md"
      opacity={"0.5"}
      cursor="no-drop"
    >
      {content}
    </Box>
  ) : (
    <BasicEditor editor={editor} />
  );
};

export const RoleEdit = ({ roleName, onSubmit, roleDescription, editable }) => {
  const onSave = React.useCallback(
    async (values) => {
      onSubmit({
        ...values,
      });
    },
    [onSubmit]
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
            {!editable ? (
              <>The field description is not editable for this role.</>
            ) : (
              "Describe the role in details."
            )}
          </Text>
          <EditorWithAutoSave
            content={roleDescription}
            isDisabled={!editable}
          />
        </Box>
        <AutoSave />
      </Form>
    </Formik>
  );
};
