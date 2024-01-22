import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import Map from "../../components/googleMap/googleMap";
import Modal from "../../components/modal/Modal";
import { withNamespaces } from "react-i18next";

function MapPage({ t }) {
  return (
    <Stack width={"100%"} bg={"gray.100"}>
      <Container>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          maxW={"3xl"}
        >
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            City Bike App
          </Heading>
          <Text textAlign={"left"} color={"gray.500"}>
            {t("mapPageIntro")}
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Modal />
          </Stack>
        </Stack>
      </Container>
      <Map />
    </Stack>
  );
}

export default withNamespaces()(MapPage);
