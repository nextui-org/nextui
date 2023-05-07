import {ReactNode, useCallback, useMemo, cloneElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {Tooltip} from "@nextui-org/tooltip";
import {CopyLinearIcon, CheckLinearIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";

import {useSnippet, UseSnippetProps} from "./use-snippet";

export interface SnippetProps extends Omit<UseSnippetProps, "ref"> {}

const Snippet = forwardRef<SnippetProps, "div">((props, ref) => {
  const {
    Component,
    domRef,
    children,
    slots,
    classNames,
    copied,
    copyIcon = <CopyLinearIcon />,
    checkIcon = <CheckLinearIcon />,
    symbolBefore,
    disableCopy,
    disableTooltip,
    hideSymbol,
    hideCopyButton,
    tooltipProps,
    isMultiLine,
    onCopy,
    getSnippetProps,
    getCopyButtonProps,
  } = useSnippet({ref, ...props});

  const TooltipContent = useCallback(
    ({children}: {children?: ReactNode}) => (
      <Tooltip {...tooltipProps} isDisabled={copied || tooltipProps.isDisabled}>
        {children}
      </Tooltip>
    ),
    [...Object.values(tooltipProps)],
  );

  const contents = useMemo(() => {
    if (hideCopyButton) {
      return null;
    }

    const clonedCheckIcon = checkIcon && cloneElement(checkIcon, {className: slots.checkIcon()});
    const clonedCopyIcon = copyIcon && cloneElement(copyIcon, {className: slots.copyIcon()});

    const copyButton = (
      <Button {...getCopyButtonProps()}>
        {clonedCheckIcon}
        {clonedCopyIcon}
      </Button>
    );

    if (disableTooltip) {
      return copyButton;
    }

    return <TooltipContent>{copyButton}</TooltipContent>;
  }, [
    slots,
    classNames?.copyButton,
    copied,
    checkIcon,
    copyIcon,
    onCopy,
    TooltipContent,
    disableCopy,
    disableTooltip,
    hideCopyButton,
  ]);

  const preContent = useMemo(() => {
    if (isMultiLine && children && Array.isArray(children)) {
      return (
        <div className={slots.content({class: classNames?.content})}>
          {children.map((t, index) => (
            <pre key={`${index}-${t}`} className={slots.pre({class: classNames?.pre})}>
              {!hideSymbol && (
                <span className={slots.symbol({class: classNames?.symbol})}>{symbolBefore}</span>
              )}
              {t}
            </pre>
          ))}
        </div>
      );
    }

    return (
      <pre className={slots.pre({class: classNames?.pre})}>
        {!hideSymbol && (
          <span className={slots.symbol({class: classNames?.symbol})}>{symbolBefore}</span>
        )}
        {children}
      </pre>
    );
  }, [children, hideSymbol, isMultiLine, symbolBefore, classNames?.pre, slots]);

  return (
    <Component ref={domRef} {...getSnippetProps()}>
      {preContent}
      {contents}
    </Component>
  );
});

Snippet.displayName = "NextUI.Snippet";

export default Snippet;
