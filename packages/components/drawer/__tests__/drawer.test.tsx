import * as React from "react";
import {act, render, fireEvent} from "@testing-library/react";

import {Drawer, DrawerContent, DrawerBody, DrawerHeader, DrawerFooter} from "../src";

describe("Drawer", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Drawer ref={ref} isOpen>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    expect(ref.current).not.toBeNull();
  });

  test("should have the proper 'aria' attributes", () => {
    const {getByRole, getByText} = render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    const drawer = getByRole("dialog");

    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(drawer).toHaveAttribute("role", "dialog");

    const drawerHeader = getByText("Drawer header");

    expect(drawer).toHaveAttribute("aria-labelledby", drawerHeader.id);

    const drawerBody = getByText("Drawer body");

    expect(drawer).toHaveAttribute("aria-describedby", drawerBody.id);
  });

  test("should fire 'onOpenChange' callback when close button is clicked", () => {
    const onClose = jest.fn();
    const onOpenChange = jest.fn();

    const {getByLabelText} = render(
      <Drawer isOpen onClose={onClose} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    const closeButton = getByLabelText("Close");

    act(() => {
      closeButton.click();
    });

    expect(onOpenChange).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("should hide the Drawer when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Drawer isOpen onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    const drawer = wrapper.getByRole("dialog");

    fireEvent.keyDown(drawer, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
