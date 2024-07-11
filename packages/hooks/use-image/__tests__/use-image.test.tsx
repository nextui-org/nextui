import {renderHook} from "@testing-library/react-hooks";
import {mocks} from "@nextui-org/test-utils";

import {useImage} from "../src";

describe("use-image hook", () => {
  let mockImage: {restore: any; simulate: (value: "loaded" | "error") => void};

  beforeEach(() => {
    mockImage = mocks.image();
  });
  afterEach(() => {
    mockImage.restore();
  });

  it("can handle missing src", () => {
    const rendered = renderHook(() => useImage({}));

    expect(rendered.result.current).toEqual("pending");
  });

  it("can handle loading image", async () => {
    const rendered = renderHook(() => useImage({src: "/test.png"}));

    expect(rendered.result.current).toEqual("loading");
    mockImage.simulate("loaded");
    await rendered.waitForValueToChange(() => rendered.result.current === "loaded");
  });

  it("can handle error image", async () => {
    mockImage.simulate("error");
    const rendered = renderHook(() => useImage({src: "/test.png"}));

    expect(rendered.result.current).toEqual("loading");
    await rendered.waitForValueToChange(() => rendered.result.current === "failed");
  });

  it("can handle cached image", async () => {
    mockImage.simulate("loaded");
    const rendered = renderHook(() => useImage({src: "/test.png"}));

    expect(rendered.result.current).toEqual("loaded");
  });
});
