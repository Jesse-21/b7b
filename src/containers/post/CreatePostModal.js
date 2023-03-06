import { ModalBody } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";

import { ModalPrimary } from "../../components/modal/ModalPrimary";

import { CreatePostOrReplyWithSelectCommunity } from "./CreatePostOrReply";

export const CreatePostModalWrapper = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      {children({ onClose, onOpen })}
      <CreatePostModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};
export const CreatePostModal = ({ isOpen, onClose }) => {
  return (
    <ModalPrimary
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      header={<>Create Post</>}
      footer={<Button variant={"ghost"}>Cancel</Button>}
    >
      <ModalBody>
        <CreatePostOrReplyWithSelectCommunity />
      </ModalBody>
    </ModalPrimary>
  );
};
export const CreatePostModalButton = ({ children, ...props }) => {
  return (
    <CreatePostModalWrapper>
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
