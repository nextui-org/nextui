import React from "react";
import {Examples} from "@components";
import {Navbar, Text, Button, Card, Spacer, Radio, Link, styled, useTheme} from "@nextui-org/react";

const StyledVariantContainer = styled("div", {
  dflex: "center",
  position: "fixed",
  width: "100%",
  bottom: "10px",
  "& .nextui-radio-group-items": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridColumnGap: "$8",
    gridRowGap: "$2",
  },
});

export default function NavbarActiveItemVariantsExample() {
  const [variant, setVariant] = React.useState<any>("default");
  const [activeColor, setActiveColor] = React.useState<any>("primary");

  const {isDark} = useTheme();

  const variants = [
    "default",
    "highlight",
    "highlight-solid",
    "underline",
    "highlight-rounded",
    "highlight-solid-rounded",
    "underline-rounded",
  ];

  const colors = ["primary", "secondary", "success", "warning", "error"];

  return (
    <Examples.NavbarLayout>
      <Navbar isBordered={isDark} variant="sticky">
        <Navbar.Brand>
          <Examples.AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content activeColor={activeColor} hideIn="xs" variant={variant}>
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
            <Button auto flat as={Link} color={activeColor} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <StyledVariantContainer>
        <Card css={{px: "$6", maxW: "90%"}}>
          <Card.Body>
            <Radio.Group
              defaultValue="default"
              label="Select active variant"
              orientation="horizontal"
              size="sm"
              value={variant}
              onChange={setVariant}
            >
              {variants.map((variant) => (
                <Radio key={variant} color={activeColor} value={variant}>
                  {variant}
                </Radio>
              ))}
            </Radio.Group>
            <Spacer y={0.5} />
            <Radio.Group
              css={{
                "& .nextui-radio-group-items": {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(2, 1fr)",
                  gridColumnGap: "$8",
                  gridRowGap: "$2",
                },
              }}
              defaultValue="default"
              label="Select active color"
              orientation="horizontal"
              size="sm"
              value={activeColor}
              onChange={setActiveColor}
            >
              {colors.map((color) => (
                <Radio key={color} color={activeColor} value={color}>
                  {color === "primary" ? "primary (default)" : color}
                </Radio>
              ))}
            </Radio.Group>
          </Card.Body>
        </Card>
      </StyledVariantContainer>
    </Examples.NavbarLayout>
  );
}
