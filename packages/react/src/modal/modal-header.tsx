import type {CSS} from "../theme/stitches.config";

import React, {useContext, useMemo} from "react";

import {Justify} from "../utils/prop-types";
import cslx from "../utils/clsx";

import {StyledModalHeader, ModalHeaderVariantsProps} from "./modal.styles";
import {ModalContext} from "./modal-context";

interface Props {
  className?: string;
  justify?: Justify;
  autoMargin?: boolean;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ModalHeaderProps = Props & NativeAttrs & ModalHeaderVariantsProps;

const preClass = "nextui-modal-header";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className = "",
  justify = "center" as Justify,
  autoMargin: autoMarginProp = true,
  css,
  ...props
}) => {
  const {autoMargin: autoMarginContext, noPadding} = useContext(ModalContext);

  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  return (
    <StyledModalHeader
      autoMargin={autoMargin}
      className={cslx(
        preClass,
        {
          [`${preClass}-auto-margin`]: autoMargin,
          [`${preClass}-no-padding`]: noPadding,
        },
        className,
      )}
      css={{justifyContent: justify, ...css}}
      noPadding={noPadding}
      {...props}
    >
      {children}
    </StyledModalHeader>
  );
};

ModalHeader.toString = () => ".nextui-modal-header";

const MemoModalHeader = React.memo(ModalHeader);

export default MemoModalHeader;
