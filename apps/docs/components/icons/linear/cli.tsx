import {IconSvgProps} from "@/types";

export const CLILinearIcon = ({...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" />
      <path
        d="M17 15h-5m-5-5l.234.195c1.282 1.068 1.923 1.602 1.923 2.305c0 .703-.64 1.237-1.923 2.305L7 15"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
