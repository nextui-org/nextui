const VolumeHighIcon = `export const VolumeHighIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M18.0003 16.7503C17.8403 16.7503 17.6903 16.7003 17.5503 16.6003C17.2203 16.3503 17.1503 15.8803 17.4003 15.5503C18.9703 13.4603 18.9703 10.5403 17.4003 8.45027C17.1503 8.12027 17.2203 7.65027 17.5503 7.40027C17.8803 7.15027 18.3503 7.22027 18.6003 7.55027C20.5603 10.1703 20.5603 13.8303 18.6003 16.4503C18.4503 16.6503 18.2303 16.7503 18.0003 16.7503Z"
      fill="currentColor"
    />
    <path
      d="M19.8284 19.2503C19.6684 19.2503 19.5184 19.2003 19.3784 19.1003C19.0484 18.8503 18.9784 18.3803 19.2284 18.0503C21.8984 14.4903 21.8984 9.51027 19.2284 5.95027C18.9784 5.62027 19.0484 5.15027 19.3784 4.90027C19.7084 4.65027 20.1784 4.72027 20.4284 5.05027C23.4984 9.14027 23.4984 14.8603 20.4284 18.9503C20.2884 19.1503 20.0584 19.2503 19.8284 19.2503Z"
      fill="currentColor"
    />
    <path
      d="M14.02 3.78168C12.9 3.16168 11.47 3.32168 10.01 4.23168L7.09 6.06168C6.89 6.18168 6.66 6.25168 6.43 6.25168H5.5H5C2.58 6.25168 1.25 7.58168 1.25 10.0017V14.0017C1.25 16.4217 2.58 17.7517 5 17.7517H5.5H6.43C6.66 17.7517 6.89 17.8217 7.09 17.9417L10.01 19.7717C10.89 20.3217 11.75 20.5917 12.55 20.5917C13.07 20.5917 13.57 20.4717 14.02 20.2217C15.13 19.6017 15.75 18.3117 15.75 16.5917V7.41168C15.75 5.69168 15.13 4.40168 14.02 3.78168Z"
      fill="currentColor"
    />
  </svg>
);`;

const VolumeLowIcon = `export const VolumeLowIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M19.3284 16.7503C19.1684 16.7503 19.0184 16.7003 18.8784 16.6003C18.5484 16.3503 18.4784 15.8803 18.7284 15.5503C20.2984 13.4603 20.2984 10.5403 18.7284 8.45027C18.4784 8.12027 18.5484 7.65027 18.8784 7.40027C19.2084 7.15027 19.6784 7.22027 19.9284 7.55027C21.8984 10.1703 21.8984 13.8303 19.9284 16.4503C19.7884 16.6503 19.5584 16.7503 19.3284 16.7503Z"
      fill="currentColor"
    />
    <path
      d="M15.3481 3.78168C14.2281 3.16168 12.7981 3.32168 11.3381 4.23168L8.41813 6.06168C8.21813 6.18168 7.98813 6.25168 7.75813 6.25168H6.82812H6.32812C3.90812 6.25168 2.57812 7.58168 2.57812 10.0017V14.0017C2.57812 16.4217 3.90812 17.7517 6.32812 17.7517H6.82812H7.75813C7.98813 17.7517 8.21813 17.8217 8.41813 17.9417L11.3381 19.7717C12.2181 20.3217 13.0781 20.5917 13.8781 20.5917C14.3981 20.5917 14.8981 20.4717 15.3481 20.2217C16.4581 19.6017 17.0781 18.3117 17.0781 16.5917V7.41168C17.0781 5.69168 16.4581 4.40168 15.3481 3.78168Z"
      fill="currentColor"
    />
  </svg>
);`;

const App = `import {Slider, Button} from "@nextui-org/react";
import {VolumeLowIcon} from "./VolumeLowIcon";
import {VolumeHighIcon} from "./VolumeHighIcon";

export default function App() {
  const [value, setValue] = React.useState(25);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        aria-label="Volume"
        size="lg"
        color="success"
        value={value}
        onChange={setValue}
        startContent={
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={() => setValue((prev) => prev >= 10 ? prev - 10 : 0)}
          >
            <VolumeLowIcon className="text-2xl" />
          </Button>
        }
        endContent={
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={() => setValue((prev) => prev <= 90 ? prev + 10 : 100)}
          >
            <VolumeHighIcon className="text-2xl" />
          </Button>
        }
        className="max-w-md"
      />
      <p className="text-default-500 font-medium text-small">Current volume: {value}</p>
    </div>
  );
}`;

const AppTs = `import {Slider, Button, SliderValue} from "@nextui-org/react";
import {VolumeLowIcon} from "./VolumeLowIcon";
import {VolumeHighIcon} from "./VolumeHighIcon";

export default function App() {
  const [value, setValue] = React.useState<SliderValue>(25);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider 
        aria-label="Volume"
        size="lg"
        color="success"
        value={value} 
        onChange={setValue}
        startContent={
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={() => setValue((prev) => prev >= 10 ? prev - 10 : 0)}
          >
            <VolumeLowIcon className="text-2xl" />
          </Button>
        }
        endContent={
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={() => setValue((prev) => prev <= 90 ? prev + 10 : 100)}
          >
            <VolumeHighIcon className="text-2xl" />
          </Button>
        }
        className="max-w-md"
      />
      <p className="text-default-500 font-medium text-small">Current volume: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/VolumeHighIcon.jsx": VolumeHighIcon,
  "/VolumeLowIcon.jsx": VolumeLowIcon,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
