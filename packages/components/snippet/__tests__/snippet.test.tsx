import * as React from "react";
import {render, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Snippet} from "../src";

describe("Snippet", () => {
  it("should render correctly", () => {
    const wrapper = render(<Snippet />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Snippet ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should include the code", () => {
    const wrapper = render(
      <Snippet data-testid="code-test">npm install @nextui-org/react</Snippet>,
    );

    expect(wrapper.getByTestId("code-test")).toHaveTextContent("npm install @nextui-org/react");
  });

  it("should render multiple <pre> tags when children is an array of string", () => {
    const wrapper = render(
      <Snippet data-testid="code-test">
        {["npm install @nextui-org/react", "npm install @nextui-org/react"]}
      </Snippet>,
    );

    expect(wrapper.getByTestId("code-test").querySelectorAll("pre")).toHaveLength(2);
  });

  it('should not render "copy" button when hideCopyButton is true', () => {
    const wrapper = render(<Snippet hideCopyButton />);

    expect(() => wrapper.getByRole("button")).toThrow();
  });
});

describe("Snippet - Clipboard", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    // navigator.clipboard.writeText mock
    Object.assign(navigator, {
      clipboard: {
        writeText: (data: string) =>
          new Promise((res, rej) => {
            try {
              res(data);
            } catch (error) {
              rej(error);
            }
          }),
      },
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should copy text to clipboard when "copy" button is clicked', () => {
    jest.spyOn(navigator.clipboard, "writeText");

    let code = "npm install @nextui-org/react";

    act(() => {
      const wrapper = render(<Snippet data-testid="code-test">{code}</Snippet>);

      userEvent.click(wrapper.getByRole("button"));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    });
  });
});
