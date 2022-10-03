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

  it('should show a link icon when "isExternal" is true', () => {
    const wrapper = render(
      <Link isExternal href="#">
        Link
      </Link>,
    );

    expect(wrapper.container.querySelector("svg")).not.toBeNull();
  });
});
