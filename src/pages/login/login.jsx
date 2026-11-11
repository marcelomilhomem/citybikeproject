import {
  Flex,
  Stack,
  Button,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { GiGhost } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { useEffect } from "react";

// Maps Firebase auth error codes to translation keys.
const LOGIN_ERROR_KEYS = {
  "auth/popup-blocked": "loginErrorPopupBlocked",
  "auth/unauthorized-domain": "loginErrorUnauthorizedDomain",
  "auth/network-request-failed": "loginErrorNetwork",
  "auth/account-exists-with-different-credential": "loginErrorAccountExists",
};

function Login({ t }) {
  const { signInWithGoogle, signInWithGithub, currentUser, signInAnony } =
    UserAuth();
  const navigate = useNavigate();

  const toast = useToast();

  const handleSignIn = async (signIn) => {
    try {
      await signIn();
    } catch (error) {
      console.error(error);
      // The user closing the popup isn't a failure worth reporting.
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      toast({
        title: t("loginFailed"),
        description: t(LOGIN_ERROR_KEYS[error.code] ?? "loginFailedDescription"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleGoogleSignIn = () => handleSignIn(signInWithGoogle);
  const handleGithubSignIn = () => handleSignIn(signInWithGithub);
  const handleAnonySignIn = () => handleSignIn(signInAnony);

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/landing-page");
    }
  }, [currentUser]);

  return (
    <Stack mt={2} minH={"80vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        borderRadius={5}
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        bgColor={"gray.100"}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image
            src="https://images.unsplash.com/photo-1561113500-8f4ad4f80a93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ilustrative Img"
            rounded={"md"}
            boxShadow={"xl"}
          />
          <Text fontSize={"2xl"}>{t("welcome")} ✌️</Text>
          <Stack spacing={2}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            ></Stack>
            <Button
              leftIcon={<FcGoogle />}
              bg={"gray.200"}
              px={6}
              onClick={handleGoogleSignIn}
            >
              {t("loginGoogle")}
            </Button>
            <Button
              leftIcon={<FaGithub color="black" />}
              bg={"gray.200"}
              px={6}
              onClick={handleGithubSignIn}
            >
              {t("loginGithub")}
            </Button>
            <Button
              leftIcon={<GiGhost color="black" />}
              bg={"gray.200"}
              px={6}
              onClick={handleAnonySignIn}
            >
              {t("loginAsGuest")}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default withNamespaces()(Login);
