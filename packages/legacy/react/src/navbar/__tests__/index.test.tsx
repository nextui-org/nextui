import React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "../index";

describe("Navbar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Navbar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with brand", () => {
    const wrapper = render(
      <Navbar data-testid="navbar-test">
        <Navbar.Brand>ACME</Navbar.Brand>
      </Navbar>,
    );

    let navbar = wrapper.getByTestId("navbar-test");
    let brand = navbar.getElementsByTagName("span")[0];

    expect(brand.innerHTML).toBe("ACME");
  });

  it("should render correctly content children", () => {
    const wrapper = render(
      <Navbar data-testid="navbar-test">
        <Navbar.Content>
          <Navbar.Link href="#">Dashboard</Navbar.Link>
          <Navbar.Link href="#">Team</Navbar.Link>
          <Navbar.Link href="#">Deployments</Navbar.Link>
          <Navbar.Link href="#">Activity</Navbar.Link>
          <Navbar.Link href="#">Settings</Navbar.Link>
        </Navbar.Content>
      </Navbar>,
    );

    let navbar = wrapper.getByTestId("navbar-test");

    let navbarItems = navbar.querySelectorAll("li");

    expect(navbarItems.length).toBe(5);
  });

  it("should render correctly with collapse items", () => {
    const items = ["item1", "item2", "item3", "item4", "item5"];

    const wrapper = render(
      <Navbar data-testid="navbar-test">
        <Navbar.Toggle data-testid="navbar-toggle-test" />
        <Navbar.Content>
          <Navbar.Link href="#">Dashboard</Navbar.Link>
          <Navbar.Link href="#">Team</Navbar.Link>
          <Navbar.Link href="#">Deployments</Navbar.Link>
          <Navbar.Link href="#">Activity</Navbar.Link>
          <Navbar.Link href="#">Settings</Navbar.Link>
        </Navbar.Content>
        <Navbar.Collapse>
          {items.map((item, index) => (
            <Navbar.CollapseItem key={`${item}-${index}`}>{item}</Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>,
    );

    let navbar = wrapper.getByTestId("navbar-test");
    let toggle = wrapper.getByTestId("navbar-toggle-test");

    userEvent.click(toggle);

    let collapse = navbar.querySelector(".nextui-navbar-collapse");

    expect(collapse).toBeTruthy();

    if (collapse) {
      let collapseItems = collapse.querySelectorAll("li");
      let firstItem = collapseItems[0];

      expect(collapseItems.length).toBe(collapseItems.length);
      expect(firstItem.innerHTML).toBe(items[0]);
    }
  });
});
