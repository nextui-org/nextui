import {getContrast, parseToRgba, transparentize} from "color2k";

import {semanticColors} from "../src/colors/semantic";
import {colorVariants} from "../src/utils/variants";

type Guideline = keyof typeof guidelines;

const guidelines = {decorative: 1.5, readable: 3, aa: 4.5, aaa: 7};
const targetGuideline: Guideline = "readable";

// this translates something like `primary-foreground/10` to an rgb value
function getColorFromName(c: string, mode: string) {
  const [name, lightness] = c.split("/");
  const [group, shade = "DEFAULT"] = name.split("-");
  let color = semanticColors?.[mode]?.[group]?.[shade];

  if (!color) return undefined;
  if (!lightness) return color;

  return transparentize(color, 1 - parseInt(lightness) / 100);
}

// This function merges two colors the same way using the
// eyedropper tool to get the resulting color would do
function mergeColors(
  added: [number, number, number, number],
  base: [number, number, number, number],
) {
  const alpha = 1 - (1 - added[3]) * (1 - base[3]);
  const red = Math.round(
    (added[0] * added[3]) / alpha + (base[0] * base[3] * (1 - added[3])) / alpha,
  );
  const green = Math.round(
    (added[1] * added[3]) / alpha + (base[1] * base[3] * (1 - added[3])) / alpha,
  );
  const blue = Math.round(
    (added[2] * added[3]) / alpha + (base[2] * base[3] * (1 - added[3])) / alpha,
  );

  if (alpha === 1) return `rgb(${red}, ${green}, ${blue})`;

  return `rgba(${red}, ${green}, ${blue} ,${alpha})`;
}

describe("colorVariants", () => {
  ["light", "dark"].forEach((mode) => {
    const solidPageBg = mergeColors(
      parseToRgba(getColorFromName("background", mode)),
      parseToRgba("#FFF"),
    );

    describe(mode, () => {
      Object.keys(colorVariants).forEach((variant) => {
        describe(variant, () => {
          Object.keys(colorVariants[variant]).forEach((color) => {
            describe(color, () => {
              const classes = colorVariants[variant][color].split(" ").reverse() as string[];

              const bgName =
                classes.find((val) => val.startsWith("bg-"))?.replace("bg-", "") || "background";
              const textName = classes.find((val) => val.startsWith("text-"))?.replace("text-", "");

              if (!textName) return;

              const bg = getColorFromName(bgName, mode);
              const text = getColorFromName(textName, mode);

              if (!bg || !text) return;

              const solidBg = mergeColors(parseToRgba(bg), parseToRgba(solidPageBg));
              const solidText = mergeColors(parseToRgba(text), parseToRgba(solidBg));

              it(`${textName}(${solidText}) has enough contrast with ${bgName}(${solidBg}) to be ${targetGuideline}`, () => {
                expect(getContrast(solidText, solidBg)).toBeGreaterThanOrEqual(
                  guidelines[targetGuideline],
                );
              });
            });
          });
        });
      });
    });
  });
});
