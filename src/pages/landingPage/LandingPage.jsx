import { useNavigate } from "react-router-dom";
import TestimonialComponent from "../../components/testimonial/TestimonialComponent";
import "./LandingPage.css";
import {
  Icon,
  Stack,
  Center,
  Button as ChakraButton,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import {
  SiChakraui,
  SiTsnode,
  SiFirebase,
  SiMongodb,
  SiHandlebarsdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiExpress,
  SiJavascript,
  SiReact,
  SiTypescript,
} from "react-icons/si";

function LandingPage() {
  const icons = [
    SiReact,
    SiChakraui,
    SiTsnode,
    SiFirebase,
    SiMongodb,
    SiHandlebarsdotjs,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiExpress,
    SiJavascript,
    SiTypescript,
  ];

  const navigate = useNavigate();

  const handleMapNavition = () => {
    navigate("/map");
  };

  const renderOptions = () => {
    if (icons && icons.length >= 1) {
      return icons.map((icon, index) => {
        return (
          <WrapItem key={index}>
            <Icon
              boxSize="30px"
              as={icon}
              css={{
                borderRadius: "50%",
                background:
                  "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                backgroundSize: "400% 400%",
                animation: "gradient 15s ease infinite",
                "@keyframes gradient": {
                  "0%": {
                    backgroundPosition: "0% 50%",
                  },
                  "50%": {
                    backgroundPosition: "100% 50%",
                  },
                  "100%": {
                    backgroundPosition: "0% 50%",
                  },
                },
              }}
            />
          </WrapItem>
        );
      });
    }

    return <></>;
  };

  return (
    <Stack spacing={"50px"}>
      <TestimonialComponent />
      <Center>
        <Wrap spacing={"20px"}>{renderOptions()}</Wrap>
      </Center>
      <Center>
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
      </Center>
    </Stack>
  );
}

export default LandingPage;
