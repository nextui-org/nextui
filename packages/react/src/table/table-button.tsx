import React, {forwardRef} from "react";

import {CSS} from "../theme/stitches.config";
import {Button, ButtonProps} from "../index";
import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";
import withDefaults from "../utils/with-defaults";

import {useTableContext} from "./table-context";

interface Props {
  show?: boolean;
}

const defaultProps = {
  show: true,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | "color">;

export type TableButtonProps = Props & NativeAttrs & ButtonProps & {css?: CSS};

const TableButton: React.FC<TableButtonProps> = forwardRef(
  ({onPress, children, show: _, ...props}, ref: React.Ref<HTMLButtonElement | null>) => {
    const {color, animated} = useTableContext();

    const buttonRef = useDOMRef(ref);

    return (
      <Button
        ref={buttonRef}
        animated={animated}
        className={clsx("nextui-table-button", props.className)}
        color={color as ButtonProps["color"]}
        onPress={onPress}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

TableButton.displayName = "NextUI.TableButton";

TableButton.toString = () => ".nextui-table-button";

export default withDefaults(TableButton, defaultProps);
