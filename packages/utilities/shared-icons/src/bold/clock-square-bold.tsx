import {IconSvgProps} from "../types";

export const ClockSquareBoldIcon = (props: IconSvgProps) => (
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
    <defs>
      <mask id="solarClockSquareBold0">
        <g fill="none">
          <path
            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12"
            fill="#fff"
          />
          <path
            clipRule="evenodd"
            d="M12 7.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8a.75.75 0 0 1 .75-.75"
            fill="#000"
            fillRule="evenodd"
          />
        </g>
      </mask>
    </defs>
    <path d="M0 0h24v24H0z" fill="currentColor" mask="url(#solarClockSquareBold0)" />
  </svg>
);
