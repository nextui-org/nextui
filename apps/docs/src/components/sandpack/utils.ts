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

export const getHighlightedLines = (highlightedLines?: string) => {
  if (!highlightedLines) {
    return [];
  }

  // if integer, we assume it's a line number
  if (Number.isInteger(Number(highlightedLines))) {
    return [
      {
        className: 'sp-highlight',
        line: Number(highlightedLines)
      }
    ];
  }

  const [start, end] = highlightedLines?.includes('-')
    ? highlightedLines?.split('-')
    : [0, 0];

  const linesCount = end
    ? parseInt(`${end}`, 10) - parseInt(`${start}`, 10) + 1
    : 0;

  if (linesCount === 0) {
    return [];
  }

  // map linesCount to { className: 'sp-highlight', line: 1 }
  return Array.from({ length: linesCount }, (_, i) => ({
    className: 'sp-highlight',
    line: parseInt(`${start}`, 10) + i
  }));
};
