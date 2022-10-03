import * as React from "react";
import {render} from "@testing-library/react";

import {User} from "../src";

describe("User", () => {
  it("should render correctly", () => {
    const wrapper = render(<User name="Test" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<User ref={ref} name="Test" />);
    expect(ref.current).not.toBeNull();
  });

  it("should support image and text", () => {
    const wrapper = render(
      <div>
        <User name="Text" text="User" />
        <User name="User test" src="https://avatars.githubusercontent.com/u/30373425?v=4" />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render description correctly", () => {
    const wrapper = render(
      <div>
        <User description="This is a description" name="User" />
        <User name="User">This is a description</User>
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render link on user.link", () => {
    const {container} = render(
      <User name="User">
        <User.Link href="https://nextui.org">NextUI</User.Link>
      </User>,
    );

    expect(container.querySelector("a")).not.toBeNull();
  });

  it("should pass alt attribute", () => {
    const {container} = render(
      <User alt="User" name="User" src="https://avatars.githubusercontent.com/u/30373425?v=4" />,
    );

    expect(container.querySelector("img")?.getAttribute("alt")).toBe("User");
  });
});
