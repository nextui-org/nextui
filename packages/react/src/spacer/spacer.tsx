import type {CSS} from "../theme/stitches.config";

import React from "react";

import {getMargin} from "../utils/dimensions";

import {StyledSpacer, SpacerVariantsProps} from "./spacer.styles";

interface Props {
  x?: number;
  y?: number;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type SpacerProps = Props & NativeAttrs & SpacerVariantsProps;

const Spacer: React.FC<SpacerProps> = ({x = 1, y = 1, css, ...props}) => {
  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);

  return (
    <StyledSpacer
      aria-hidden="true"
      css={{
        marginLeft: `${marginLeft} !important`,
        marginTop: `${marginTop} !important`,
        ...css,
      }}
      {...props}
    />
  );
};

Spacer.toString = () => ".nextui-spacer";

const MemoSpacer = React.memo(Spacer);

export default MemoSpacer;
