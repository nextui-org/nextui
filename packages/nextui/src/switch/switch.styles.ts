import {
  styled,
  sharedFocus,
  sharedVisuallyHidden,
  VariantProps
} from '../theme/stitches.config';

export const StyledSwitchContainer = styled('label', {
  WebkitTapHighlightColor: 'transparent',
  d: 'inline-block',
  verticalAlign: 'center',
  whiteSpace: 'nowrap',
  us: 'none',
  // max-width: ${width}, size variant
  transition: '$default',
  padding: '$1 0',
  position: 'relative',
  cursor: 'pointer',
  variants: {
    color: {
      default: {
        $$switchColor: '$colors$primary',
        $$switchColorHover: '$colors$primaryDark'
      },
      primary: {
        $$switchColor: '$colors$primary',
        $$switchColorHover: '$colors$primaryDark'
      },
      secondary: {
        $$switchColor: '$colors$secondary',
        $$switchColorHover: '$colors$secondaryDark'
      },
      success: {
        $$switchColor: '$colors$success',
        $$switchColorHover: '$colors$successDark'
      },
      warning: {
        $$switchColor: '$colors$warning',
        $$switchColorHover: '$colors$warningDark'
      },
      error: {
        $$switchColor: '$colors$error',
        $$switchColorHover: '$colors$errorDark'
      }
    },
    size: {
      xs: {
        $$switchWidth: '$space$12',
        $$switchHeight: '$space$8',
        width: '$space$12',
        height: '$space$8'
      },
      sm: {
        $$switchWidth: '$space$14',
        $$switchHeight: '$space$9',
        width: '$space$14',
        height: '$space$9'
      },
      md: {
        $$switchWidth: '$space$15',
        $$switchHeight: '$space$10',
        width: '$space$15',
        height: '$space$10'
      },
      lg: {
        $$switchWidth: '$space$17',
        $$switchHeight: '$space$12',
        width: '$space$17',
        height: '$space$12'
      },
      xl: {
        $$switchWidth: '$space$18',
        $$switchHeight: '$space$13',
        width: '$space$18',
        height: '$space$13'
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed'
      }
    }
  },
  defaultVariants: {
    color: 'default',
    size: 'md'
  }
});

export const StyledSwitchInput = styled(
  'input',
  {
    // opacity: 0;
    // width: 100%;
    // height: ${height};
    // position: absolute;
    // background: transparent;
    // z-index: -1;
  },
  sharedVisuallyHidden
);

export const StyledSwitchCircle = styled('span', {
  position: 'absolute',
  display: 'flex',
  size: 'calc($$switchHeight * 0.7)',
  jc: 'center',
  ai: 'center',
  top: '50%',
  transform: 'translateY(-50%)',
  left: '2px',
  // left: ${bordered
  //   ? 'calc(1px + ' + height + '* 0.02)'
  //   : `calc(2px + ${height} * 0.02)`}, bordered variant
  transition: 'left 0.25s ease',
  bg: '$background',
  br: '$pill',
  // background: ${bordered
  //   ? addColorAlpha(
  //       theme.palette.accents_3,
  //       theme.type === 'dark' ? 0.6 : 0.4
  //     )
  //   : theme.palette.background}, bordered variant
  '& svg': {
    bg: 'transparent',
    size: 'calc($$switchHeight * 0.44)'
  }
});

export const StyledSwitch = styled(
  'div',
  {
    opacity: 1,
    width: '$$switchWidth',
    height: '$$switchHeight',
    transition: '$default',
    position: 'relative',
    overflow: 'hidden',
    // border: ${theme.borderWeights.normal} solid
    //   ${bordered ? theme.palette.border : 'transparent'}; border variant
    // background: ${bordered
    //   ? 'transparent'
    //   : addColorAlpha(
    //       theme.palette.accents_3,
    //       theme.type === 'dark' ? 0.6 : 0.4
    //     )};
    // boxShadow: ${shadowColor}; shadow variant
    padding: 0,
    br: '$pill',
    bg: '$gray200',
    '&:before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      br: '$pill',
      bg: '$$switchColor',
      transition: 'left 0.25s ease 50ms, background 0.25s ease'
    },
    variants: {
      checked: {
        true: {
          // border: '1px solid transparent',
          '&:before': {
            left: '0%'
          },
          '&:hover:not(&:active)': {
            '&:before': {
              bg: '$$switchColorHover'
            }
          },
          [`& ${StyledSwitchCircle}`]: {
            left: 'calc(100% - 2px - $$switchHeight * 0.7)' // variable 2px
            // left: 'calc($$switchWidth - $$switchHeight * 0.88)'
            // background: ${isHex(theme.palette.background)
            //   ? hexToRGBA(theme.palette.background, 0.6)
            //   : theme.palette.background};
          }
        }
      },
      squared: {
        true: {
          br: '2px',
          '&:before': {
            br: '2px'
          },
          [`& ${StyledSwitchCircle}`]: {
            br: '2px'
          }
        }
      },
      disabled: {
        true: {
          borderColor: '$accents3',
          bg: '$accents3',
          [`& ${StyledSwitchCircle}`]: {
            bg: '$accents2'
          }
        }
      }
    }
  },
  sharedFocus
);

// types
export type SwitchVariantsProps = VariantProps<typeof StyledSwitch>;
export type SwitchContainerVariantsProps = VariantProps<
  typeof StyledSwitchContainer
>;
