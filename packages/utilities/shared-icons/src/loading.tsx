import {IconSvgProps} from "./types";

export const LoadingIcon = (
  props: IconSvgProps & {
    className?: string;
  },
) => {
  return (
    <svg height="24" viewBox="0 0 100 100" width="24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="32"
        stroke="currentColor"
        strokeDasharray="50.26548245743669 50.26548245743669"
        strokeLinecap="round"
        strokeWidth="8"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  );
};
