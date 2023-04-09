import * as React from "react";
import {renderHook, act} from "@testing-library/react-hooks";
import {render} from "@testing-library/react";

import {useRefState} from "../src";

describe("useRefState", () => {
  it("should work correctly", async () => {
    const {result} = renderHook(() => useRefState(""));

    expect(result.current[0]).toEqual("");

    await act(async () => await result.current[1]("test"));

    expect(result.current[0]).toEqual("test");
    expect(result.current[2].current).toEqual("test");
  });

  it("functional initial mode should be supported", () => {
    const {result} = renderHook(() => useRefState(() => "test"));

    expect(result.current[0]).toEqual("test");
    expect(result.current[2].current).toEqual("test");
  });

  it("functional update mode should be supported", async () => {
    const {result} = renderHook(() => useRefState(""));

    expect(result.current[0]).toEqual("");

    await act(async () => await result.current[1]((value) => value + "test"));

    expect(result.current[0]).toEqual("test");
    expect(result.current[2].current).toEqual("test");
  });

  it("only the ref should track latest value", () => {
    const Mock: React.FC<unknown> = () => {
      const [state, setState, stateRef] = useRefState("");

      React.useEffect(() => {
        return () => {
          setTimeout(() => {
            expect(state).not.toEqual("test2");
            expect(stateRef.current).toEqual("test2");
          }, 0);
        };
      }, []);
      React.useEffect(() => {
        setState("test");
        setState("test2");
      }, []);

      return <span />;
    };

    const wrapper = render(<Mock />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
