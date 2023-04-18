import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {navbar} from "@nextui-org/theme";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import Lorem from "react-lorem-component";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarProps} from "../src";

export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    position: {
      control: {
        type: "select",
        options: ["static", "sticky", "floating"],
      },
    },
    maxWidth: {
      control: {
        type: "select",
        options: ["sm", "md", "lg", "xl", "2xl", "full"],
      },
    },
    isBlurred: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Navbar>;

const defaultProps = {
  ...navbar.defaultVariants,
};

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

const App = React.forwardRef(({children}: any, ref: any) => {
  return (
    <div
      ref={ref}
      className="max-w-[920px] max-h-[600px] overflow-x-hidden overflow-y-scroll shadow-md relative border border-neutral"
    >
      {children}
      <div className="flex flex-col gap-4 px-10 mt-8">
        <h1>Lorem ipsum dolor sit ame</h1>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Lorem key={i} className="mb-5 text-lg" count={1} sentenceUpperBound={40} />
        ))}
      </div>
    </div>
  );
});

App.displayName = "App";

const Template: ComponentStory<typeof Navbar> = (args: NavbarProps) => (
  <App>
    <Navbar {...args}>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold hidden sm:block text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex">
        <NavbarItem as={Link} color="foreground" href="#">
          Features
        </NavbarItem>
        <NavbarItem isActive as={Link} href="#">
          Customers
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Integrations
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Pricing
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Company
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem as={Link} href="#">
          Login
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  </App>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
