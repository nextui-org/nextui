import * as React from "react";
import {render, fireEvent, act} from "@testing-library/react";
import {Button} from "@nextui-org/button";

import {Popover, PopoverContent, PopoverTrigger} from "../src";

describe("Popover", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Popover>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Popover ref={ref}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should hide the popover when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onOpenChange={(isOpen) => (!isOpen ? onClose() : undefined)}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content-test">
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should still hide the popover when pressing the escape key ", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onOpenChange={(isOpen) => (!isOpen ? onClose() : undefined)}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content-test">
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should hide the popover on blur ", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onOpenChange={(isOpen) => (!isOpen ? onClose() : undefined)}>
        <PopoverTrigger>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="content-test">
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.blur(content);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should work with NextUI button", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover onOpenChange={(isOpen) => (!isOpen ? onClose() : undefined)}>
        <PopoverTrigger>
          <Button disableRipple data-testid="trigger-test">
            Open popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is the content of the popover.</p>
        </PopoverContent>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("trigger-test");

    // open popover
    act(() => {
      trigger.click();
    });
    expect(onClose).toHaveBeenCalledTimes(0);

    // close popover
    act(() => {
      trigger.click();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
