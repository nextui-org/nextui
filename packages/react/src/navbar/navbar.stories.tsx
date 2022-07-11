import React from "react";
import {Meta} from "@storybook/react";

import {Link, Text, Button} from "../index";

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

const DefaultContent = () => (
  <>
    <Navbar.Content placement="start">
      <Navbar.Brand as={Link} color="text">
        <AcmeLogo />
        <Text b css={{"@xsMax": {d: "none"}}}>
          ACME
        </Text>
      </Navbar.Brand>
    </Navbar.Content>
    <Navbar.Content css={{"@smMax": {d: "none"}}}>
      <Navbar.Item as={Link} color="text" href="#">
        Features
      </Navbar.Item>
      <Navbar.Item as={Link} color="text" href="#">
        Customers
      </Navbar.Item>
      <Navbar.Item as={Link} color="text" href="#">
        Integrations
      </Navbar.Item>
      <Navbar.Item as={Link} color="text" href="#">
        Pricing
      </Navbar.Item>
      <Navbar.Item as={Link} color="text" href="#">
        Company
      </Navbar.Item>
    </Navbar.Content>
    <Navbar.Content placement="end">
      <Navbar.Item as={Link} href="#">
        Login
      </Navbar.Item>
      <Navbar.Item>
        <Link href="#">
          <Button auto flat>
            Sign Up
          </Button>
        </Link>
      </Navbar.Item>
    </Navbar.Content>
  </>
);

export const Default = () => (
  <Navbar>
    <DefaultContent />
  </Navbar>
);

export const Floating = () => (
  <Navbar variant="floating">
    <DefaultContent />
  </Navbar>
);
