import {Checkbox} from "@nextui-org/react";

export const HeartIcon = ({size, height, width, ...props}) => {
  // avoid passing non-DOM attributes to svg
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {isSelected, isIndeterminate, disableAnimation, ...otherProps} = props;

  return (
    <svg
      fill="fill"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PlusIcon = ({size, height, width, ...props}) => {
  // avoid passing non-DOM attributes to svg
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {isSelected, isIndeterminate, disableAnimation, ...otherProps} = props;

  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M6 12H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M12 18V6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
};

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected icon={<HeartIcon />}>
        Option
      </Checkbox>
      <Checkbox defaultSelected color="warning" icon={<PlusIcon />}>
        Option
      </Checkbox>
    </div>
  );
}
