import * as React from "react";
import {render} from "@testing-library/react";
import {Button} from "@nextui-org/button";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {FileUpload} from "../src";

describe("FileUpload", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(<FileUpload />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<FileUpload ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should not browse when isDisabled", async () => {
    let renderResult = render(<FileUpload isDisabled />);
    let browseButton = renderResult.container.querySelector("button");

    expect(browseButton).toBeDisabled();

    renderResult = render(<FileUpload isDisabled browseButton={<Button>Browse files</Button>} />);
    browseButton = renderResult.container.querySelector("button");

    browseButton && (await user.click(browseButton));

    expect(browseButton).toBeDisabled();
  });

  it("buttons should be disabled when isDisabled", () => {
    const {container} = render(
      <FileUpload
        isDisabled
        multiple
        addButton={<Button>Add file</Button>}
        browseButton={<Button>Browse files</Button>}
        files={[new File([], "file1", {type: "jpg"})]}
        resetButton={<Button>Remove all files</Button>}
      />,
    );

    const buttons = container.getElementsByTagName("button");

    for (let index = 0; index < buttons.length; index++) {
      const btn = buttons.item(index);

      expect(btn).toBeDisabled();
    }
  });
});
