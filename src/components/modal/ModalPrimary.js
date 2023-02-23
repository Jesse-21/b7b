import React from "react";
import {
  ModalOverlay,
  ModalContent,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/modal";

const Overlay = () => <ModalOverlay />;

export const ModalPrimary = ({
  isOpen,
  onClose,
  children,
  header,
  footer,

  modalProps = {},
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="outside"
      {...props}
    >
      <Overlay />
      <ModalContent
        boxShadow={"shadow.sm"}
        border="1px solid"
        borderColor={"border"}
        rounded="3xl"
        // background="gray.700"
        {...modalProps}
      >
        {header && (
          <ModalHeader>
            {header} <ModalCloseButton />
          </ModalHeader>
        )}
        {children}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
