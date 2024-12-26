import * as React from "react";
import {render} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {addToast, ToastProvider} from "../src";

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
});
