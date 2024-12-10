import * as React from "react";
import {render} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {Link} from "../src";

describe("Link", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

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

  it("should trigger onPress function", async () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Link onPress={onPress} />);

    const link = getByRole("link");

    await user.click(link);

    expect(onPress).toHaveBeenCalled();
  });

  it("should trigger onClick function", async () => {
    const onClick = jest.fn();
    const {getByRole} = render(<Link onClick={onClick} />);

    const link = getByRole("link");

    await user.click(link);

    expect(onClick).toHaveBeenCalled();
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
