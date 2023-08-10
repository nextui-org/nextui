import {IconSvgProps} from "./types";

export const ChevronUpIcon = ({strokeWidth = 1.5, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);
