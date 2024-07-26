import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Textarea} from "../src";

describe("Textarea", () => {
  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLTextAreaElement>();

    const {getByRole} = render(
      <Textarea
        ref={ref}
        defaultValue="junior@nextui.org"
        label="test textarea"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(ref.current?.value)?.toBe("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
