import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { UserAuth } from "../../../AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/citybike");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      align={"center"}
      height={"80vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"xl"} textAlign={"center"}>
            Heyy, Login with Google
          </Heading>
          <Text fontSize={"md"} color={"gray.600"}>
            to enjoy all of our city bike app ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
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
        </Box>
      </Stack>
    </Flex>
  );
}
