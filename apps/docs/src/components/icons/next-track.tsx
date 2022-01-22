import * as React from 'react';
import { IconProps, Icon } from './index';
import withDefaults from '@utils/with-defaults';

const defaultProps = {
  fill: 'currentColor'
};

const NextTrack: React.FC<IconProps> = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <Icon
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.31 20.09c-.57 0-1.13-.15-1.65-.45a3.252 3.252 0 0 1-1.65-2.86V7.21c0-1.19.62-2.26 1.65-2.86 1.04-.6 2.27-.6 3.3 0l8.29 4.78c1.03.6 1.65 1.67 1.65 2.86s-.62 2.26-1.65 2.86l-8.29 4.78c-.52.31-1.08.46-1.65.46Zm0-14.68a1.797 1.797 0 0 0-1.8 1.8v9.57c0 .65.34 1.23.9 1.56.56.32 1.24.33 1.8 0l8.29-4.78c.56-.33.9-.91.9-1.56s-.34-1.23-.9-1.56L7.21 5.66c-.28-.16-.59-.25-.9-.25ZM20.24 18.93c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.33.75-.75.75Z"
        fill={fill}
      />
    </Icon>
  );
};

export default withDefaults(NextTrack, defaultProps);
