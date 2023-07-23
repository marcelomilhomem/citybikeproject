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
} from "@chakra-ui/react";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  const handleMapNavition = () => {
    navigate("/map");
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "10%", md: "20%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Full Stack Developer
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              Hey there,
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Thank you for taking the time to review my city bike app and
            considering my work for your consideration. I am excited to showcase
            one of my projects that I believe best represents my skills and
            passion for Chakra Ui, React and JS.
          </Text>
          <Box>
            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
                onClick={handleMapNavition}
              >
                City Bike Map
              </Button>
            </motion.div>
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1568271039041-0784c0a9fdac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}

export default LandingPage;
