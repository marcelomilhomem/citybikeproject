import {
  Avatar,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { UserAuth } from "../../context/AuthContext";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentUser, logout } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={"20px"} direction={"row"} mb={2}>
      <Tooltip hasArrow label="Download Cv" aria-label="cv">
        <motion.div
          className="box"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeatDelay: 1,
          }}
        >
          <a download href={"MarceloMilhomem.pdf"}>
            <IconButton colorScheme="pink" icon={<FaFilePdf />} />
          </a>
        </motion.div>
      </Tooltip>
      <Tooltip hasArrow label="Linkedin" aria-label="linkedin">
        <IconButton colorScheme="pink" icon={<AiFillLinkedin />} />
      </Tooltip>
      <Tooltip hasArrow label="Github" aria-label="github">
        <IconButton colorScheme="pink" icon={<AiOutlineGithub />} />
      </Tooltip>
      <Tooltip hasArrow label={colorMode === 'light' ? 'DarkMode' : 'LightMode'} aria-label='cv'>
      <ChakraButton variant={"solid"} onClick={toggleColorMode}>
        {colorMode === "light" ? (
          <MoonIcon color={"white"} />
        ) : (
          <SunIcon color={"white"} />
        )}
      </ChakraButton>
      </Tooltip>
      {currentUser ? (
        <Menu>
          <MenuButton
            as={ChakraButton}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar
              size={"sm"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
          </MenuButton>

          <MenuList alignItems={"center"}>
            <br />
            <Center>
              <Avatar
                size={"2xl"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </Center>
            <br />
            <Center>
              <p>{currentUser?.displayName}</p>
            </Center>
            <br />
            <MenuDivider />
            <MenuItem>Account Settings</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </Stack>
  );
}
