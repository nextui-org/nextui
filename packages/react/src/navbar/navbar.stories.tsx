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
  <Box css={{px: "$12", mt: "$8", "@xsMax": {px: "$10"}}}>
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
      sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
      proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
      tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
      gravida in.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Tincidunt vitae semper quis lectus nulla at volutpat diam. Gravida dictum fusce ut placerat.
      Erat velit scelerisque in dictum non. Tempus quam pellentesque nec nam aliquam sem et tortor
      consequat. Eu nisl nunc mi ipsum faucibus. Cras fermentum odio eu feugiat pretium nibh. Vel
      pharetra vel turpis nunc eget lorem dolor sed viverra. Sollicitudin tempor id eu nisl nunc mi
      ipsum faucibus. Sed id semper risus in hendrerit gravida rutrum. Eget nulla facilisi etiam
      dignissim. Erat imperdiet sed euismod nisi. Risus in hendrerit gravida rutrum quisque non
      tellus orci ac.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. In pellentesque massa placerat
      duis ultricies. Sit amet massa vitae tortor condimentum. Morbi tincidunt augue interdum velit
      euismod. Aliquet enim tortor at auctor urna nunc id. A scelerisque purus semper eget. Vitae
      justo eget magna fermentum iaculis. Arcu non odio euismod lacinia at quis. Et leo duis ut diam
      quam nulla porttitor massa. Eget nunc scelerisque viverra mauris. Suscipit tellus mauris a
      diam maecenas sed enim. Cras sed felis eget velit aliquet. Est placerat in egestas erat
      imperdiet sed euismod nisi porta. In ante metus dictum at tempor commodo. In cursus turpis
      massa tincidunt dui ut ornare lectus. Tempus iaculis urna id volutpat. Iaculis eu non diam
      phasellus vestibulum lorem sed risus.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Imperdiet massa tincidunt
      nunc pulvinar sapien et ligula ullamcorper malesuada. Faucibus pulvinar elementum integer enim
      neque volutpat. Gravida arcu ac tortor dignissim convallis aenean. Lectus quam id leo in
      vitae. Ultricies tristique nulla aliquet enim tortor. Nec tincidunt praesent semper feugiat
      nibh sed. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Praesent semper
      feugiat nibh sed pulvinar proin gravida. Dis parturient montes nascetur ridiculus mus mauris.
      Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Ut lectus arcu bibendum at.
      Integer enim neque volutpat ac. Diam sit amet nisl suscipit. Eros donec ac odio tempor orci
      dapibus ultrices in iaculis. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Quis
      lectus nulla at volutpat diam ut. Turpis egestas integer eget aliquet. Adipiscing tristique
      risus nec feugiat in fermentum posuere. Morbi tempus iaculis urna id. Amet commodo nulla
      facilisi nullam vehicula ipsum a arcu.
    </Text>
    <Text size="$xl">
      Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
      sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
      proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
      tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
      gravida in.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Tincidunt vitae semper quis lectus nulla at volutpat diam. Gravida dictum fusce ut placerat.
      Erat velit scelerisque in dictum non. Tempus quam pellentesque nec nam aliquam sem et tortor
      consequat. Eu nisl nunc mi ipsum faucibus. Cras fermentum odio eu feugiat pretium nibh. Vel
      pharetra vel turpis nunc eget lorem dolor sed viverra. Sollicitudin tempor id eu nisl nunc mi
      ipsum faucibus. Sed id semper risus in hendrerit gravida rutrum. Eget nulla facilisi etiam
      dignissim. Erat imperdiet sed euismod nisi. Risus in hendrerit gravida rutrum quisque non
      tellus orci ac.
    </Text>
    <Spacer y={1} />
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
      activeColor="warning"
      css={{"@smMax": {d: "none"}}}
      underlineHeight="light"
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

const App = ({children}: any) => (
  <Box
    css={{
      maxW: "920px",
      maxHeight: "600px",
      overflow: "visible scroll",
      boxShadow: "$md",
      position: "relative",
      border: "1px solid $colors$border",
    }}
  >
    {children}
    <DefaultPageContent />
  </Box>
);

export const Static = () => (
  <App>
    <Navbar>
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const Sticky = () => (
  <App>
    <Navbar isBordered isCompact variant="sticky">
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
