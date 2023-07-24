import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Stack,
  useDisclosure,
  ModalHeader,
  IconButton,
} from "@chakra-ui/react";
import { GoLightBulb } from "react-icons/go";
import { GiDutchBike } from "react-icons/gi";
import { motion } from "framer-motion";
import { withNamespaces } from "react-i18next";

function Modal({ t }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <motion.div
        className="box"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <IconButton
          icon={<GoLightBulb color="white" />}
          colorScheme={"green"}
          bg={"green.400"}
          rounded={"full"}
          _hover={{
            bg: "green.500",
          }}
          onClick={onOpen}
        />
      </motion.div>
      <ChakraModal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("tipsTitle")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>
                <GiDutchBike /> {t("tips1")}
              </Text>
              <Text>
                <GiDutchBike /> {t("tips2")}
              </Text>
              <Text>
                <GiDutchBike /> {t("tips3")}
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {t("closeButton")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export default withNamespaces()(Modal);
