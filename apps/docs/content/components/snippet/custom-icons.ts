export const CopyIcon = `export const CopyIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      fill="none"
      height={height || 20}
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      width={width || 20}
      {...props}
    >
      <path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" />
    </svg>
  );
};`;

export const CheckIcon = `export const CheckIcon = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"/>
    </svg>
  );
};`;

const App = `import {Snippet} from "@nextui-org/react";
import {CopyIcon} from "./CopyIcon";
import {CheckIcon} from "./CheckIcon";

export default function App() {
  return (
    <Snippet
      variant="bordered"
      copyIcon={<CopyIcon />}
      checkIcon={<CheckIcon />}
    >
      npm install @nextui-org/react
    </Snippet>
  );
}`;

const react = {
  "/App.jsx": App,
  "/CopyIcon.jsx": CopyIcon,
  "/CheckIcon.jsx": CheckIcon,
};

export default {
  ...react,
};
