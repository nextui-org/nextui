import * as React from "react";
import {render} from "@testing-library/react";

import {AvatarGroup, Avatar} from "../src";

describe("AvatarGroup", () => {
  it("should render correctly", () => {
    const wrapper = render(<AvatarGroup />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<AvatarGroup ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('should render a count avatar if "max" is exceeded', () => {
    const wrapper = render(
      <AvatarGroup max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );

    const countAvatar = wrapper.getByLabelText("+3");

    expect(countAvatar).toBeInTheDocument();
  });

  it('should not render a count avatar if "max" is not exceeded', () => {
    const wrapper = render(
      <AvatarGroup max={2}>
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );

    const countAvatar = wrapper.queryByLabelText("+1");

    expect(countAvatar).not.toBeInTheDocument();
  });

  it('should display the total instead of the excess if "total" is passed', () => {
    const wrapper = render(
      <AvatarGroup max={2} total={5}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );

    const countAvatar = wrapper.getByLabelText("+5");

    expect(countAvatar).toBeInTheDocument();
  });

  it('should render custom count component if "renderCount" is passed', () => {
    const wrapper = render(
      <AvatarGroup max={2} renderCount={(count) => <span>{count}</span>}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    );

    const countAvatar = wrapper.getByText("3");

    expect(countAvatar).toBeInTheDocument();
  });
});
