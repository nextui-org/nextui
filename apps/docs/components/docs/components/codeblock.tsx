import React from "react";
import {clsx} from "@nextui-org/shared-utils";
import BaseHighlight, {Language, PrismTheme, defaultProps} from "prism-react-renderer";

import defaultTheme from "@/libs/prism-theme";

interface CodeblockProps {
  language: Language;
  codeString: string;
  metastring?: string;
  theme?: PrismTheme;
  showLines?: boolean;
  className?: string;
  children?: (props: any) => React.ReactNode;
}

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

export function Codeblock({
  codeString,
  language,
  showLines,
  theme: themeProp,
  metastring,
  className: classNameProp,
  ...props
}: CodeblockProps) {
  const theme = themeProp || defaultTheme;
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const isMultiLine = codeString.split("\n").length > 2;

  return (
    <BaseHighlight {...defaultProps} code={codeString} language={language} theme={theme} {...props}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div className="w-full" data-language={language}>
          <pre
            className={clsx(className, classNameProp, "flex max-w-full", {
              "flex-col": isMultiLine,
            })}
            style={style}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({line, key: i});

              return (
                <div
                  key={i}
                  {...lineProps}
                  className={clsx(
                    lineProps.className,
                    "px-4 relative [&>span]:relative [&>span]:z-10",
                    {
                      "px-2": showLines,
                    },
                    {
                      "before:content-[''] before:w-full before:h-full before:absolute before:z-0 before:left-0 before:bg-gradient-to-r before:from-white/10 before:to-code-background before:border-l-2 border-l-white/80 dark:before:border-l-white/50": shouldHighlightLine(
                        i,
                      ),
                    },
                  )}
                >
                  {showLines && (
                    <span className="select-none text-xs mr-6 opacity-30">{i + 1}</span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})} className={className} />
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
}
