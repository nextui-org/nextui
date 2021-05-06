export const tuple = <T extends string[]>(...args: T) => args;

const buttonColors = tuple(
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'gradient'
);

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

const cardTypes = tuple(
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

export type ButtonColors = typeof buttonColors[number];

export type NormalSizes = typeof normalSizes[number];

export type NormalColors = typeof normalColors[number];

export type NormalLoaders = typeof normalLoaders[number];

export type ThemeTypes = typeof themeTypes[number];

export type SnippetTypes = typeof snippetTypes[number];

export type CardTypes = typeof cardTypes[number];

export type CopyTypes = typeof copyTypes[number];

export type TriggerTypes = typeof triggerTypes[number];

export type Placement = typeof placement[number];

export type DividerAlign = typeof dividerAlign[number];
