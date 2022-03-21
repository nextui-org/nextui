import {
  styled,
  sharedFocus,
  VariantProps,
  cssFocusVisible
} from '../theme/stitches.config';

export const StyledCollapse = styled(
  'div',
  {
    transition: '$default',
    '.nextui-collapse-title-content': {
      w: '100%',
      'h1,h2,h3,h4,h5,h6,p,span,b': {
        margin: 0
      }
    },
    '.nextui-collapse-title-container': {
      d: 'flex',
      jc: 'space-between',
      ai: 'center'
    },
    '.nextui-collapse-title': {
      color: '$foreground'
    },
    '.nextui-collapse-subtitle': {
      color: '$accents5',
      margin: 0,
      '*': {
        margin: 0
      }
    },
    '.nextui-collapse-title-content-left': {
      mr: '$sm'
    },
    '.nextui-collapse-title-content-left, .nextui-collapse-title-content-right':
      {
        d: 'flex',
        ai: 'center'
      },
    '@motion': {
      transition: 'none',
      '.nextui-collapse-title-content-right ': {
        svg: {
          transition: 'none'
        }
      }
    },
    variants: {
      shadow: {
        true: {
          border: 'none',
          boxShadow: '$md',
          br: '$lg',
          p: '0 $lg',
          bg: '$background'
        }
      },
      borderWeight: {
        light: {
          $$collapseBorderWidth: '$borderWeights$light'
        },
        normal: {
          $$collapseBorderWidth: '$borderWeights$normal'
        },
        bold: {
          $$collapseBorderWidth: '$borderWeights$bold'
        },
        extrabold: {
          $$collapseBorderWidth: '$borderWeights$extrabold'
        },
        black: {
          $$collapseBorderWidth: '$borderWeights$black'
        }
      },
      divider: {
        true: {
          borderTop: '$$collapseBorderWidth solid $border',
          borderBottom: '$$collapseBorderWidth solid $border'
        }
      },
      bordered: {
        true: {
          br: '$lg',
          p: '0 $lg',
          border: '$$collapseBorderWidth solid $border'
        }
      },
      animated: {
        true: {
          '.nextui-collapse-title-content-right ': {
            svg: {
              transition: 'transform 200ms ease'
            }
          }
        },
        false: {
          transition: 'none'
        }
      },
      visible: {
        true: {
          '.nextui-collapse-title-content-right ': {
            svg: {
              transform: 'rotateZ(-90deg)'
            }
          }
        },
        false: {
          '.nextui-collapse-title-content-right': {
            svg: {
              transform: 'rotateZ(0deg)'
            }
          }
        }
      },
      isDark: {
        true: {}
      }
    },
    defaultVariants: {
      borderWeight: 'light'
    },
    compoundVariants: [
      // isDark && shadow
      {
        isDark: true,
        shadow: true,
        css: {
          bg: '$accents1'
        }
      }
    ]
  },
  sharedFocus
);

export const StyledCollapseView = styled(
  'div',
  {
    w: '100%',
    d: 'block',
    ta: 'left',
    bg: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: '$lg 0',
    variants: {
      disabled: {
        true: {
          cursor: 'not-allowed',
          '.nextui-collapse-title, .nextui-collapse-subtitle': {
            opacity: 0.5
          }
        }
      }
    }
  },
  cssFocusVisible
);

export const StyledCollapseContent = styled('div', {
  fontSize: '$base',
  lineHeight: '$lg',
  pb: '$lg',
  '*:first-child': {
    mt: 0
  },
  '*:last-child': {
    mb: 0
  }
});

export const StyledCollapseIcon = styled('svg', {
  path: {
    stroke: '$accents5'
  }
});

export const StyledCollapseGroup = styled('div', {
  width: 'auto',
  padding: '0 $sm',
  'div + div': {
    borderTop: 'none'
  },
  [`& ${StyledCollapse}:first-child`]: {
    borderTop: 'none'
  },
  [`& ${StyledCollapse}:last-child`]: {
    borderBottom: 'none'
  },
  variants: {
    borderWeight: {
      light: {
        $$collapseGroupBorderWidth: '$borderWeights$light'
      },
      normal: {
        $$collapseGroupBorderWidth: '$borderWeights$normal'
      },
      bold: {
        $$collapseGroupBorderWidth: '$borderWeights$bold'
      },
      extrabold: {
        $$collapseGroupBorderWidth: '$borderWeights$extrabold'
      },
      black: {
        $$collapseGroupBorderWidth: '$borderWeights$black'
      }
    },
    shadow: {
      true: {
        br: '$lg',
        border: 'none',
        boxShadow: '$md',
        p: '0 $lg',
        bg: '$background'
      }
    },
    bordered: {
      true: {
        br: '$lg',
        p: '0 $lg',
        border: '$$collapseGroupBorderWidth solid $border'
      }
    },
    splitted: {
      true: {
        [`& ${StyledCollapse}`]: {
          br: '$lg',
          border: 'none',
          bg: '$background',
          boxShadow: '$md',
          p: '0 $lg',
          margin: '$md 0'
        }
      }
    },
    isDark: {
      true: {}
    }
  },
  defaultVariants: {
    borderWeight: 'light',
    shadow: false,
    bordered: false,
    splitted: false
  },
  compoundVariants: [
    // isDark && shadow
    {
      isDark: true,
      shadow: true,
      css: {
        bg: '$accents1'
      }
    },
    // splitted && isDark
    {
      isDark: true,
      splitted: true,
      css: {
        [`& ${StyledCollapse}`]: {
          bg: '$accents1'
        }
      }
    }
  ]
});

export type CollapseVariantsProps = VariantProps<typeof StyledCollapse>;
export type CollapseViewVariantsProps = VariantProps<typeof StyledCollapseView>;
export type CollapseContentVariantsProps = VariantProps<
  typeof StyledCollapseContent
>;
export type CollapseIconVariantsProps = VariantProps<typeof StyledCollapseIcon>;
export type CollapseGroupVariantsProps = VariantProps<
  typeof StyledCollapseGroup
>;
