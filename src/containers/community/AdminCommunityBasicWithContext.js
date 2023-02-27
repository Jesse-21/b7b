import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@chakra-ui/button";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Input } from "@chakra-ui/input";

import { useBasicEditor } from "../../helpers/hooks/richText/useBasicEditor";
import { useEditCommunity } from "../../helpers/hooks/useEditCommunity";

import { BasicEditor } from "../../components/richText/BasicEditor";

import { useCommunityContext } from "../../context/CommunityContext";

const SettingsSectionInputField = ({
  id,
  title,
  description,
  ...inputProps
}) => {
  return (
    <>
      <Text as="label" htmlFor={id} fontWeight={"semibold"} mb={2}>
        {title}
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

const fields = [
  {
    id: "name",
    title: "Name",
    description:
      "Choose a display name for your community between 1 - 64 characters.",
    placeholder: "Bebs and the Bebettes",
  },
];

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(1, "Community must be between 1 - 64 characters.")
    .max(64, "Community must be between 1 - 64 characters."),
});

export const DomainCommunitySettingsForm = ({
  communityName,
  communityBio,
  onSubmit,
  loading,
}) => {
  const { getContent, editor, setContent } = useBasicEditor({
    size: "lg",
    placeholder: "An awesome community of unicorns",
    limit: 240,
  });
  React.useEffect(() => {
    if (communityBio && editor) {
      setContent(communityBio);
    }
  }, [communityBio, editor]);

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
    <Flex width="100%" flexDir={"column"} mt={4}>
      <Formik
        enableReinitialize
        validationSchema={formSchema}
        initialValues={{
          name: communityName || "",
        }}
        onSubmit={onSave}
      >
        <Form style={{ display: "flex", flexDirection: "column" }}>
          {fields.map((field) => {
            return (
              <Box key={field.id} mb={4}>
                <SettingsSectionInputField {...field} />
              </Box>
            );
          })}
          <Box>
            <Text as="label" fontWeight={"semibold"} mb={2}>
              Description
            </Text>
            <Text color={"text.secondary"} mb={4}>
              Describe your community in details.
            </Text>
            <BasicEditor editor={editor} />
          </Box>

          <Box ml="auto" mt={4}>
            <Button
              isDisabled={loading}
              type="submit"
              width="100%"
              size="lg"
              margin={"auto"}
              colorScheme="pink"
            >
              Save community
            </Button>
          </Box>
        </Form>
      </Formik>
    </Flex>
  );
};

const withAdminCommunityContext = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return () => {
    const toast = useToast();
    const { community } = useCommunityContext();
    const { onEditCommunity, loading } = useEditCommunity();

    const onSave = React.useCallback(
      ({ content, ...values } = {}) => {
        onEditCommunity(
          {
            communityId: community?._id,
            bio: content?.raw ? content : undefined,
            ...values,
          },
          {
            onCompleted: (data) => {
              if (data?.editCommunity?.success) {
                toast({
                  title: "Community saved",
                  description: "Successfully updated community.",
                  status: "success",
                });
              } else {
                toast({
                  title: "Failed to update community!",
                  description: data?.editCommunity?.message,
                  status: "error",
                });
              }
            },
          }
        );
      },
      [community?._id, onEditCommunity, toast]
    );

    return (
      <Memo
        communityName={community?.name}
        communityBio={community?.bio?.raw}
        onSubmit={onSave}
        loading={loading}
      />
    );
  };
};

export const AdminCommunityBasicWithContext = withAdminCommunityContext(
  DomainCommunitySettingsForm
);
