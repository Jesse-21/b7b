import React from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Box, Flex, Badge, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

import { useAuthContext } from "../../context/AuthContext";

import { ImageWithUpload } from "../../components/image/ImageWithUpload";

import { useUpdateCurrentAccount } from "../../helpers/hooks/useUpdateAccount";
import { useErrorToast } from "../../helpers/hooks/useErrorToast";
import { useUploadImage } from "../../helpers/hooks/useUploadImage";

const SettingsPictureInput = ({ src }) => {
  const { onImageUpload, loading, error, image } = useUploadImage();
  useErrorToast(error);
  const formik = useFormikContext();

  React.useEffect(() => {
    if (image) {
      formik.setFieldValue("profileImageId", image._id);
    }
  }, [image]);
  return (
    <ImageWithUpload
      src={image?.src || src}
      objectFit={"cover"}
      defaultSrc="https://via.placeholder.com/150"
      h={32}
      w={32}
      onImageUpload={onImageUpload}
      loading={loading}
      rounded="full"
    ></ImageWithUpload>
  );
};
const SettingsSectionInputField = ({
  id,
  title,
  isPublic,
  description,
  ...inputProps
}) => {
  return (
    <>
      <Text
        as="label"
        htmlFor={id}
        fontSize={"md"}
        fontWeight={"semibold"}
        mb={2}
      >
        {title}
      </Text>
      <Badge colorScheme={isPublic ? "pink" : "gray"} ml={2}>
        {isPublic ? "public" : "private"}
      </Badge>
      {description && (
        <Text color={"text.secondary"} mb={2}>
          {description}
        </Text>
      )}
      <Field id={id} name={id}>
        {({ field, meta }) => (
          <>
            <Input
              type="text"
              {...inputProps}
              {...field}
              _placeholder={{
                color: "blackAlpha.400",
              }}
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

const fields = [
  {
    id: "username",
    title: "Username",
    description: "Choose an unique username (alphanumeric characters only).",
    isPublic: true,
    placeholder: "bebs",
  },
  {
    id: "bio",
    title: "Headline",
    description: "A short bio, a quote you live by, or your latest project.",
    isPublic: true,
    placeholder: "Cat lover, dog lover, and all around animal lover.",
  },
  {
    id: "email",
    title: "Email",
    description: "This email will receive notifications you are subscribed to.",
    isPublic: false,
  },
];

const formSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .min(1, "Username must be between 1 - 20 characters.")
    .max(20, "Username must be between 1 - 20 characters.")
    .matches(
      new RegExp("^[a-zA-Z0-9]*$"),
      "Username must contain only letters and numbers."
    ),
  email: Yup.string()
    .email("Invalid email")
    .max(120, "Email must be less than 120 characters."),
  location: Yup.string().max(120, "Location must be less than 120 characters."),
  bio: Yup.string().max(240, "Headline must be less than 240 characters."),
});

const withAccountContext = (Component) => {
  const Memo = React.memo(Component);

  function renderMemo() {
    const { currentAccount, loading } = useAuthContext();
    const { onUpdateCurrentAccount, error } = useUpdateCurrentAccount();
    useErrorToast(error);
    const onSubmit = React.useCallback(
      (values) => {
        onUpdateCurrentAccount(values);
      },
      [onUpdateCurrentAccount]
    );

    if (loading) return <>Loading account...</>;
    if (!currentAccount) return <>No account found.</>;
    return (
      <Memo
        username={currentAccount?.username}
        email={currentAccount?.email}
        bio={currentAccount?.bio?.raw}
        profileImageSrc={currentAccount?.profileImage?.src}
        profileImageId={currentAccount?.profileImage?._id}
        onSubmit={onSubmit}
      />
    );
  }
  renderMemo.displayName = `withAccountContext(${
    Component.displayName || Component.name || "Component"
  })`;
  return renderMemo;
};

export const AccountSettings = ({
  username,
  email,
  bio,
  onSubmit,
  profileImageSrc,
  profileImageId,
  loading,
}) => {
  return (
    <Flex width="100%" flexDir={"column"} mt={4}>
      <Formik
        enableReinitialize
        validationSchema={formSchema}
        initialValues={{
          username: username || "",
          bio: bio || "",
          email: email || "",
          profileImageId: profileImageId,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SettingsPictureInput src={profileImageSrc} />
          {fields.map((field, index) => {
            return (
              <Box
                key={field.id}
                mb={4}
                pb={4}
                borderBottom={
                  index === fields.length - 1 ? "none" : "1px solid"
                }
                borderColor="border"
              >
                <SettingsSectionInputField {...field} />
              </Box>
            );
          })}
          <Button
            isDisabled={loading}
            type="submit"
            width="100%"
            margin={"auto"}
            colorScheme="pink"
          >
            Save
          </Button>
        </Form>
      </Formik>
    </Flex>
  );
};

export const AccountSettingsWithContext = withAccountContext(AccountSettings);
