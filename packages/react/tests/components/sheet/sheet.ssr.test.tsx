import {ssrSmoke} from "@heroui/testing/helpers";

import {SheetFixture} from "./fixtures";
import {setupSheetJsdom} from "./setup";

setupSheetJsdom();

describe("Sheet SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<SheetFixture />);
  });
  it("renders without hydration mismatch when initially open", async () => {
    await ssrSmoke(<SheetFixture defaultOpen />);
  });
});
