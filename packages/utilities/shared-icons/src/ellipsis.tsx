import {IconSvgProps} from "./types";

export const EllipsisIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="1em"
    shapeRendering="geometricPrecision"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <circle cx="12" cy="12" fill="currentColor" r="1" />
    <circle cx="19" cy="12" fill="currentColor" r="1" />
    <circle cx="5" cy="12" fill="currentColor" r="1" />
  </svg>
);
