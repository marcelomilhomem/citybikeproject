import {
  Flex,
  Stack,
  Button,
  Heading,
  Text,
  Center,
  Image,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signInWithGoogle, currentUser } = UserAuth();
  const navigate = useNavigate();

  console.log("current user before useeffect", currentUser);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/landing-page");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"6xl"}>Welcome to my City Bike app</Heading>
          <Text fontSize={"2xl"}>
            Login with google to enjoy all of our city bike app ✌️
          </Text>
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
              {" "}
              <Center>
                <Text color={"black"}>Sign In With Google</Text>
              </Center>
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1598486393611-1a78cc02e61b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2842&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
