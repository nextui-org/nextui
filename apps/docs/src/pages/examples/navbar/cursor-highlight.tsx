import {Examples} from "@components";
import {Navbar, Text, Button, Link, useTheme} from "@nextui-org/react";

export default function NavbarCursorHighlightExample() {
  const {isDark} = useTheme();

  return (
    <Examples.NavbarLayout>
      <Navbar isBordered={isDark} variant="sticky">
        <Navbar.Brand>
          <Examples.AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link href="#">Customers</Navbar.Link>
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
    </Examples.NavbarLayout>
  );
}
