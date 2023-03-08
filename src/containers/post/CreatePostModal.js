import { ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";

import { ModalPrimary } from "../../components/modal/ModalPrimary";

import { CreatePostOrReplyWithSelectCommunity } from "./CreatePostOrReply";

export const CreatePostModalWrapper = ({ children, initialDomain }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      {children({ onClose, onOpen })}
      <CreatePostModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        initialDomain={initialDomain}
      />
    </>
  );
};
export const CreatePostModal = ({ isOpen, onClose, initialDomain }) => {
  return (
    <ModalPrimary
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      header={<>Create Post</>}
      footer={
        <Button variant={"ghost"} onClick={onClose}>
          Cancel
        </Button>
      }
    >
      <ModalBody>
        <CreatePostOrReplyWithSelectCommunity initialDomain={initialDomain} />
      </ModalBody>
    </ModalPrimary>
  );
};
export const CreatePostModalButton = ({
  children,
  initialDomain,
  ...props
}) => {
  return (
    <CreatePostModalWrapper initialDomain={initialDomain}>
      {({ onOpen }) => (
        <Button
          w="100%"
          rounded="full"
          colorScheme={"pink"}
          onClick={onOpen}
          {...props}
        >
          {children}
        </Button>
      )}
    </CreatePostModalWrapper>
  );
};
