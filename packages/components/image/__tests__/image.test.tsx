import * as React from "react";
import {render, act} from "@testing-library/react";

import {Image} from "../src";

const src = "https://via.placeholder.com/300x450";
const fallbackSrc = "https://via.placeholder.com/300x450";

describe("Image", () => {
  it("should render correctly", () => {
    const wrapper = render(<Image />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLImageElement>();

    render(<Image ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  test("creates an instance of Image when mounted", () => {
    const wrapper = render(<Image fallbackSrc={fallbackSrc} src={src} />);

    expect(wrapper.getByRole("img")).toBeInstanceOf(HTMLImageElement);
  });

  test("renders image if there is no fallback behavior defined", async () => {
    const wrapper = render(<Image src={src} />);

    expect(wrapper.getByRole("img")).toHaveAttribute("src", src);
  });

  test("should render a wrapper when isZoomed or isBlurred is true", () => {
    const wrapper = render(<Image isBlurred isZoomed src={src} />);

    expect(wrapper.getByRole("img").parentElement).toBeInstanceOf(HTMLDivElement);
  });

  test("should render a blurred image when isBlurred is true", () => {
    const wrapper = render(<Image isBlurred src={src} />);
    const blurredImage = wrapper.getByRole("img").nextElementSibling;

    expect(blurredImage).toBeInstanceOf(HTMLImageElement);
  });

  test("should fire onload", () => {
    let imageOnload: any = null;

    function trackImageOnload() {
      Object.defineProperty(window.Image.prototype, "onload", {
        get() {
          return this._onload;
        },
        set(fn) {
          imageOnload = fn;
          this._onload = fn;
        },
      });
    }

    trackImageOnload();

    const onLoad = jest.fn();

    const wrapper = render(<Image fallbackSrc={fallbackSrc} src={src} onLoad={onLoad} />);

    act(() => {
      imageOnload();
    });

    expect(wrapper.getByRole("img")).toHaveAttribute("src", src);
    expect(onLoad).toHaveBeenCalled();
  });
});
