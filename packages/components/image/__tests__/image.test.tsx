import * as React from "react";
import {act, render, waitFor} from "@testing-library/react";

import {Image} from "../src";

const url =
  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA" +
  "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO" +
  "9TXL0Y4OHwAAAABJRU5ErkJggg==";

describe("Image", () => {
  it("should render correctly", () => {
    const wrapper = render(<Image src={url} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLImageElement>();

    render(<Image ref={ref} src={url} />);
    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with skeleton", async () => {
    const {container} = render(<Image showSkeleton src={url} />);

    expect(container.querySelector(".nextui-image-skeleton")).not.toBeNull();
  });

  it("should remove skeleton when timeout", async () => {
    Object.defineProperty((global as any).Image.prototype, "complete", {
      get() {
        return true;
      },
    });

    const {container} = render(<Image maxDelay={100} src={url} />);

    const img = container.querySelector("img");

    // simulate img load
    act(() => {
      img?.dispatchEvent(new Event("load"));
    });

    await waitFor(() => {
      expect(container.querySelector(".nextui-image-skeleton")).toBeNull();
    });
  });
});
