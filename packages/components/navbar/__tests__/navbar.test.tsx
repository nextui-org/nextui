import * as React from "react";
import {act, render} from "@testing-library/react";

import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "../src";

describe("Navbar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Navbar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Navbar ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly with brand", () => {
    const wrapper = render(
      <Navbar>
        <NavbarBrand data-testid="navbar-test">ACME</NavbarBrand>
      </Navbar>,
    );

    expect(wrapper.getByTestId("navbar-test")).toBeInTheDocument();
  });

  it("should render correctly content children", () => {
    const wrapper = render(
      <Navbar>
        <NavbarContent data-testid="navbar-content-test">
          <NavbarItem>Dashboard</NavbarItem>
          <NavbarItem>Team</NavbarItem>
          <NavbarItem>Deployments</NavbarItem>
          <NavbarItem>Activity</NavbarItem>
          <NavbarItem>Settings</NavbarItem>
        </NavbarContent>
      </Navbar>,
    );

    const navbarContent = wrapper.getByTestId("navbar-content-test");

    expect(navbarContent.children.length).toBe(5);
  });

  it("should render correctly with menu", () => {
    const items = ["item1", "item2", "item3", "item4", "item5"];

    const wrapper = render(
      <Navbar data-testid="navbar-test">
        <NavbarMenuToggle data-testid="navbar-toggle-test" />
        <NavbarContent data-testid="navbar-content-test">
          <NavbarItem>Dashboard</NavbarItem>
          <NavbarItem>Team</NavbarItem>
          <NavbarItem>Deployments</NavbarItem>
          <NavbarItem>Activity</NavbarItem>
          <NavbarItem>Settings</NavbarItem>
        </NavbarContent>
        <NavbarMenu data-testid="navbar-menu-test">
          {items.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>{item}</NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>,
    );

    const toggle = wrapper.getByTestId("navbar-toggle-test");

    act(() => {
      toggle.click();
    });

    const menu = wrapper.getByTestId("navbar-menu-test");

    expect(menu.children.length).toBe(items.length);
  });

  it("should call on onChange when toggle is clicked", () => {
    const onChange = jest.fn();

    const wrapper = render(
      <Navbar data-testid="navbar-test">
        <NavbarMenuToggle data-testid="navbar-toggle-test" onChange={onChange} />
        <NavbarContent data-testid="navbar-content-test">
          <NavbarItem>Dashboard</NavbarItem>
          <NavbarItem>Team</NavbarItem>
          <NavbarItem>Deployments</NavbarItem>
          <NavbarItem>Activity</NavbarItem>
          <NavbarItem>Settings</NavbarItem>
        </NavbarContent>
      </Navbar>,
    );

    const toggle = wrapper.getByTestId("navbar-toggle-test");

    act(() => {
      toggle.click();
    });

    expect(onChange).toHaveBeenCalled();
  });

  it("should render correctly with custom toggle icon", () => {
    const wrapper = render(
      <Navbar data-testid="navbar-test">
        <NavbarMenuToggle data-testid="navbar-toggle-test" icon={<span>test</span>} />
        <NavbarContent data-testid="navbar-content-test">
          <NavbarItem>Dashboard</NavbarItem>
          <NavbarItem>Team</NavbarItem>
          <NavbarItem>Deployments</NavbarItem>
          <NavbarItem>Activity</NavbarItem>
          <NavbarItem>Settings</NavbarItem>
        </NavbarContent>
      </Navbar>,
    );

    const toggle = wrapper.getByTestId("navbar-toggle-test");

    expect(toggle).toHaveTextContent("test");
  });
});
