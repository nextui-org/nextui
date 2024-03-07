import {parseToRgba, readableColor} from "color2k";
import {Button, Tooltip} from "@nextui-org/react";
import {commonColors, semanticColors} from "@nextui-org/theme";
import {useClipboard} from "@nextui-org/use-clipboard";
import {useState} from "react";
import {useTheme} from "next-themes";
import {get, isEmpty} from "lodash";

type ColorsItem = {
  color: string;
  scale?: string;
  className?: string;
  textClassName?: string;
};

type SwatchColors = {
  title: string;
  items: ColorsItem[];
};

type SwatchSetProps = {
  colors: SwatchColors[];
  isSemantic?: boolean;
};

const scaleIndexMap: Record<number, string> = {
  0: "50",
  1: "100",
  2: "200",
  3: "300",
  4: "400",
  5: "500",
  6: "600",
  7: "700",
  8: "800",
  9: "900",
};

const Swatch = ({color, scale}: {color: string; scale?: string}) => {
  const [copied, setCopied] = useState(false);
  const {copy} = useClipboard();

  const colorText = color
    ? `#${parseToRgba(color)
        .slice(0, 3)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`
    : "N/A";

  const handleCopy = () => {
    copy(colorText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Tooltip content="Copied" isOpen={copied}>
      <Button
        className="flex flex-col gap-1 items-center justify-center w-24 h-24 m-2 rounded-medium shadow-small"
        style={{
          backgroundColor: color,
        }}
        onPress={handleCopy}
      >
        <span
          className="text-small font-semibold"
          style={{
            color: readableColor(color),
          }}
        >
          {colorText}
        </span>
        {scale && (
          <span
            className="text-tiny font-semibold"
            style={{
              color: readableColor(color),
            }}
          >
            {scale}
          </span>
        )}
      </Button>
    </Tooltip>
  );
};

const SemanticSwatch = ({
  color,
  className,
  textClassName,
}: {
  color: string;
  className?: string;
  textClassName?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const {copy} = useClipboard();

  const {theme} = useTheme();
  let value: string = "";
  const [colorName, colorScale] = color.split("-");

  let currentPalette = get(semanticColors, theme ?? "", {});

  if (!colorScale) {
    value = get(currentPalette, `${colorName}.DEFAULT`, "");
  } else {
    value = get(currentPalette, `${colorName}.${colorScale}`, "");
  }

  const handleCopy = () => {
    copy(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Tooltip content="Copied" isOpen={copied}>
      <Button
        className={`${className} gap-1 flex flex-col items-center justify-center w-24 h-24 m-2 rounded-medium shadow-small`}
        onPress={handleCopy}
      >
        <span className={`${textClassName} text-tiny font-semibold`}>{color}</span>
        {!isEmpty(value) && (
          <span className={`${textClassName} text-tiny font-semibold`}>{value}</span>
        )}
      </Button>
    </Tooltip>
  );
};

const SwatchSet = ({colors, isSemantic = false}: SwatchSetProps) => (
  <div className="flex flex-row flex-wrap items-center justify-center">
    {colors.map(({title, items}) => (
      <div key={title} className="flex flex-col items-start w-full h-full">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex flex-row flex-wrap items-center justify-start w-full h-full px-4 py-1">
          {items.map((c, index) =>
            isSemantic ? (
              <SemanticSwatch
                key={`${c.color}-${index}`}
                className={c.className}
                color={c.color}
                textClassName={c.textClassName}
              />
            ) : (
              <Swatch key={`${c.color}-${index}`} color={c.color} scale={c.scale} />
            ),
          )}
        </div>
      </div>
    ))}
  </div>
);

const getCommonItems = (colors: string[]) => {
  return colors.map((color, index, array) => ({
    color,
    scale: array.length > 2 ? scaleIndexMap[index] : undefined,
  }));
};

export const CommonColors = () => {
  return (
    <SwatchSet
      colors={[
        {
          title: "White & Black",
          items: getCommonItems([commonColors.white, commonColors.black]),
        },
        {
          title: "Blue",
          items: getCommonItems([...Object.values(commonColors.blue)]),
        },
        {
          title: "Purple",
          items: getCommonItems([...Object.values(commonColors.purple)]),
        },
        {
          title: "Green",
          items: getCommonItems([...Object.values(commonColors.green)]),
        },
        {
          title: "Red",
          items: getCommonItems([...Object.values(commonColors.red)]),
        },
        {
          title: "Pink",
          items: getCommonItems([...Object.values(commonColors.pink)]),
        },
        {
          title: "Yellow",
          items: getCommonItems([...Object.values(commonColors.yellow)]),
        },
        {
          title: "Cyan",
          items: getCommonItems([...Object.values(commonColors.cyan)]),
        },
        {
          title: "Zinc",
          items: getCommonItems([...Object.values(commonColors.zinc)]),
        },
      ]}
    />
  );
};

export const SemanticColors = () => {
  return (
    <SwatchSet
      isSemantic
      colors={[
        {
          title: "Layout",
          items: [
            {
              color: "background",
              className: "bg-background",
              textClassName: "text-foreground",
            },
            {
              color: "foreground",
              className: "bg-foreground",
              textClassName: "text-background",
            },
            {
              color: "divider",
              className: "bg-divider",
              textClassName: "text-foreground",
            },
            {
              color: "focus",
              className: "bg-focus",
              textClassName: "text-primary-foreground",
            },
          ],
        },
        {
          title: "Content",
          items: [
            {
              color: "content1",
              className: "bg-content1",
              textClassName: "text-content1-foreground",
            },
            {
              color: "content2",
              className: "bg-content2",
              textClassName: "text-content2-foreground",
            },
            {
              color: "content3",
              className: "bg-content3",
              textClassName: "text-content3-foreground",
            },
            {
              color: "content4",
              className: "bg-content4",
              textClassName: "text-content4-foreground",
            },
          ],
        },
        {
          title: "Base",
          items: [
            {
              color: "default",
              className: "bg-default",
              textClassName: "text-default-foreground",
            },
            {
              color: "primary",
              className: "bg-primary",
              textClassName: "text-primary-foreground",
            },
            {
              color: "secondary",
              className: "bg-secondary",
              textClassName: "text-secondary-foreground",
            },
            {
              color: "success",
              className: "bg-success",
              textClassName: "text-success-foreground",
            },
            {
              color: "warning",
              className: "bg-warning",
              textClassName: "text-warning-foreground",
            },
            {
              color: "danger",
              className: "bg-danger",
              textClassName: "text-danger-foreground",
            },
          ],
        },
        {
          title: "Default",
          items: [
            {
              color: "default-50",
              className: "bg-default-50",
              textClassName: "text-default-900",
            },
            {
              color: "default-100",
              className: "bg-default-100",
              textClassName: "text-default-900",
            },
            {
              color: "default-200",
              className: "bg-default-200",
              textClassName: "text-default-800",
            },
            {
              color: "default-300",
              className: "bg-default-300",
              textClassName: "text-default-800",
            },
            {
              color: "default-400",
              className: "bg-default-400",
              textClassName: "text-default-800",
            },
            {
              color: "default-500",
              className: "bg-default-500",
              textClassName: "text-default-foreground",
            },
            {
              color: "default-600",
              className: "bg-default-600",
              textClassName: "text-default-50",
            },
            {
              color: "default-700",
              className: "bg-default-700",
              textClassName: "text-default-100",
            },
            {
              color: "default-800",
              className: "bg-default-800",
              textClassName: "text-default-100",
            },
            {
              color: "default-900",
              className: "bg-default-900",
              textClassName: "text-default-100",
            },
          ],
        },
        {
          title: "Primary",
          items: [
            {
              color: "primary-50",
              className: "bg-primary-50",
              textClassName: "text-primary-900",
            },
            {
              color: "primary-100",
              className: "bg-primary-100",
              textClassName: "text-primary-900",
            },
            {
              color: "primary-200",
              className: "bg-primary-200",
              textClassName: "text-primary-800",
            },
            {
              color: "primary-300",
              className: "bg-primary-300",
              textClassName: "text-primary-800",
            },
            {
              color: "primary-400",
              className: "bg-primary-400",
              textClassName: "text-primary-800",
            },
            {
              color: "primary-500",
              className: "bg-primary-500",
              textClassName: "text-primary-foreground",
            },
            {
              color: "primary-600",
              className: "bg-primary-600",
              textClassName: "text-primary-50",
            },
            {
              color: "primary-700",
              className: "bg-primary-700",
              textClassName: "text-primary-100",
            },
            {
              color: "primary-800",
              className: "bg-primary-800",
              textClassName: "text-primary-100",
            },
            {
              color: "primary-900",
              className: "bg-primary-900",
              textClassName: "text-primary-100",
            },
          ],
        },
        {
          title: "Secondary",
          items: [
            {
              color: "secondary-50",
              className: "bg-secondary-50",
              textClassName: "text-secondary-900",
            },
            {
              color: "secondary-100",
              className: "bg-secondary-100",
              textClassName: "text-secondary-900",
            },
            {
              color: "secondary-200",
              className: "bg-secondary-200",
              textClassName: "text-secondary-800",
            },
            {
              color: "secondary-300",
              className: "bg-secondary-300",
              textClassName: "text-secondary-800",
            },
            {
              color: "secondary-400",
              className: "bg-secondary-400",
              textClassName: "text-secondary-800",
            },
            {
              color: "secondary-500",
              className: "bg-secondary-500",
              textClassName: "text-secondary-foreground",
            },
            {
              color: "secondary-600",
              className: "bg-secondary-600",
              textClassName: "text-secondary-50",
            },
            {
              color: "secondary-700",
              className: "bg-secondary-700",
              textClassName: "text-secondary-100",
            },
            {
              color: "secondary-800",
              className: "bg-secondary-800",
              textClassName: "text-secondary-100",
            },
            {
              color: "secondary-900",
              className: "bg-secondary-900",
              textClassName: "text-secondary-100",
            },
          ],
        },
        {
          title: "Success",
          items: [
            {
              color: "success-50",
              className: "bg-success-50",
              textClassName: "text-success-900",
            },
            {
              color: "success-100",
              className: "bg-success-100",
              textClassName: "text-success-900",
            },
            {
              color: "success-200",
              className: "bg-success-200",
              textClassName: "text-success-800",
            },
            {
              color: "success-300",
              className: "bg-success-300",
              textClassName: "text-success-800",
            },
            {
              color: "success-400",
              className: "bg-success-400",
              textClassName: "text-success-800",
            },
            {
              color: "success-500",
              className: "bg-success-500",
              textClassName: "text-success-foreground",
            },
            {
              color: "success-600",
              className: "bg-success-600",
              textClassName: "text-success-50",
            },
            {
              color: "success-700",
              className: "bg-success-700",
              textClassName: "text-success-100",
            },
            {
              color: "success-800",
              className: "bg-success-800",
              textClassName: "text-success-100",
            },
            {
              color: "success-900",
              className: "bg-success-900",
              textClassName: "text-success-100",
            },
          ],
        },
        {
          title: "Warning",
          items: [
            {
              color: "warning-50",
              className: "bg-warning-50",
              textClassName: "text-warning-900",
            },
            {
              color: "warning-100",
              className: "bg-warning-100",
              textClassName: "text-warning-900",
            },
            {
              color: "warning-200",
              className: "bg-warning-200",
              textClassName: "text-warning-800",
            },
            {
              color: "warning-300",
              className: "bg-warning-300",
              textClassName: "text-warning-800",
            },
            {
              color: "warning-400",
              className: "bg-warning-400",
              textClassName: "text-warning-800",
            },
            {
              color: "warning-500",
              className: "bg-warning-500",
              textClassName: "text-warning-foreground",
            },
            {
              color: "warning-600",
              className: "bg-warning-600",
              textClassName: "text-warning-50",
            },
            {
              color: "warning-700",
              className: "bg-warning-700",
              textClassName: "text-warning-100",
            },
            {
              color: "warning-800",
              className: "bg-warning-800",
              textClassName: "text-warning-100",
            },
            {
              color: "warning-900",
              className: "bg-warning-900",
              textClassName: "text-warning-100",
            },
          ],
        },
        {
          title: "Danger",
          items: [
            {
              color: "danger-50",
              className: "bg-danger-50",
              textClassName: "text-danger-900",
            },
            {
              color: "danger-100",
              className: "bg-danger-100",
              textClassName: "text-danger-900",
            },
            {
              color: "danger-200",
              className: "bg-danger-200",
              textClassName: "text-danger-800",
            },
            {
              color: "danger-300",
              className: "bg-danger-300",
              textClassName: "text-danger-800",
            },
            {
              color: "danger-400",
              className: "bg-danger-400",
              textClassName: "text-danger-800",
            },
            {
              color: "danger-500",
              className: "bg-danger-500",
              textClassName: "text-danger-foreground",
            },
            {
              color: "danger-600",
              className: "bg-danger-600",
              textClassName: "text-danger-50",
            },
            {
              color: "danger-700",
              className: "bg-danger-700",
              textClassName: "text-danger-100",
            },
            {
              color: "danger-800",
              className: "bg-danger-800",
              textClassName: "text-danger-100",
            },
            {
              color: "danger-900",
              className: "bg-danger-900",
              textClassName: "text-danger-100",
            },
          ],
        },
      ]}
    />
  );
};
