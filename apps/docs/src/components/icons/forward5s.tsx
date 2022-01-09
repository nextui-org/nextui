import * as React from 'react';
import { IconProps, Icon } from './index';
import withDefaults from '@utils/with-defaults';

const defualtProps = {
  fill: 'currentColor'
};

const Rewind5s: React.FC<IconProps> = ({
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
        d="M19.48 7.09a.747.747 0 1 0-1.16.94c1.13 1.4 1.76 3.06 1.82 4.8.16 4.48-3.36 8.26-7.85 8.41-4.49.16-8.26-3.36-8.42-7.84-.16-4.48 3.36-8.26 7.85-8.41.57-.02 1.17.03 1.82.16.04.01.08 0 .12 0 .1.05.22.08.33.08a.7.7 0 0 0 .47-.17c.32-.26.37-.73.12-1.05L12.6 1.54a.748.748 0 0 0-1.05-.12c-.32.26-.37.73-.12 1.05l.83 1.03c-.19-.01-.39-.02-.58-.01-5.31.18-9.48 4.66-9.29 9.97.19 5.31 4.66 9.48 9.97 9.29 5.31-.19 9.48-4.66 9.29-9.97a9.629 9.629 0 0 0-2.17-5.69Z"
        fill={fill}
      />
      <path
        d="M12.38 16.92h-2.29c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.29a.781.781 0 0 0 0-1.56h-2.29c-.24 0-.47-.12-.61-.31a.746.746 0 0 1-.1-.68l.76-2.29c.1-.31.39-.51.71-.51h3.06c.41 0 .75.34.75.75s-.34.75-.75.75h-2.52l-.26.79h1.25a2.279 2.279 0 1 1 0 4.56Z"
        fill={fill}
      />
    </Icon>
  );
};

export default withDefaults(Rewind5s, defualtProps);
