import TestimonialComponent from "../testimonial/TestimonialComponent";
import { BiLogoReact } from "react-icons/bi";
import "./LandingPage.css";
import { Icon } from "@chakra-ui/react";

function LandingPage() {
  return (
    <>
      <TestimonialComponent />
      <Icon
      as={BiLogoReact}
      boxSize="40px" // Size of the icon
      css={{
        borderRadius: '50%', // Make the icon rounded
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      }}
    />
    </>
  );
}

export default LandingPage;
