import React from "react";
import {clsx} from "@nextui-org/shared-utils";
import BaseHighlight, {Language, PrismTheme, defaultProps} from "prism-react-renderer";

import defaultTheme from "@/libs/prism-theme";

interface CodeblockProps {
  codeString: string;
  language: Language;
  theme?: PrismTheme;
  showLines?: boolean;
}

export function Codeblock({
  codeString,
  language,
  showLines,
  theme: themeProp,
  ...props
}: CodeblockProps) {
  const theme = themeProp || defaultTheme;

  return (
    <BaseHighlight {...defaultProps} code={codeString} language={language} theme={theme} {...props}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <div data-language={language}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({line, key: i});

              return (
                <div key={i} {...lineProps} className={clsx(lineProps.className, "px-2")}>
                  {showLines && (
                    <span className="select-none text-sm mr-6 opacity-30">{i + 1}</span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})} />
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
