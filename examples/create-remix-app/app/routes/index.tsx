import {
  Container,
  Grid,
  Switch,
  Text,
  useTheme,
  Link,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";

export default function Index() {
  const darkMode = useDarkMode(false);
  const { isDark } = useTheme();
  return (
    <Container>
      <Text h1 margin={"0 0 $4 0"} css={{ ta: "center" }}>
        Welcome to <Link href="https://remix.run/">Remix</Link> with{" "}
        <Link color={"secondary"} href="https://v1.nextui.org/">
          NextUI
        </Link>
      </Text>
      <Grid.Container
        justify="center"
        alignContent="center"
        css={{ gap: "$8", mb: "$8" }}
      >
        <Text>Enable {isDark ? "light" : "dark"} mode</Text>
        <Switch
          shadow
          color="primary"
          checked={isDark}
          onChange={() => darkMode.toggle()}
        />
      </Grid.Container>
    </Container>
  );
}
