import React from "react";
import {Meta} from "@storybook/react";

import {Link, Text, Button, Spacer} from "../index";
import {styled} from "../theme/stitches.config";

import Navbar from "./index";

export default {
  title: "Navigation/Navbar",
  component: Navbar,
} as Meta;

const AcmeLogo = () => (
  <svg
    className=""
    fill="none"
    height="36"
    viewBox="0 0 32 32"
    width="36"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const Box = styled("div", {
  // Reset
  boxSizing: "border-box",
});

const DefaultPageContent = () => (
  <Box
    css={{
      px: "$12",
      mt: "$8",
      height: "600px",
      position: "relative",
      "@xsMax": {
        px: "$10",
      },
    }}
  >
    <Text h2>Lorem ipsum dolor sit ame</Text>
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
  </Box>
);

const DefaultNavbarContent = ({color}: {color?: any}) => (
  <>
    <Navbar.Brand>
      <AcmeLogo />
      <Text b color="inherit" css={{"@xsMax": {d: "none"}}}>
        ACME
      </Text>
    </Navbar.Brand>
    <Navbar.Content
      enableCursorHighlight
      isCursorHighlightRounded
      activeColor={color}
      hideIn="sm"
      variant="highlight"
    >
      <Navbar.Link href="#">Features</Navbar.Link>
      <Navbar.Link isActive href="#">
        Customers
      </Navbar.Link>
      <Navbar.Link href="#">Integrations</Navbar.Link>
      <Navbar.Link href="#">Pricing</Navbar.Link>
      <Navbar.Link href="#">Company</Navbar.Link>
    </Navbar.Content>
    <Navbar.Content>
      <Navbar.Link color="inherit" href="#">
        Login
      </Navbar.Link>
      <Navbar.Item>
        <Button auto flat as={Link} color={color} href="#">
          Sign Up
        </Button>
      </Navbar.Item>
    </Navbar.Content>
  </>
);

const App = React.forwardRef(({children}: any, ref: any) => {
  return (
    <Box
      ref={ref}
      css={{
        maxW: "920px",
        maxHeight: "600px",
        overflow: "hidden scroll",
        boxShadow: "$md",
        position: "relative",
        border: "1px solid $colors$border",
      }}
    >
      {children}
      <DefaultPageContent />
    </Box>
  );
});

App.displayName = "App";

export const Static = () => (
  <App>
    <Navbar>
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const Sticky = () => (
  <App>
    <Navbar isBordered variant="sticky">
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const Floating = () => (
  <App>
    <Navbar color="contrast" variant="floating">
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const HideOnScroll = () => {
  const parentRef = React.useRef(null);

  return (
    <App ref={parentRef}>
      <Navbar isBordered shouldHideOnScroll parentRef={parentRef} variant="floating">
        <DefaultNavbarContent />
      </Navbar>
    </App>
  );
};

export const Toggle = () => {
  const parentRef = React.useRef(null);

  return (
    <App ref={parentRef}>
      <Navbar isBordered parentRef={parentRef} variant="sticky">
        <Navbar.Content>
          <Navbar.Toggle aria-label="toggle navigation" />
          <Navbar.Brand>
            <AcmeLogo />
            <Text b color="inherit" css={{"@xsMax": {d: "none"}}}>
              ACME
            </Text>
          </Navbar.Brand>
        </Navbar.Content>
        <Navbar.Content
          enableCursorHighlight
          isCursorHighlightRounded
          hideIn="sm"
          variant="underline"
        >
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Integrations</Navbar.Link>
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
        <Navbar.Collapse />
      </Navbar>
    </App>
  );
};
