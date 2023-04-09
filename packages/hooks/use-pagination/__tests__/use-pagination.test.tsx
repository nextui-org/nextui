import {renderHook, act} from "@testing-library/react-hooks";

import {usePagination} from "../src";

describe("usePagination", () => {
  it("should work correctly", () => {
    const {result} = renderHook(() => usePagination({total: 10}));

    act(() => result.current.setPage(5));
    expect(result.current.activePage).toBe(5);
  });

  it("should return correct initial state", () => {
    const {result} = renderHook(() => usePagination({total: 10}));

    expect(result.current.range).toStrictEqual([1, 2, 3, 4, 5, "dots", 10]);
    expect(result.current.activePage).toBe(1);
  });

  it("should not change range length between page changes", () => {
    const {result} = renderHook(() => usePagination({total: 10}));

    [...new Array(10)].forEach(() => {
      expect(result.current.range.length).toBe(7);
      act(() => result.current.next());
    });
  });

  it("should return the correct initial state with custom parameters", () => {
    const {result} = renderHook(() =>
      usePagination({
        total: 20,
        siblings: 2,
        boundaries: 2,
        initialPage: 7,
      }),
    );

    expect(result.current.range).toStrictEqual([1, 2, "dots", 5, 6, 7, 8, 9, "dots", 19, 20]);
    expect(result.current.activePage).toBe(7);
  });

  it("should work correctly with custom siblings", () => {
    const {result} = renderHook(() =>
      usePagination({
        total: 20,
        page: 7,
        siblings: 2,
      }),
    );

    expect(result.current.range).toStrictEqual([1, "dots", 5, 6, 7, 8, 9, "dots", 20]);
    expect(result.current.activePage).toBe(7);
  });

  it("should work correctly without siblings", () => {
    const {result} = renderHook(() =>
      usePagination({
        total: 20,
        page: 7,
        siblings: 0,
      }),
    );

    expect(result.current.range).toStrictEqual([1, "dots", 7, "dots", 20]);
    expect(result.current.activePage).toBe(7);
  });

  it("should work correctly with custom boundaries", () => {
    const {result} = renderHook(() =>
      usePagination({
        total: 20,
        page: 7,
        boundaries: 2,
      }),
    );

    expect(result.current.range).toStrictEqual([1, 2, "dots", 6, 7, 8, "dots", 19, 20]);
    expect(result.current.activePage).toBe(7);
  });

  it("should work correctly without boundaries", () => {
    const {result} = renderHook(() =>
      usePagination({
        total: 20,
        page: 7,
        boundaries: 0,
      }),
    );

    expect(result.current.range).toStrictEqual(["dots", 6, 7, 8, "dots"]);
    expect(result.current.activePage).toBe(7);
  });

  it("should call onChange function correctly", () => {
    const onChange = jest.fn();
    const {result} = renderHook(() => usePagination({total: 10, onChange}));

    act(() => result.current.setPage(5));
    expect(onChange).toBeCalledWith(5);
  });
});
