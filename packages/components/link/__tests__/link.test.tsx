import * as React from "react";
import {render} from "@testing-library/react";

import {Link} from "../src";

describe("Link", () => {
  it("should render correctly", () => {
    const wrapper = render(<Link />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(<Link ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should be no errors when href missing", () => {
    const wrapper = render(<Link>Link</Link>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should show a link icon when "showAnchorIcon" is true', () => {
    const {container} = render(
      <Link showAnchorIcon href="#">
        Link
      </Link>,
    );

    expect(container.querySelector("svg")).not.toBeNull();
  });

  it('should have target="_blank" and rel="noopener noreferrer" when "isExternal" is true', () => {
    const {container} = render(
      <Link isExternal href="#">
        Link
      </Link>,
    );

    expect(container.querySelector("a")?.rel).toBe("noopener noreferrer");
    expect(container.querySelector("a")?.target).toBe("_blank");
  });

  it('should have role="link" when "as" is different from "a"', () => {
    const {container} = render(
      <Link as="button" href="#">
        Link
      </Link>,
    );

    expect(container.querySelector("button")?.getAttribute("role")).toBe("link");
  });
});
