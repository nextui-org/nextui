import * as React from "react";
import withDefaults from "@utils/with-defaults";

interface Props {
  width?: number;
  height?: number;
  size?: number;
  fill?: string;
  className?: string;
}

const defaultProps = {
  width: 24,
  height: 24,
};

const Search: React.FC<Props> = ({size, fill, width, height, ...props}) => {
  return (
    <svg fill="none" height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};

const MemoSearch = React.memo(Search);

export default withDefaults(MemoSearch, defaultProps);
