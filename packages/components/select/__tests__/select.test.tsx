import * as React from "react";
import {render} from "@testing-library/react";

import {Select, SelectItem} from "../src";

describe("Select", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin" value="penguin">
          Penguin
        </SelectItem>
        <SelectItem key="zebra" value="zebra">
          Zebra
        </SelectItem>
        <SelectItem key="shark" value="shark">
          Shark
        </SelectItem>
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Select ref={ref} aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin" value="penguin">
          Penguin
        </SelectItem>
        <SelectItem key="zebra" value="zebra">
          Zebra
        </SelectItem>
        <SelectItem key="shark" value="shark">
          Shark
        </SelectItem>
      </Select>,
    );
    expect(ref.current).not.toBeNull();
  });
});
