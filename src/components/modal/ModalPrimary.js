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
  variant = "default",
  modalProps = {},
  ...props
}) => {
  const mobileStyle = React.useMemo(() => {
    if (variant === "mobile-drawer") {
      return {
        maxHeight: ["90vh", null, "auto"],
        marginBottom: ["0", null, "auto"],
        marginTop: ["auto"],
        overflowY: ["scroll", null, "auto"],
        borderBottomLeftRadius: ["0", null, "3xl"],
        borderBottomRightRadius: ["0", null, "3xl"],
      };
    }
    return { maxHeight: "90vh" };
  }, [variant]);
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
        borderColor={"background.main"}
        rounded="3xl"
        // background="whiteAlpha.100"
        // backdropFilter="auto"
        // backdropBlur="96px"
        // background="background.modal"
        // backdropFilter="none"
        // backdropBlur="none"
        background="gray.700"
        {...modalProps}
        {...mobileStyle}
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
