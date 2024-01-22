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
  Heading,
} from "@chakra-ui/react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiGo, SiGooglemaps } from "react-icons/si";
import { MdOutlinePedalBike } from "react-icons/md";
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
        <Button
          alignContent={"start"}
          bg={"yellow.300"}
          _hover={"none"}
          onClick={onOpen}
          rightIcon={<SiGooglemaps />}
        >
          {t("learnMore")}
        </Button>
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
              <Heading as={"h5"} size={"sm"} color={"yellow.300"}>
                <FaMapMarkedAlt />
              </Heading>
              <Text>
                <Text fontWeight={"bold"}> {t("tip1title")}</Text>
                {t("tips1")}
              </Text>
              <Heading as={"h5"} size={"sm"} color={"yellow.300"}>
                <SiGooglemaps />
              </Heading>
              <Text>
                <Text fontWeight={"bold"}> {t("tip2title")}</Text>
                {t("tips2")}
              </Text>
              <Heading as={"h5"} size={"sm"} color={"yellow.300"}>
                <MdOutlinePedalBike />
              </Heading>
              <Text>
                <Text fontWeight={"bold"}> {t("tip3title")}</Text>
                {t("tips3")}
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
