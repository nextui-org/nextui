import React from "react";
import {styled, CSS} from "@nextui-org/react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
  css?: CSS;
}

const StyledSvg = styled("svg", {});

const PlusBold: React.FC<Props> = ({fill, size, height, width, ...props}) => {
  return (
    <StyledSvg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4 10.75h-3.25V16c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3.25H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.25V8c0-.41.34-.75.75-.75s.75.34.75.75v3.25H16c.41 0 .75.34.75.75s-.34.75-.75.75Z"
        fill={fill}
      />
    </StyledSvg>
  );
};

export default PlusBold;
