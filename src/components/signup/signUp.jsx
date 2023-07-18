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

export default function SignUp() {
  /*  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }; */

  const { signInWithGoogle, currentUser } = UserAuth();

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
            {currentUser && currentUser.email}
            Heyy, Sign up with Google
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
              bg={"white"}
              color={"white"}
              _hover={{
                bg: "blue.300",
              }}
              onClick={signInWithGoogle}
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
