import * as React from 'react';
import withDefaults from '@utils/with-defaults';

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

const Search: React.FC<Props> = ({ size, fill, width, height, ...props }) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill={fill}>
        <path
          d="M21 11.5A9.5 9.5 0 1111.5 2a9.5 9.5 0 019.5 9.5z"
          opacity={0.4}
        />
        <path d="M21.299 21.999a.7.7 0 01-.49-.2l-1.862-1.86a.706.706 0 010-.992.706.706 0 01.99 0l1.86 1.86a.706.706 0 010 .99.738.738 0 01-.498.202z" />
      </g>
    </svg>
  );
};

const MemoSearch = React.memo(Search);

export default withDefaults(MemoSearch, defaultProps);
