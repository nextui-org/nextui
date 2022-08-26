import {Layout, Box, AcmeLogo, Content} from "./common";

const App = `import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";

export default function App() {
  return (
    <Layout>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="highlight-rounded">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  )
}`;

const react = {
  "/Content.js": Content,
  "/Layout.js": Layout,
  "/AcmeLogo.js": AcmeLogo,
  "/Box.js": Box,
  "/App.js": App,
};

export default {
  ...react,
};
