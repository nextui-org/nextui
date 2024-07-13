import {fireEvent, render} from "@testing-library/react";
import {useRef} from "react";
import React from "react";

import {useAriaOverlay} from "../src";

function Example(props) {
  const ref = useRef(null);
  const {overlayProps, underlayProps} = useAriaOverlay(props, ref);

  return (
    <div>
      <div {...underlayProps} />
      <div ref={ref} {...overlayProps} data-testid="test">
        {props.children}
      </div>
    </div>
  );
}

describe("useAriaOverlay", () => {
  it("should not fire onClose if there is only a mouse down event and no mouse up", () => {
    const onClose = jest.fn();

    render(<Example isDismissable isOpen onClose={onClose} />);

    fireEvent.mouseDown(document.body);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.mouseUp(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not fire onClose if there is only a touch start event and no touch end", () => {
    const onClose = jest.fn();

    render(<Example isDismissable isOpen onClose={onClose} />);

    fireEvent.touchStart(document.body);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.touchEnd(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
