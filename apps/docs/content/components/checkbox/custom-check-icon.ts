const HeartIcon = `export const HeartIcon = ({
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill='fill'
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        fill='currentColor'
      />
    </svg>
  );
};
`;

const PlusIcon = `export const PlusIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 12H18"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 18V6"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};`;

const App = `import {Checkbox} from "@nextui-org/react";
import {HeartIcon} from './HeartIcon.jsx';  
import {PlusIcon} from './PlusIcon.jsx';

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected icon={<HeartIcon/>}>Option</Checkbox>
      <Checkbox defaultSelected icon={<PlusIcon/>} color="warning">Option</Checkbox>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
  "/HeartIcon.jsx": HeartIcon,
  "/PlusIcon.jsx": PlusIcon,
};

export default {
  ...react,
};
