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

const Copy: React.FC<Props> = ({size, fill, width, height, ...props}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"
        fill={fill}
      />
    </svg>
  );
};

const MemoCopy = React.memo(Copy);

export default withDefaults(MemoCopy, defaultProps);
