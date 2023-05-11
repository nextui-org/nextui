import {IconSvgProps} from "@/types";

export const LinkSquaredLinearIcon = ({
  size = 24,
  width,
  height,
  strokeWidth = "1.5",
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M8.18009 16.0199C7.42009 15.9499 6.6701 15.5999 6.0901 14.9899C4.7701 13.5999 4.7701 11.3199 6.0901 9.92989L8.2801 7.6299C9.6001 6.2399 11.7701 6.2399 13.1001 7.6299C14.4201 9.0199 14.4201 11.2999 13.1001 12.6899L12.0101 13.8399"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M15.8202 7.97998C16.5802 8.04998 17.3302 8.39998 17.9102 9.00998C19.2302 10.4 19.2302 12.68 17.9102 14.07L15.7202 16.37C14.4002 17.76 12.2302 17.76 10.9002 16.37C9.58016 14.98 9.58016 12.7 10.9002 11.31L11.9902 10.16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
