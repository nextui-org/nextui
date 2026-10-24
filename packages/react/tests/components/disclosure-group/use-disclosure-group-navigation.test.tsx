import type {UseDisclosureGroupNavigationProps} from "@/components/disclosure-group";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {useDisclosureGroupNavigation} from "@/components/disclosure-group";

type HarnessProps = Omit<UseDisclosureGroupNavigationProps, "itemIds"> & {itemIds?: string[]};

const Harness = (props: HarnessProps) => {
  const {currentIndex, isNextDisabled, isPrevDisabled, onNext, onPrevious} =
    useDisclosureGroupNavigation(props as UseDisclosureGroupNavigationProps);

  return (
    <div>
      <span data-testid="current-index">{currentIndex}</span>
      <button disabled={isPrevDisabled} type="button" onClick={onPrevious}>
        Previous
      </button>
      <button disabled={isNextDisabled} type="button" onClick={onNext}>
        Next
      </button>
      {/* Always enabled so the hook's own bounds guards can be exercised. */}
      <button type="button" onClick={onPrevious}>
        Force previous
      </button>
      <button type="button" onClick={onNext}>
        Force next
      </button>
    </div>
  );
};

const ITEM_IDS = ["preview", "download", "share"];

const renderHarness = (props: Partial<HarnessProps> = {}) => {
  const onExpandedChange = vi.fn();

  render(
    <Harness
      expandedKeys={new Set<string | number>()}
      itemIds={ITEM_IDS}
      onExpandedChange={onExpandedChange}
      {...props}
    />,
  );

  return {onExpandedChange};
};

const currentIndex = () => screen.getByTestId("current-index").textContent;
const prevButton = () => screen.getByRole("button", {name: "Previous"});
const nextButton = () => screen.getByRole("button", {name: "Next"});

describe("useDisclosureGroupNavigation", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  describe("current index", () => {
    it("exposes the index of the first expanded item", () => {
      renderHarness({expandedKeys: new Set(["download"])});

      expect(currentIndex()).toBe("1");
    });

    it("exposes the index of the earliest item when several are expanded", () => {
      renderHarness({expandedKeys: new Set(["share", "download"])});

      expect(currentIndex()).toBe("1");
    });

    it("falls back to the first item when nothing is expanded", () => {
      renderHarness();

      expect(currentIndex()).toBe("0");
    });

    it("exposes -1 when there are no items", () => {
      renderHarness({itemIds: []});

      expect(currentIndex()).toBe("-1");
    });

    it("treats a missing itemIds list as empty", () => {
      renderHarness({itemIds: undefined});

      expect(currentIndex()).toBe("-1");
    });

    it("ignores expanded keys that are not in the item list", () => {
      renderHarness({expandedKeys: new Set(["missing"])});

      expect(currentIndex()).toBe("0");
    });
  });

  describe("disabled edges", () => {
    it("disables Previous on the first item and Next on the last", () => {
      renderHarness({expandedKeys: new Set(["preview"])});

      expect(prevButton()).toBeDisabled();
      expect(nextButton()).toBeEnabled();
    });

    it("disables Next on the last item", () => {
      renderHarness({expandedKeys: new Set(["share"])});

      expect(prevButton()).toBeEnabled();
      expect(nextButton()).toBeDisabled();
    });

    it("disables both directions when there are no items", () => {
      renderHarness({itemIds: []});

      expect(prevButton()).toBeDisabled();
      expect(nextButton()).toBeDisabled();
    });

    it("ignores a previous request on the first item", async () => {
      const {onExpandedChange} = renderHarness({expandedKeys: new Set(["preview"])});

      await user.click(screen.getByRole("button", {name: "Force previous"}));

      expect(onExpandedChange).not.toHaveBeenCalled();
    });

    it("ignores a next request on the last item", async () => {
      const {onExpandedChange} = renderHarness({expandedKeys: new Set(["share"])});

      await user.click(screen.getByRole("button", {name: "Force next"}));

      expect(onExpandedChange).not.toHaveBeenCalled();
    });
  });

  describe("single expanded mode", () => {
    it("calls onExpandedChange with only the previous item", async () => {
      const {onExpandedChange} = renderHarness({expandedKeys: new Set(["share"])});

      await user.click(prevButton());

      expect(onExpandedChange).toHaveBeenCalledWith(new Set(["download"]));
    });

    it("calls onExpandedChange with only the next item", async () => {
      const {onExpandedChange} = renderHarness({expandedKeys: new Set(["preview"])});

      await user.click(nextButton());

      expect(onExpandedChange).toHaveBeenCalledWith(new Set(["download"]));
    });
  });

  describe("multiple expanded mode", () => {
    it("adds the previous item to the existing selection", async () => {
      const {onExpandedChange} = renderHarness({
        allowsMultipleExpanded: true,
        expandedKeys: new Set(["share"]),
      });

      await user.click(prevButton());

      expect(onExpandedChange).toHaveBeenCalledWith(new Set(["share", "download"]));
    });

    it("adds the next item to the existing selection", async () => {
      const {onExpandedChange} = renderHarness({
        allowsMultipleExpanded: true,
        expandedKeys: new Set(["preview"]),
      });

      await user.click(nextButton());

      expect(onExpandedChange).toHaveBeenCalledWith(new Set(["preview", "download"]));
    });
  });
});
