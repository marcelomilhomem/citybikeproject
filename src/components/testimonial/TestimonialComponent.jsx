import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue("gray.200", "gray.100")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading color={"blackAlpha.700"} as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar size={"2xl"} src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600} fontSize={"xl"} as={"i"}>
          {name}
        </Text>
        <Text fontSize={"lg"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function TestimonialComponent() {
  return (
    <motion.div
      className="box"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Box>
        <Container py={16} as={Stack} spacing={12}>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  Welcome to my City Bike App
                </TestimonialHeading>
                <TestimonialText>
                  Thank you for taking the time to review my city bike app and
                  considering my work for your consideration. I am excited to
                  showcase one of my projects that I believe best represents my
                  skills and passion for Chakra Ui and Responsive Website.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://www.cheatsheet.com/wp-content/uploads/2022/08/i-am-groot-.jpg?w=902&h=507"
                }
                name={"Marcelo Milhomem"}
                title={"Full Stack Developer"}
              />
            </Testimonial>
          </Stack>
        </Container>
      </Box>
    </motion.div>
  );
}
