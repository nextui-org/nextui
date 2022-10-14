import * as React from "react";
import {render} from "@testing-library/react";

import {Radio} from "../src";

describe("Radio", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Radio.Group label="Options">
        <Radio value="1">Option 1</Radio>
      </Radio.Group>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(
      <Radio.Group label="Options">
        <Radio ref={ref} value="1">
          Option 1
        </Radio>
      </Radio.Group>,
    );
    expect(ref.current).not.toBeNull();
  });
});
