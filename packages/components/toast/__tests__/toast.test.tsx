import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {addToast, ToastProvider} from "../src";

const title = "Testing Title";
const description = "Testing Description";

describe("Toast", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          onClick={() => {
            addToast({
              title: "toast title",
              description: "toast description",
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", async () => {
    const ref = React.createRef<HTMLDivElement>();

    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: "toast title",
              description: "toast description",
              ref: ref,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);
    expect(ref.current).not.toBeNull();
  });

  it("should display title and description when component is rendered", async () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    const region = screen.getByRole("region");

    expect(region).toContainHTML(title);
    expect(region).toContainHTML(description);
  });

  it("should close", async () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    const initialCloseButtons = wrapper.getAllByRole("button");
    const initialButtonLength = initialCloseButtons.length;

    await user.click(initialCloseButtons[initialButtonLength - 1]);

    const finalCloseButtons = wrapper.getAllByRole("button");
    const finalButtonLength = finalCloseButtons.length;

    expect(initialButtonLength).toEqual(finalButtonLength + 1);
  });
});
