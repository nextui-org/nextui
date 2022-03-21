
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

const VideoOffIcon = `import { React } from '@nextui-org/react';\n

export const VideoOffIcon = ({
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
          d="M4 19h10.879L2.145 6.265C2.054 6.493 2 6.74 2 7v10C2 18.103 2.897 19 4 19zM18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7z"
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
        d="M18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7zM16 14.586L8.414 7H16V14.586zM4 19h10.879l-2-2H4V8.121L2.145 6.265C2.054 6.493 2 6.74 2 7v10C2 18.103 2.897 19 4 19z"
      ></path>
    </svg>
  );
};`;

const VolumeUpIcon = `import { React } from '@nextui-org/react';\n

export const VolumeUpIcon = ({
  fill = "currentColor",
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

const NotificationIcon = `import { React } from '@nextui-org/react';\n

export const NotificationIcon = ({
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
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill={fill}
      />
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

const MicrophoneOffIcon = `import { React } from '@nextui-org/react';\n

export const MicrophoneOffIcon = ({
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
          d="M21.707 20.293l-3.4-3.4C19.362 15.54 20 13.846 20 12h-2c0 1.293-.419 2.487-1.119 3.467l-1.449-1.45C15.785 13.424 16 12.74 16 12V6c0-2.217-1.785-4.021-3.979-4.021-.07 0-.14.009-.209.025C9.693 2.104 8 3.857 8 6v.586L3.707 2.293 2.293 3.707l18 18L21.707 20.293zM6 12H4c0 4.072 3.06 7.436 7 7.931V22h2v-2.069c.789-.099 1.54-.318 2.241-.63l-1.549-1.548C13.155 17.911 12.588 18 12 18 8.691 18 6 15.309 6 12z"
        ></path>
        <path
          fill={fill}
          d="M8.007,12.067c0.036,2.151,1.775,3.89,3.926,3.926L8.007,12.067z"
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
        d="M21.707 20.293l-3.388-3.388C19.368 15.553 20 13.861 20 12.021h-2c0 1.289-.415 2.478-1.109 3.456l-1.452-1.452C15.787 13.434 16 12.755 16 12.021v-6C16 3.804 14.215 2 12.021 2c-.07 0-.14.009-.209.025C9.693 2.124 8 3.878 8 6.021v.565L3.707 2.293 2.293 3.707l18 18L21.707 20.293zM10 6.021c0-1.103.897-2 2-2 .054 0 .109-.005.164-.015C13.188 4.08 14 4.956 14 6.021v6c0 .172-.029.335-.071.494L10 8.586V6.021zM6 12.021H5 4c0 4.072 3.06 7.436 7 7.931v2.069h2v-2.07c.778-.099 1.524-.305 2.218-.611l-1.558-1.558c-.527.152-1.083.239-1.66.239C8.691 18.021 6 15.329 6 12.021z"
      ></path>
      <path
        fill={fill}
        d="M8.011,12.132c0.06,2.115,1.762,3.817,3.877,3.877L8.011,12.132z"
      ></path>
    </svg>
  );
};`;


const AppJs = `import { Grid, Switch } from "@nextui-org/react";
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { VideoIcon } from './VideoIcon';
import { VolumeUpIcon } from './VolumeUpIcon';
import { MicrophoneIcon } from './MicrophoneIcon';
import { MicrophoneOffIcon } from './MicrophoneOffIcon';
import { NotificationIcon } from './NotificationIcon';
import { VideoOffIcon } from './VideoOffIcon';

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Switch
          checked={true}
          size="xl"
          color="success"
          icon={<NotificationIcon />}
        />
      </Grid>
      <Grid>
        <Switch
          checked={true}
          size="xl"
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
        />
      </Grid>
      <Grid>
        <Switch
          checked={true}
          size="xl"
          color="error"
          iconOn={<MicrophoneOffIcon filled />}
          iconOff={<MicrophoneIcon filled />}
        />
      </Grid>
      <Grid>
        <Switch
          checked={true}
          size="xl"
          color="warning"
          iconOn={<VideoOffIcon filled />}
          iconOff={<VideoIcon filled />}
        />
      </Grid>
      <Grid>
        <Switch
          checked={true}
          size="xl"
          color="secondary"
          icon={<VolumeUpIcon />}
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
  '/MicrophoneOffIcon.js': MicrophoneOffIcon,
  '/NotificationIcon.js': NotificationIcon,
  '/VideoOffIcon.js': VideoOffIcon,
  '/App.js': AppJs
};


export default {
  ...react,
};
