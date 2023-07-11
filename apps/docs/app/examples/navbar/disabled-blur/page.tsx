"use client";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function Page() {
  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem as={Link} color="foreground" href="#">
          Features
        </NavbarItem>
        <NavbarItem isActive as={Link} href="#">
          Customers
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Integrations
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem as={Link} className="hidden lg:flex" href="#">
          Login
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
