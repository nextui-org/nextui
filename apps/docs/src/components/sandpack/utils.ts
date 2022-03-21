import { SandpackPredefinedTemplate } from '@components';
import { HighlightedLines, HighlightedLine } from './types';

export type ViewportSizePreset =
  | 'iPhone X'
  | 'Pixel 2'
  | 'iPad'
  | 'Moto G4'
  | 'Surface Duo';

export type ViewportSize =
  | ViewportSizePreset
  | 'auto'
  | { width: number; height: number };

export type ViewportOrientation = 'portrait' | 'landscape';

const VIEWPORT_SIZE_PRESET_MAP: Record<
  ViewportSizePreset,
  { x: number; y: number }
> = {
  'iPhone X': { x: 375, y: 812 },
  iPad: { x: 768, y: 1024 },
  'Pixel 2': { x: 411, y: 731 },
  'Moto G4': { x: 360, y: 640 },
  'Surface Duo': { x: 540, y: 720 }
};

export const generateRandomId = (): string =>
  Math.floor(Math.random() * 10000).toString();

export const computeViewportSize = (
  viewport: ViewportSize,
  orientation: ViewportOrientation
): { width?: number; height?: number } => {
  if (viewport === 'auto') {
    return {};
  }

  if (typeof viewport === 'string') {
    const { x, y } = VIEWPORT_SIZE_PRESET_MAP[viewport];
    return orientation === 'portrait'
      ? { width: x, height: y }
      : { width: y, height: x };
  }

  return viewport;
};

const getLines = (lines?: string): HighlightedLine => {
  const [start, end] = lines?.includes('-') ? lines?.split('-') : [0, 0];

  const count = end ? parseInt(`${end}`, 10) - parseInt(`${start}`, 10) + 1 : 0;

  return {
    start,
    end,
    count
  };
};

export const getHighlightedLines = (
  highlightedLines?: HighlightedLines,
  template?: SandpackPredefinedTemplate
) => {
  if (!highlightedLines) {
    return [];
  }

  let lines: HighlightedLine = {};

  // if integer, we assume it's a line number
  if (Number.isInteger(Number(highlightedLines))) {
    return [
      {
        className: 'sp-highlight',
        line: Number(highlightedLines)
      }
    ];
  }

  if (typeof highlightedLines === 'string') {
    lines = getLines(highlightedLines);
  }

  if (typeof highlightedLines === 'object' && template) {
    const templateLines = highlightedLines[template];
    if (Number.isInteger(Number(templateLines))) {
      return [
        {
          className: 'sp-highlight',
          line: Number(templateLines)
        }
      ];
    }
    lines = getLines(templateLines);
  }

  if (!lines.count || lines.count === 0) {
    return [];
  }

  // map linesCount to { className: 'sp-highlight', line: 1 }
  return Array.from({ length: lines.count }, (_, i) => ({
    className: 'sp-highlight',
    line: parseInt(`${lines.start}`, 10) + i
  }));
};

export const getFileName = (filePath: string) => {
  return filePath?.split('.')?.[0]?.replace(/\W/g, '');
};
