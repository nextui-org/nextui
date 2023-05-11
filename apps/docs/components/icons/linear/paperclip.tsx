import {IconSvgProps} from "@/types";

export const PaperclipLinearIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
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
      d="M12.3299 12.1499L9.85993 14.6199C8.48993 15.9899 8.48993 18.1999 9.85993 19.5699C11.2299 20.9399 13.4399 20.9399 14.8099 19.5699L18.6999 15.6799C21.4299 12.9499 21.4299 8.50992 18.6999 5.77992C15.9699 3.04992 11.5299 3.04992 8.79993 5.77992L4.55993 10.0199C2.21993 12.3599 2.21993 16.1599 4.55993 18.5099"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
