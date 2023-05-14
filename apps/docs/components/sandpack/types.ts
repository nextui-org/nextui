import {SandpackPredefinedTemplate} from "@codesandbox/sandpack-react";

export type HighlightedLines =
  | string
  | {
      [key in SandpackPredefinedTemplate]?: string;
    };

export type Language = "typescript" | "javascript";

export type HighlightedLine = {
  start?: number | string;
  end?: number | string;
  count?: number;
};

export type Decorators = Array<{
  className?: string;
  line: number;
  startColumn?: number;
  endColumn?: number;
  elementAttributes?: Record<string, string>;
}>;
