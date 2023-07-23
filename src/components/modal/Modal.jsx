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
import { motion } from "framer-motion";

export default function Modal() {
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
          <ModalHeader>
            Discover the world of city biking with our user-friendly app! It's
            as easy as 1-2-3:
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>
                1 - Explore the Map: Our map comes with three layers. The first
                one reveals the city's extensive bike network, allowing you to
                see all the available bike stations.
              </Text>
              <Text>
                2 - Dive Deeper: With just a click on any marker, you can
                quickly access the bike network stations in that area.
              </Text>
              <Text>
                3 - Station Details: For a closer look, click on a specific
                station, and voilà! All the essential details about that station
                will be at your fingertips.
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
