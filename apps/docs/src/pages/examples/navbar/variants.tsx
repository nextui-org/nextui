import React from "react";
import {Examples} from "@components";
import {Navbar, Text, Button, Card, Radio, Link, styled, useTheme} from "@nextui-org/react";

const VariantsSelectorWrapper = styled("div", {
  dflex: "center",
  position: "fixed",
  width: "100%",
  bottom: "10px",
  "& .nextui-radio-group-items": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: "$8",
    gridRowGap: "$2",
  },
});

export default function NavbarVariantsExample() {
  const [variant, setVariant] = React.useState<any>("static");

  const {isDark} = useTheme();

  const variants = ["static", "floating", "sticky"];

  return (
    <Examples.NavbarLayout>
      <Navbar isBordered={isDark} variant={variant}>
        <Navbar.Brand>
          <Examples.AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
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
      <VariantsSelectorWrapper>
        <Card css={{maxW: "50%"}}>
          <Card.Body css={{pt: "$8", px: "$8"}}>
            <Radio.Group
              defaultValue="default"
              label="Select variant"
              orientation="horizontal"
              size="sm"
              value={variant}
              onChange={setVariant}
            >
              {variants.map((variant) => (
                <Radio key={variant} value={variant}>
                  {variant}
                </Radio>
              ))}
            </Radio.Group>
          </Card.Body>
        </Card>
      </VariantsSelectorWrapper>
    </Examples.NavbarLayout>
  );
}
