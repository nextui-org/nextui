const SunIcon = `import { React } from '@nextui-org/react';\n

export const SunIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  if (filled) {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g fill={fill}>
          <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
          <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
        </g>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={fill}
        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19H12.998V22H10.998zM10.998 2H12.998V5H10.998zM1.998 11H4.998V13H1.998zM18.998 11H21.998V13H18.998z"
      ></path>
      <path
        fill={fill}
        transform="rotate(-45.017 5.986 18.01)"
        d="M4.487 17.01H7.487V19.01H4.487z"
      ></path>
      <path
        fill={fill}
        transform="rotate(-45.001 18.008 5.99)"
        d="M16.508 4.99H19.509V6.99H16.508z"
      ></path>
      <path
        fill={fill}
        transform="rotate(-134.983 5.988 5.99)"
        d="M4.487 4.99H7.487V6.99H4.487z"
      ></path>
      <path
        fill={fill}
        transform="rotate(134.999 18.008 18.01)"
        d="M17.008 16.51H19.008V19.511000000000003H17.008z"
      ></path>
    </svg>
  );
};`;

const MoonIcon = `import { React } from '@nextui-org/react';\n

export const MoonIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  if (filled) {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
          fill={fill}
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={fill}
        d="M20.742,13.045c-0.677,0.18-1.376,0.271-2.077,0.271c-2.135,0-4.14-0.83-5.646-2.336c-2.008-2.008-2.799-4.967-2.064-7.723 c0.092-0.345-0.007-0.713-0.259-0.965C10.444,2.04,10.077,1.938,9.73,2.034C8.028,2.489,6.476,3.382,5.241,4.616 c-3.898,3.898-3.898,10.243,0,14.143c1.889,1.889,4.401,2.93,7.072,2.93c2.671,0,5.182-1.04,7.07-2.929 c1.236-1.237,2.13-2.791,2.583-4.491c0.092-0.345-0.008-0.713-0.26-0.965C21.454,13.051,21.085,12.951,20.742,13.045z M17.97,17.346c-1.511,1.511-3.52,2.343-5.656,2.343c-2.137,0-4.146-0.833-5.658-2.344c-3.118-3.119-3.118-8.195,0-11.314 c0.602-0.602,1.298-1.102,2.06-1.483c-0.222,2.885,0.814,5.772,2.89,7.848c2.068,2.069,4.927,3.12,7.848,2.891 C19.072,16.046,18.571,16.743,17.97,17.346z"
      ></path>
    </svg>
  );
};`;

const VideoIcon = `import { React } from '@nextui-org/react';\n

export const VideoIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || width}
        height={size || height}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill={fill}
          d="M18,7c0-1.103-0.897-2-2-2H4C2.897,5,2,5.897,2,7v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-3.333L22,17V7l-4,3.333 V7z"
        ></path>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={fill}
        d="M18,7c0-1.103-0.897-2-2-2H4C2.897,5,2,5.897,2,7v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-3.333L22,17V7l-4,3.333 V7z M16.002,17H4V7h12l0.001,4.999L16,12l0.001,0.001L16.002,17z"
      ></path>
    </svg>
  );
};`;

const VolumeUpIcon = `import { React } from '@nextui-org/react';\n

export const VolumeUpIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        fill={fill}
        d="M16,21c3.527-1.547,5.999-4.909,5.999-9S19.527,4.547,16,3v2c2.387,1.386,3.999,4.047,3.999,7S18.387,17.614,16,19V21z"
      ></path>
      <path
        fill={fill}
        d="M16 7v10c1.225-1.1 2-3.229 2-5S17.225 8.1 16 7zM4 17h2.697L14 21.868V2.132L6.697 7H4C2.897 7 2 7.897 2 9v6C2 16.103 2.897 17 4 17z"
      ></path>
    </svg>
  );
};`;

const MicrophoneIcon = `import { React } from '@nextui-org/react';\n

export const MicrophoneIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || width}
        height={size || height}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill={fill}
          d="M12,16c2.206,0,4-1.794,4-4V6c0-2.217-1.785-4.021-3.979-4.021c-0.069,0-0.14,0.009-0.209,0.025C9.693,2.104,8,3.857,8,6v6 C8,14.206,9.794,16,12,16z"
        />
        <path
          fill={fill}
          d="M11,19.931V22h2v-2.069c3.939-0.495,7-3.858,7-7.931h-2c0,3.309-2.691,6-6,6s-6-2.691-6-6H4 C4,16.072,7.061,19.436,11,19.931z"
        ></path>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={fill}
        d="M16,12V6c0-2.217-1.785-4.021-3.979-4.021c-0.069,0-0.14,0.009-0.209,0.025C9.693,2.104,8,3.857,8,6v6c0,2.206,1.794,4,4,4 S16,14.206,16,12z M10,12V6c0-1.103,0.897-2,2-2c0.055,0,0.109-0.005,0.163-0.015C13.188,4.06,14,4.935,14,6v6c0,1.103-0.897,2-2,2 S10,13.103,10,12z"
      ></path>
      <path
        fill={fill}
        d="M6,12H4c0,4.072,3.061,7.436,7,7.931V22h2v-2.069c3.939-0.495,7-3.858,7-7.931h-2c0,3.309-2.691,6-6,6S6,15.309,6,12z"
      ></path>
    </svg>
  );
};`;

const AppJs = `import { Grid, Avatar } from "@nextui-org/react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import { VideoIcon } from "./VideoIcon";
import { VolumeUpIcon } from "./VolumeUpIcon";
import { MicrophoneIcon } from "./MicrophoneIcon";

export default function App() {
  return (
    <Grid.Container gap={2} css={{ color: "$text" }}>
      <Grid>
        <Avatar squared icon={<SunIcon size={20} fill="currentColor" />} />
      </Grid>
      <Grid>
        <Avatar squared icon={<MoonIcon size={20} fill="currentColor" />} />
      </Grid>
      <Grid>
        <Avatar squared icon={<VideoIcon size={20} fill="currentColor" />} />
      </Grid>
      <Grid>
        <Avatar squared icon={<VolumeUpIcon size={20} fill="currentColor" />} />
      </Grid>
      <Grid>
        <Avatar
          squared
          icon={<MicrophoneIcon size={20} fill="currentColor" />}
        />
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  '/SunIcon.js': SunIcon,
  '/MoonIcon.js': MoonIcon,
  '/VideoIcon.js': VideoIcon,
  '/VolumeUpIcon.js': VolumeUpIcon,
  '/MicrophoneIcon.js': MicrophoneIcon,
  '/App.js': AppJs
};

export default {
  ...react
};
