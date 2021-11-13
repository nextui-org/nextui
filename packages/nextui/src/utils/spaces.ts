import { NextUISpaces } from './default-props';

export const getSpaceTransform = (key: keyof NextUISpaces) => {
  const mapSpaceKeys: { [key in keyof NextUISpaces]?: string | string[] } = {
    m: 'margin',
    mx: ['marginInlineStart', 'marginInlineEnd'],
    my: ['marginTop', 'marginBottom'],
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    p: 'padding',
    px: ['paddingInlineStart', 'paddingInlineEnd'],
    py: ['paddingTop', 'paddingBottom'],
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft'
  };
  return key && mapSpaceKeys[key] ? mapSpaceKeys[key] : null;
};
