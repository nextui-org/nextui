import {forwardRef} from "@nextui-org/system";
import {clsx} from "@nextui-org/shared-utils";
import {Tooltip} from "@nextui-org/tooltip";
import {ReactNode, useCallback, useMemo} from "react";

import {useSnippet, UseSnippetProps} from "./use-snippet";
import {SnippetCopyIcon} from "./snippet-copy-icon";
import {SnippetCheckIcon} from "./snippet-check-icon";

export interface SnippetProps extends Omit<UseSnippetProps, "ref"> {}

const Snippet = forwardRef<SnippetProps, "div">((props, ref) => {
  const {
    Component,
    domRef,
    children,
    slots,
    styles,
    copied,
    copyIcon = <SnippetCopyIcon />,
    checkIcon = <SnippetCheckIcon />,
    symbolBefore,
    disableCopy,
    disableTooltip,
    hideSymbol,
    hideCopyButton,
    tooltipProps,
    isMultiLine,
    focusProps,
    onCopy,
    getSnippetProps,
  } = useSnippet({ref, ...props});

  const TooltipContent = useCallback(
    ({children}: {children?: ReactNode}) => <Tooltip {...tooltipProps}>{children}</Tooltip>,
    [...Object.values(tooltipProps)],
  );

  const contents = useMemo(() => {
    if (hideCopyButton) {
      return null;
    }

    const copyButton = (
      <button
        className={slots.copy({
          class: clsx(disableCopy && "opacity-50 cursor-not-allowed", styles?.copy),
        })}
        onClick={onCopy}
        {...focusProps}
      >
        {copied ? checkIcon : copyIcon}
      </button>
    );

    if (disableTooltip) {
      return copyButton;
    }

    return <TooltipContent>{copyButton}</TooltipContent>;
  }, [
    slots,
    styles?.copy,
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
        <div className="flex flex-col">
          {children.map((t, index) => (
            <pre key={`${index}-${t}`} className={slots.pre({class: styles?.pre})}>
              {!hideSymbol && <span className="select-none">{symbolBefore}</span>}
              {t}
            </pre>
          ))}
        </div>
      );
    }

    return (
      <pre className={slots.pre({class: styles?.pre})}>
        {!hideSymbol && <span className="select-none">{symbolBefore}</span>}
        {children}
      </pre>
    );
  }, [children, hideSymbol, isMultiLine, symbolBefore, styles?.pre, slots]);

  return (
    <Component ref={domRef} {...getSnippetProps()}>
      {preContent}
      {contents}
    </Component>
  );
});

Snippet.displayName = "NextUI.Snippet";

export default Snippet;
