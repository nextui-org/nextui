import {renderHook, act} from "@testing-library/react-hooks";

import {useClipboard} from "../src";

describe("UseClipboard", () => {
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

  it("should copy text to clipboard", () => {
    jest.spyOn(navigator.clipboard, "writeText");

    const {result} = renderHook(() => useClipboard({timeout: 0}));

    act(() => {
      result.current.copy("test");
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test");
  });
});
