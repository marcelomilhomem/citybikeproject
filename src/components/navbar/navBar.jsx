import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { UserAuth } from "../../../AuthContext";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentUser, logout } = UserAuth();
  return (
    <Stack direction={"row"}>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? (
          <MoonIcon color={"black"} />
        ) : (
          <SunIcon color={"whiteAlpha.400"} />
        )}
      </Button>
      {currentUser ? (
        <Menu>
          <MenuButton
            as={Button}
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
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </Stack>
  );
}
