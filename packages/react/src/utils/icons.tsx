import { NextUIThemes } from '../theme/index';
import React from 'react';

interface IconProps {
  theme?: NextUIThemes;
  fill?: string;
  filled?: boolean;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  label?: string;
}

export const Sun: React.FC<IconProps> = ({
  theme,
  fill,
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
        viewBox="0 0 512 512"
        width={size || width || 24}
        height={size || height || 24}
        {...props}
      >
        <path
          fill={fill}
          d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 512 512"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
      />
      <circle
        cx={256}
        cy={256}
        r={80}
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
    </svg>
  );
};

export const Mail: React.FC<IconProps> = ({
  theme,
  fill,
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
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
        <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
      </g>
    </svg>
  );
};

export const Moon: React.FC<IconProps> = ({
  theme,
  fill,
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
        viewBox="0 0 512 512"
        width={size || width || 24}
        height={size || height || 24}
        {...props}
      >
        <path
          fill={fill}
          d="M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61z"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 512 512"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </svg>
  );
};

export const Lock: React.FC<IconProps> = ({
  theme,
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  const color = fill;
  return (
    <svg
      data-name="Iconly/Curved/Lock"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
          transform="translate(3.85 0.75)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
        <path
          d="M.5,0V2.221"
          transform="translate(7.91 12.156)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
          transform="translate(0.75 6.824)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
};

export const Unlock: React.FC<IconProps> = ({
  theme,
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  const color = fill;
  return (
    <svg
      data-name="Iconly/Curved/Lock"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M8.927,3.237A4.562,4.562,0,0,0,0,4.484V6.653"
          transform="translate(3.849 0.75)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
        <path
          d="M.5,0V2.221"
          transform="translate(7.91 12.156)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.406,0,7.66,0Z"
          transform="translate(0.75 6.824)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
};

export const Password: React.FC<IconProps> = ({
  theme,
  fill,
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
      {...props}
    >
      <g fill={fill}>
        <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
        <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
      </g>
    </svg>
  );
};

export const Notification: React.FC<IconProps> = ({
  theme,
  fill,
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
};

export const User: React.FC<IconProps> = ({
  theme,
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        />
        <path
          data-name="Stroke 3"
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
        />
      </g>
    </svg>
  );
};

export const VolumeUp: React.FC<IconProps> = ({
  theme,
  fill,
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
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.357 6.45c-.05-.486-.103-.99-.232-1.494C12.775 3.752 11.801 3 10.758 3c-.582-.002-1.318.356-1.736.72l-3.46 2.897h-1.81c-1.333 0-2.404 1.027-2.607 2.51-.172 1.424-.214 4.11 0 5.677.186 1.567 1.21 2.579 2.607 2.579h1.81l3.527 2.94c.362.315 1 .676 1.588.676l.105.001c1.063 0 2-.78 2.35-1.98.133-.509.18-.985.224-1.445l.001-.008.047-.459c.18-1.487.18-8.739 0-10.215l-.047-.442zm4.05.045a.907.907 0 00-1.279-.237.957.957 0 00-.228 1.308c.802 1.182 1.243 2.756 1.243 4.434 0 1.677-.441 3.252-1.243 4.434a.956.956 0 00.23 1.308.905.905 0 001.277-.237c1.012-1.492 1.571-3.447 1.571-5.505s-.559-4.013-1.571-5.505zM19.29 3.22a.905.905 0 011.277.236C22.136 5.767 23 8.802 23 12c0 3.2-.864 6.234-2.433 8.544a.902.902 0 01-1.276.236.957.957 0 01-.23-1.308c1.356-1.999 2.104-4.653 2.104-7.472 0-2.818-.748-5.472-2.105-7.471a.958.958 0 01.23-1.308z"
        fill={fill}
      />
    </svg>
  );
};

export const Camera: React.FC<IconProps> = ({
  theme,
  fill,
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
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
        fill={fill}
      />
    </svg>
  );
};

export const Activity: React.FC<IconProps> = ({
  theme,
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Activity"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

export const Plus: React.FC<IconProps> = ({
  theme,
  fill,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const Minus: React.FC<IconProps> = ({
  theme,
  fill,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M6 12h12"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};
