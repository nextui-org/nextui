import React, {useContext, useMemo} from "react";

import {CSS} from "../theme/stitches.config";
import cslx from "../utils/clsx";

import {ModalContext} from "./modal-context";
import {StyledModalBody, ModalBodyVariantsProps} from "./modal.styles";

interface Props {
  className?: string;
  autoMargin?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;

export type ModalBodyProps = Props & NativeAttrs & ModalBodyVariantsProps & {css?: CSS};

const preClass = "nextui-modal-body";

const ModalBody: React.FC<ModalBodyProps> = ({
  className = "",
  children,
  autoMargin: autoMarginProp = true,
  ...props
}) => {
  const {autoMargin: autoMarginContext, noPadding} = useContext(ModalContext);

  const autoMargin = useMemo(() => {
    return autoMarginContext !== undefined ? autoMarginContext : autoMarginProp;
  }, [autoMarginProp, autoMarginContext]);

  return (
    <StyledModalBody
      autoMargin={autoMargin}
      className={cslx(
        preClass,
        {
          [`${preClass}-auto-margin`]: autoMargin,
          [`${preClass}-no-padding`]: noPadding,
        },
        className,
      )}
      noPadding={noPadding}
      {...props}
    >
      {children}
    </StyledModalBody>
  );
};

ModalBody.toString = () => ".nextui-modal-body";

const MemoModalBody = React.memo(ModalBody);

export default MemoModalBody;
