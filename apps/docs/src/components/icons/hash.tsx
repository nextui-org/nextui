import * as React from "react";
import withDefaults from "@utils/with-defaults";

interface Props {
  width?: number;
  height?: number;
  size?: number;
  fill?: string;
}

const defaultProps = {
  width: 24,
  height: 24,
};

const Hash: React.FC<Props> = ({size, fill, width, height, ...props}) => {
  return (
    <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <g transform="translate(-684 -252)">
        <g id="hashtag">
          <path
            d="M2,0,0,18"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(692 255)"
          />
          <path
            d="M2,0,0,18"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(698 255)"
          />
          <path
            d="M0,0H18"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(687.5 261)"
          />
          <path
            d="M0,0H18"
            fill="none"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(686.5 267)"
          />
          <path d="M0,0H24V24H0Z" fill="none" opacity="0" transform="translate(684 252)" />
        </g>
      </g>
    </svg>
  );
};

const MemoHash = React.memo(Hash);

export default withDefaults(MemoHash, defaultProps);
