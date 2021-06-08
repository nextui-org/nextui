export const tuple = <T extends string[]>(...args: T) => args;

const normalSizes = tuple('mini', 'small', 'medium', 'large', 'xlarge');

export const normalColors = tuple(
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'gradient'
);

export const normalLoaders = tuple(
  'default',
  'points',
  'points-opacity',
  'gradient',
  'spinner'
);

export const normalWeights = tuple('light', 'normal', 'bold');

const themeTypes = tuple('dark', 'light');

const snippetTypes = tuple(
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'lite'
);

const cardColors = tuple(
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'dark',
  'lite',
  'alert',
  'purple',
  'violet',
  'gradient',
  'cyan'
);

const copyTypes = tuple('default', 'slient', 'prevent');

const triggerTypes = tuple('hover', 'click');

const placement = tuple(
  'top',
  'topStart',
  'topEnd',
  'left',
  'leftStart',
  'leftEnd',
  'bottom',
  'bottomStart',
  'bottomEnd',
  'right',
  'rightStart',
  'rightEnd'
);

const dividerAlign = tuple('start', 'center', 'end', 'left', 'right');

const justify = tuple(
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly'
);

const alignItems = tuple(
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline'
);

const alignContent = tuple(
  'stretch',
  'center',
  'flex-start',
  'flex-end',
  'space-between',
  'space-around'
);

const direction = tuple('row', 'row-reverse', 'column', 'column-reverse');

const wrap = tuple('nowrap', 'wrap', 'wrap-reverse');

const display = tuple(
  'flex',
  'block',
  'grid',
  'inline',
  'inline-block',
  'inline-flex',
  'inline-grid'
);

export type Display = typeof display[number];

export type Justify = typeof justify[number];

export type AlignItems = typeof alignItems[number];

export type AlignContent = typeof alignContent[number];

export type Direction = typeof direction[number];

export type Wrap = typeof wrap[number];

export type NormalSizes = typeof normalSizes[number];

export type NormalWeights = typeof normalWeights[number];

export type NormalColors = typeof normalColors[number];

export type NormalLoaders = typeof normalLoaders[number];

export type ThemeTypes = typeof themeTypes[number];

export type SnippetTypes = typeof snippetTypes[number];

export type CardColors = typeof cardColors[number];

export type CopyTypes = typeof copyTypes[number];

export type TriggerTypes = typeof triggerTypes[number];

export type Placement = typeof placement[number];

export type DividerAlign = typeof dividerAlign[number];

export type BreakpointsValue = number | boolean;
