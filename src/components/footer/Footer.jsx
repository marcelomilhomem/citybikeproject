import {
  Stack,
  IconButton,
  Container,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { withNamespaces } from "react-i18next";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";

function Footer({ t }) {
  return (
    <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <Text fontSize="sm" color="fg.subtle">
            © 2024 FullStack Developer - Marcelo Milhomem
          </Text>
          <ButtonGroup variant="tertiary">
            <a
              href="https://www.linkedin.com/in/marcelo-milhomem-79696422b/"
              target="_blank"
            >
              <IconButton variant={"ghost"} icon={<AiFillLinkedin />} />
            </a>
            <a href="https://github.com/marcelomilhomem" target="_blank">
              <IconButton variant={"ghost"} icon={<AiOutlineGithub />} />
            </a>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Container>
  );
}

export default withNamespaces()(Footer);
