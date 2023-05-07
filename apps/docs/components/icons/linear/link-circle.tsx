import {IconSvgProps} from "@/types";

export const LinkCircleLinearIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
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
      d="M7.93997 14.5099C7.31997 14.2799 6.76997 13.8299 6.41997 13.1899C5.61997 11.7299 6.10997 9.82989 7.52997 8.94989L9.86996 7.49988C11.28 6.61988 13.1 7.09987 13.9 8.54987C14.7 10.0099 14.21 11.9099 12.79 12.7899L12.48 13.0099"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M16.11 9.44995C16.73 9.67995 17.28 10.1299 17.63 10.7699C18.43 12.2299 17.94 14.1299 16.52 15.0099L14.1799 16.4599C12.7699 17.3399 10.9499 16.8599 10.1499 15.4099C9.34995 13.9499 9.83995 12.05 11.2599 11.17L11.57 10.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
