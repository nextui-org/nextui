import {cleanup} from "@heroui/testing/helpers";

// Only missing browser APIs are stubbed here. Gesture geometry belongs in browser tests.
export function setupSheetJsdom() {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: function (this: HTMLElement) {
        queueMicrotask(() => this.dispatchEvent(new Event("scrollend")));
      },
    });
  });
  afterEach(() => {
    cleanup();
    Reflect.deleteProperty(HTMLElement.prototype, "scrollTo");
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
}
