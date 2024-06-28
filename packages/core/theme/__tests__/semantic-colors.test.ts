import {getContrast} from "color2k";

import {semanticColors} from "../src/colors/semantic";

type Guideline = keyof typeof guidelines;

const guidelines = {decorative: 1.5, readable: 3, aa: 4.5, aaa: 7};
const targetGuideline: Guideline = "readable";

const testGoodContrast = (
  colorPath: string,
  color: string,
  backgroundPath: string,
  background: string,
  standard: Guideline,
) => {
  it(`${colorPath}(${color}) has enough contrast with ${backgroundPath}(${background}) to be ${standard}`, () => {
    expect(getContrast(color, background)).toBeGreaterThanOrEqual(guidelines[standard]);
  });
};

describe("semanticColors", () => {
  ["light", "dark"].forEach((mode) => {
    describe(mode, () => {
      testGoodContrast(
        `${mode}.divider.DEFAULT`,
        semanticColors[mode]?.divider?.DEFAULT,
        `${mode}.background.DEFAULT`,
        semanticColors[mode]?.background?.DEFAULT,
        "decorative",
      );
      testGoodContrast(
        `${mode}.foreground.DEFAULT`,
        semanticColors[mode]?.foreground?.DEFAULT,
        `${mode}.background.DEFAULT`,
        semanticColors[mode]?.background?.DEFAULT,
        targetGuideline,
      );
      ["default", "content1", "content2", "content3", "content4"].forEach((name) => {
        testGoodContrast(
          `${mode}.foreground.DEFAULT`,
          semanticColors[mode]?.foreground?.DEFAULT,
          `${mode}.${name}.DEFAULT`,
          semanticColors[mode]?.[name]?.DEFAULT,
          targetGuideline,
        );
        testGoodContrast(
          `${mode}.${name}.foreground`,
          semanticColors[mode]?.[name]?.foreground,
          `${mode}.${name}.DEFAULT`,
          semanticColors[mode]?.[name]?.DEFAULT,
          targetGuideline,
        );
      });
      ["primary", "secondary", "success", "warning", "danger"].forEach((name) => {
        testGoodContrast(
          `${mode}.${name}.foreground`,
          semanticColors[mode]?.[name]?.foreground,
          `${mode}.${name}.DEFAULT`,
          semanticColors[mode]?.[name]?.DEFAULT,
          targetGuideline,
        );
      });
    });
  });
});
