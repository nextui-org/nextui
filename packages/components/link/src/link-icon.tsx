import {NextUI} from "@nextui-org/system";

export const LinkIcon = () => (
  <NextUI.Svg
    className="nextui-link-icon"
    css={{
      ml: "$1",
      as: "center",
      display: "flex",
      color: "currentColor",
    }}
    fill="none"
    height="1em"
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="1em"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </NextUI.Svg>
);

LinkIcon.toString = () => ".nextui-link-icon";
