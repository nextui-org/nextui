import type {Language, PrismTheme} from "prism-react-renderer";
import type {TransformTokensTypes} from "./helper";

import React, {forwardRef, useEffect} from "react";
import {clsx, dataAttr, getUniqueID} from "@nextui-org/shared-utils";
import BaseHighlight, {defaultProps} from "prism-react-renderer";
import {debounce, omit} from "@nextui-org/shared-utils";
import {cn} from "@nextui-org/react";

import {transformTokens} from "./helper";

import defaultTheme from "@/libs/prism-theme";

interface CodeblockProps {
  language: Language;
  codeString: string;
  metastring?: string;
  theme?: PrismTheme;
  children?: React.ReactNode;
  showLines?: boolean;
  removeIndent?: boolean;
  hideScrollBar?: boolean;
  className?: string;
}

type HighlightStyle = "inserted" | "deleted" | undefined;

const nextuiCliCommand = [
  /^init$/,
  /^add$/,
  /^upgrade$/,
  /^remove$/,
  /^list$/,
  /^env$/,
  /^doctor$/,
];

const highlightStyleToken = ["bun", /nextui\s\w+(?=\s?)/, /^nextui$/, "Usage", ...nextuiCliCommand];
const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta?: string) => {
  if (!meta) {
    return () => false;
  }

  if (!RE.test(meta)) {
    return () => false;
  }
  // @ts-ignore
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );

    return inRange;
  };
};

const Codeblock = forwardRef<HTMLPreElement, CodeblockProps>(
  (
    {
      codeString,
      language,
      showLines,
      theme: themeProp,
      metastring,
      hideScrollBar,
      removeIndent,
      className: classNameProp,
      ...props
    },
    ref,
  ) => {
    const theme = themeProp || defaultTheme;
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
    const isMultiLine = codeString.split("\n").length > 2;

    const lastSelectionText = React.useRef<string | null>(null);

    const isDiff = language.includes("diff");

    const codeLang = isDiff ? (language.split("-")[1] as Language) : language;

    let highlightStyle: HighlightStyle[] = [];

    if (isDiff) {
      let code: string[] = [];

      highlightStyle = codeString.split?.("\n").map((line) => {
        if (line.startsWith("+")) {
          code.push(line.substr(1));

          return "inserted";
        }
        if (line.startsWith("-")) {
          code.push(line.substr(1));

          return "deleted";
        }
        code.push(line);
      });

      codeString = code.join("\n");
    }

    useEffect(() => {
      const handleSelectionChange = () => {
        if (!window.getSelection) return;

        const el = window.getSelection()?.anchorNode?.parentNode;

        if (!el) return;

        const selectionText = window.getSelection()?.toString();

        if (!selectionText) return;

        if (
          !selectionText ||
          selectionText === lastSelectionText.current ||
          !codeString.includes(selectionText)
        )
          return;

        lastSelectionText.current = selectionText;
      };

      const debouncedHandleSelectionChange = debounce(handleSelectionChange, 1000);

      document.addEventListener("selectionchange", debouncedHandleSelectionChange);

      return () => {
        document.removeEventListener("selectionchange", debouncedHandleSelectionChange);
      };
    }, []);

    return (
      <BaseHighlight
        {...defaultProps}
        code={codeString}
        language={codeLang}
        theme={theme}
        {...props}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre
            ref={ref}
            className={clsx(
              className,
              classNameProp,
              `language-${codeLang}`,
              "max-w-full contents",
              {
                "flex-col": isMultiLine,
                "overflow-x-scroll scrollbar-hide": hideScrollBar,
              },
            )}
            data-language={language}
            style={style}
          >
            {transformTokens(tokens).map((line) => {
              const folderLine = line[0] as TransformTokensTypes;

              const isFolder = folderLine.types?.includes("folderStart");

              const renderLine = (
                line: TransformTokensTypes[],
                i: number,
                as: "div" | "span" = "div",
              ) => {
                const Tag = as;
                const lineProps = getLineProps({line, key: i});

                return (
                  <Tag
                    {...omit(lineProps, ["key"])}
                    key={`${i}-${getUniqueID("line-wrapper")}`}
                    className={clsx(
                      lineProps.className,
                      removeIndent ? "pr-4" : "px-4",
                      "relative [&>span]:relative [&>span]:z-10",
                      {
                        "px-2": showLines,
                      },
                      {
                        "before:to-code-background before:absolute before:left-0 before:z-0 before:h-full before:w-full before:bg-gradient-to-r before:from-white/10 before:content-['']":
                          isFolder ? false : shouldHighlightLine(i),
                      },
                    )}
                    data-deleted={dataAttr(highlightStyle?.[i] === "deleted")}
                    data-inserted={dataAttr(highlightStyle?.[i] === "inserted")}
                  >
                    {showLines && (
                      <span
                        className={cn(
                          "mr-6 select-none text-xs opacity-30",
                          i + 1 >= 10 ? "mr-4" : "",
                          i + 1 >= 100 ? "mr-2" : "",
                          i + 1 >= 1000 ? "mr-0" : "",
                        )}
                      >
                        {i + 1}
                      </span>
                    )}

                    {line.map((token, key) => {
                      const props = getTokenProps({token, key}) || {};
                      const isCopy = token.types.includes("copy");

                      return isCopy ? (
                        <span key={key} className="copy-token" style={{whiteSpace: "inherit"}}>
                          {token.folderContent?.map((folderTokens) => {
                            return folderTokens.map((token, index) => {
                              // Hack for wrap line
                              return token.content === "" ? (
                                <div key={`${index}-${getUniqueID("line")}`} />
                              ) : (
                                <span key={`${index}-${getUniqueID("line")}`}>{token.content}</span>
                              );
                            });
                          })}
                        </span>
                      ) : (
                        <span
                          {...omit(props, ["key"])}
                          key={`${key}-${getUniqueID("line")}`}
                          className={cn(className, token.class)}
                          style={{
                            ...props.style,
                            ...(highlightStyleToken.some((t) => {
                              const content = token.content.trim();

                              const regex = t instanceof RegExp ? t : new RegExp(t);

                              return regex.test(content);
                            })
                              ? {color: "rgb(var(--code-function))"}
                              : {}),
                          }}
                        />
                      );
                    })}
                  </Tag>
                );
              };
              const renderFolderTokens = (tokens: TransformTokensTypes[][]) => {
                return tokens.map((token, key) => {
                  const index = key + folderLine.index! + 1;

                  return renderLine(token, index);
                });
              };

              return isFolder ? (
                <details key={`${folderLine.index}`} open={folderLine.open ? true : undefined}>
                  <summary className="cursor-pointer">
                    {renderLine(folderLine.summaryContent as any, folderLine.index!, "span")}
                  </summary>
                  {renderFolderTokens(folderLine.folderContent as any)}
                </details>
              ) : (
                renderLine(line, folderLine.index!)
              );
            })}
          </pre>
        )}
      </BaseHighlight>
    );
  },
);

Codeblock.displayName = "CodeBlock";

export default Codeblock;
