import * as React from "react";
import {render} from "@testing-library/react";
import {Link} from "@nextui-org/link";

import {User} from "../src";
import {AvatarIcon} from "../../avatar/src";

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

  it("should have the passed name", () => {
    const {container} = render(<User name="Test" />);
    const spans = container.querySelectorAll("span");

    expect(spans).toHaveLength(4);

    expect(spans[2]).toHaveTextContent("Test");
  });

  it("should have the passed description", () => {
    const wrapper = render(
      <User description={<p data-testid="test-desc">Test Desc</p>} name="Test Name" />,
    );

    expect(wrapper.getByTestId("test-desc")).toHaveTextContent("Test Desc");
  });

  it("should support image and text", () => {
    const wrapper = render(
      <div>
        <User avatarProps={{name: "User"}} name="User" />
        <User
          avatarProps={{src: "https://avatars.githubusercontent.com/u/30373425?v=4"}}
          name="User test"
        />
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
    const wrapper = render(
      <User
        description={
          <Link data-testid="test-user-link" href="https://nextui.org">
            NextUI
          </Link>
        }
        name="User"
      />,
    );

    expect(wrapper.getByTestId("test-user-link")).toBeInTheDocument();
  });

  it("should render avatar icon", () => {
    const {container} = render(
      <User
        avatarProps={{
          icon: <AvatarIcon />,
        }}
        name="test"
      />,
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should display initials in avatar if name is specified", () => {
    const {getByRole} = render(
      <User
        avatarProps={{
          icon: <AvatarIcon />,
          name: "WK",
        }}
        name="test"
      />,
    );

    expect(getByRole("img")).toHaveTextContent("WK");
  });
});
