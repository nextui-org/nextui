import {getContrast} from "color2k";
import get from "lodash.get";

import {semanticColors} from "../semantic";

const guidelines = {decorative: 1.5, readable: 3, aa: 4.5, aaa: 7};
const targetGuideline: keyof typeof guidelines = "aa";

const testGoodContrast = (
  colorPath: string,
  backgroundPath: string,
  standard: keyof typeof guidelines,
) => {
  it(`${colorPath} has enough contrast with ${backgroundPath} to be ${standard}`, () => {
    expect(
      getContrast(get(semanticColors, colorPath), get(semanticColors, backgroundPath)),
    ).toBeGreaterThanOrEqual(guidelines[standard]);
  });
};

describe("semanticColors", () => {
  ["light", "dark"].forEach((mode) => {
    describe(mode, () => {
      testGoodContrast(`${mode}.divider.DEFAULT`, `${mode}.background.DEFAULT`, "decorative");
      testGoodContrast(`${mode}.foreground.DEFAULT`, `${mode}.background.DEFAULT`, targetGuideline);
      ["default", "content1", "content2", "content3", "content4"].forEach((name) => {
        testGoodContrast(`${mode}.foreground.DEFAULT`, `${mode}.${name}.DEFAULT`, targetGuideline);
        testGoodContrast(`${mode}.${name}.foreground`, `${mode}.${name}.DEFAULT`, targetGuideline);
      });
      ["primary", "secondary", "success", "warning", "danger"].forEach((name) => {
        testGoodContrast(`${mode}.${name}.DEFAULT`, `${mode}.background.DEFAULT`, targetGuideline);
        testGoodContrast(`${mode}.${name}.foreground`, `${mode}.${name}.DEFAULT`, targetGuideline);
      });
    });
  });
});
