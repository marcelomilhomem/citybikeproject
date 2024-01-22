import {
  Avatar,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  IconButton,
  Tooltip,
  Button,
  Link,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import { withNamespaces } from "react-i18next";
import { PT, US } from "country-flag-icons/react/3x2";

function Nav({ t }) {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { currentUser, logout } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleNaviteHomePage = () => {
    navigate("/landing-page");
  };

  const handleNaviteMapPage = () => {
    navigate("/map");
  };

  const handleSwitch = () => {
    if (language === "en") {
      changeLanguage("pt");
    } else if (language === "pt") {
      changeLanguage("en");
    }
  };

  return (
    <Stack spacing={"20px"} direction={"row"} mb={2}>
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
        <a
          target="_blank"
          href={
            "https://drive.google.com/file/d/19-1fnMfMTwaYvmU9Mkc3smgFfwgruJSC/view?usp=sharing"
          }
        >
          {/* <IconButton variant={"ghost"} icon={<FaFilePdf />} /> */}
          <ChakraButton variant={"ghost"}>My CV</ChakraButton>
        </a>
      </motion.div>
      <Center>
        {language === "en" ? (
          <IconButton
            onClick={handleSwitch}
            size={"sm"}
            variant={"ghost"}
            icon={
              <img
                alt="Portugal"
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/PT.svg"
              />
            }
          ></IconButton>
        ) : (
          <IconButton
            onClick={handleSwitch}
            variant={"ghost"}
            size={"sm"}
            icon={
              <img
                alt="United States"
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
              />
            }
          ></IconButton>
        )}
      </Center>

      {currentUser ? (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src={currentUser.photoURL} />
          </MenuButton>

          <MenuList alignItems={"center"}>
            <br />
            <Center>
              <Avatar size={"2xl"} src={currentUser.photoURL} />
            </Center>

            <br />
            <Center>
              <p>{currentUser?.displayName}</p>
            </Center>
            <br />
            <MenuDivider />
            <MenuItem onClick={handleNaviteHomePage}>Home</MenuItem>
            <MenuItem onClick={handleNaviteMapPage}>{t("map")}</MenuItem>
            <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </Stack>
  );
}

export default withNamespaces()(Nav);
