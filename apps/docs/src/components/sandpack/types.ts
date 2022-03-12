import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';

export type HighlightedLines =
  | string
  | {
      [key in SandpackPredefinedTemplate]?: string;
    };

export type Language = 'typescript' | 'javascript';

export type HighlightedLine = {
  start?: number | string;
  end?: number | string;
  count?: number;
};
