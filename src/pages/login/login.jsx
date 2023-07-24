import {
  Flex,
  Stack,
  Button,
  Heading,
  Text,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { useEffect } from "react";

function Login({ t }) {
  const { signInWithGoogle, signInWithGithub, currentUser } = UserAuth();
  const navigate = useNavigate();

  const { colorMode } = useColorMode();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(currentUser !== null) {
      navigate('/landing-page')
    }
  }, [currentUser])

  return (
    <Stack mt={2} minH={"80vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        borderRadius={5}
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        bgColor={colorMode === "dark" ? "gray.700" : "gray.100"}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"6xl"}>{t("welcome")}</Heading>
          <Text fontSize={"2xl"}>{t("loginWithGoogle")} ✌️</Text>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            ></Stack>
            <Button
              w={"full"}
              variant={"outline"}
              leftIcon={<FcGoogle />}
              loadingText="Submitting"
              size="md"
              bg={"gray.200"}
              color={"white"}
              _hover={{
                bg: "blue.300",
              }}
              onClick={handleGoogleSignIn}
            >
              <Center>
                <Text color={"black"}>{t("loginGoogle")}</Text>
              </Center>
            </Button>
            <Button
              w={"full"}
              variant={"outline"}
              leftIcon={<FaGithub color="black" />}
              loadingText="Submitting"
              size="md"
              bg={"gray.200"}
              color={"white"}
              _hover={{
                bg: "blue.300",
              }}
              onClick={handleGithubSignIn}
            >
              {" "}
              <Center>
                <Text color={"black"}>{t("loginGithub")}</Text>
              </Center>
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default withNamespaces()(Login);
