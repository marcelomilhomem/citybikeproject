import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { withNamespaces } from "react-i18next";
import holdingPhoneImg from "../../assets/holdingPhone.png";
import { FaCircleArrowRight } from "react-icons/fa6";

function LandingPage({ t }) {
  const navigate = useNavigate();

  const handleMapNavition = () => {
    navigate("/map");
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        bgColor={"gray.100"}
      >
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            Full Stack Developer
            <br />
          </Heading>
          <Text
            textAlign={"left"}
            fontSize={{ base: "md", lg: "lg" }}
            color={"gray.800"}
          >
            {t("landingPageIntro")}
          </Text>
          <Box>
            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                bg={"yellow.300"}
                _hover={"none"}
                px={6}
                onClick={handleMapNavition}
                rightIcon={<FaCircleArrowRight />}
              >
                {t("cityBikeMap")}
              </Button>
            </motion.div>
          </Box>
          <Flex maxW={"70%"} flex={1}>
            <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src={holdingPhoneImg}
            />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default withNamespaces()(LandingPage);
