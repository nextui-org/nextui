import {Examples} from "@components";
import {Navbar, Text, Button, Link} from "@nextui-org/react";

export default function NavbarBorderedExample() {
  return (
    <Examples.NavbarLayout>
      <Navbar isBordered isCompact variant="sticky">
        <Navbar.Brand>
          <Examples.AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
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
            <Button auto flat as={Link} href="#" size="sm">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Examples.NavbarLayout>
  );
}
