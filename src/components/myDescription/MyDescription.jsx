/* import React from "react";
import { Flex, Text, Stack, Avatar, useColorModeValue } from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";

function MyDescription() {
  const { currentUser } = UserAuth();

  return (
    <Flex width={'25vw'} align={"center"} mt={8} direction={"column"}>
      <Avatar
        src={
          "https://www.sideshow.com/wp/wp-content/uploads/2017/07/marvel-guardians-of-the-galaxy-vol-2-baby-groot-maquette-400314-02.jpg"
        }
        alt="marcelo"
        mb={2}
        size={"lg"}
      />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>Hey there, {currentUser.displayName} </Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          Thank you for taking the time to review my city bike app and considering
          my work for your consideration. I am excited to showcase one of my
          projects that I believe best represents my skills and passion for
          Chakra Ui and Responsive Website.
        </Text>
      </Stack>
    </Flex>
  );
}

export default MyDescription;
 */

import { ReactNode } from "react";
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

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "white")}
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
      <Avatar size={"lg"} src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
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
  );
}
