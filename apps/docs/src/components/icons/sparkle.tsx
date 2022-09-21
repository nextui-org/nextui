import * as React from "react";
import {yellow} from "@nextui-org/react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

export type SparkleProps = Props & React.HTMLAttributes<SVGElement>;

const Sparkle: React.FC<SparkleProps> = ({
  fill = yellow.yellow600,
  size,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 160 160"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M80 0s4.285 41.292 21.496 58.504C118.707 75.715 160 80 160 80s-41.293 4.285-58.504 21.496S80 160 80 160s-4.285-41.293-21.496-58.504C41.292 84.285 0 80 0 80s41.292-4.285 58.504-21.496C75.715 41.292 80 0 80 0Z"
        fill={fill}
      />
    </svg>
  );
};

export default Sparkle;
