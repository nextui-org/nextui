import {getContrast} from "color2k";
import get from "lodash.get";

import {semanticColors} from "../src/colors/semantic";

type Guideline = keyof typeof guidelines;

const guidelines = {decorative: 1.5, readable: 3, aa: 4.5, aaa: 7};
const targetGuideline: Guideline = "readable";

const testGoodContrast = (colorPath: string, backgroundPath: string, standard: Guideline) => {
  const color = get(semanticColors, colorPath);
  const background = get(semanticColors, backgroundPath);

  it(`${colorPath}(${color}) has enough contrast with ${backgroundPath}(${background}) to be ${standard}`, () => {
    expect(getContrast(color, background)).toBeGreaterThanOrEqual(guidelines[standard]);
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
        testGoodContrast(`${mode}.${name}.foreground`, `${mode}.${name}.DEFAULT`, targetGuideline);
      });
    });
  });
});
