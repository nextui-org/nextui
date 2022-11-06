import * as React from "react";
import withDefaults from "@utils/with-defaults";

interface Props {
  width?: number;
  height?: number;
  size?: number;
  fill?: string;
  filled?: boolean;
}

const defaultProps = {
  width: 24,
  height: 24,
  filled: true,
};

const CodeDocument: React.FC<Props> = ({size, fill, width, height, filled, ...props}) => {
  if (filled) {
    return (
      <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
        <g fill={fill}>
          <path d="M16 2H8C4.5 2 3 4 3 7v4.47a.492.492 0 00.66.47 6.45 6.45 0 013.64-.31 6.486 6.486 0 014.31 9.62.5.5 0 00.43.75H16c3.5 0 5-2 5-5V7c0-3-1.5-5-5-5zm2.5 7.25h-2a2.748 2.748 0 01-2.75-2.75v-2a.75.75 0 011.5 0v2a1.25 1.25 0 001.25 1.25h2a.75.75 0 010 1.5z" />
          <path d="M6 13a5 5 0 105 5 5 5 0 00-5-5zm-.84 6.27a.658.658 0 010 .92.652.652 0 01-.92 0l-1.73-1.73a.658.658 0 010-.92l1.73-1.73a.651.651 0 01.92.92L3.89 18zm4.32-.81l-1.73 1.73a.652.652 0 01-.92 0 .658.658 0 010-.92L8.11 18l-1.27-1.27a.651.651 0 01.92-.92l1.73 1.73a.668.668 0 01-.01.92z" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M14.5 4.5v2c0 1.1.9 2 2 2h2M10 13l-2 2 2 2M14 13l2 2-2 2"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const MemoCodeDocument = React.memo(CodeDocument);

export default withDefaults(MemoCodeDocument, defaultProps);
