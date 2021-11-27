import { styled } from '../theme/stitches.config';
import StyledButton from './button.styles';

export default styled('div', {
  display: 'inline-flex',
  margin: '$3',
  backgroundColor: 'transparent',
  height: 'min-content',
  [`& ${StyledButton}`]: {
    '.nextui-button-text': {
      top: 0
    }
  },
  variants: {
    vertical: {
      true: {
        fd: 'column',
        [`& ${StyledButton}`]: {
          '&:not(:first-child)': {
            btlr: 0, // top-left
            btrr: 0 // top-right
            // border-top: ${borderWidth} solid ${borderColor}; bordered variant
          },
          '&:not(:last-child)': {
            bblr: 0,
            bbrr: 0
          }
        }
      },
      false: {
        fd: 'row',
        [`& ${StyledButton}`]: {
          '&:not(:first-child)': {
            btlr: 0, // top-left
            bblr: 0 // bottom-left
            //borderLeft: ${borderWidth} solid ${borderColor}, bordered variant
          },
          '&:not(:last-child)': {
            btrr: 0, // top-right
            bbrr: 0 // bottom-right
          }
        }
      }
    },
    size: {
      xs: {
        br: '$xs'
      },
      sm: {
        br: '$sm'
      },
      md: {
        br: '$md'
      },
      lg: {
        br: '$base'
      },
      xl: {
        br: '$xl'
      }
    },
    rounded: {
      true: {
        br: '$pill'
      }
    },
    bordered: {
      true: {
        bg: 'transparent'
      }
    },
    gradient: {
      true: {
        pl: 0
      }
    }
  },
  defaultVariants: {
    vertical: false
  },
  compoundVariants: [
    // bordered / vertical:true
    {
      bordered: true,
      vertical: true,
      css: {
        [`& ${StyledButton}`]: {
          '&:not(:last-child)': {
            borderBottom: 'none',
            paddingBottom: '0'
          }
        }
      }
    },
    // bordered / vertical:false
    {
      bordered: true,
      vertical: false,
      css: {
        [`& ${StyledButton}`]: {
          '&:not(:first-child)': {
            borderLeft: 'none'
          }
        }
      }
    },
    // gradient / vertical:false
    {
      gradient: true,
      vertical: false,
      css: {
        [`& ${StyledButton}`]: {
          '&:not(:last-child)&:not(:first-child)': {
            pl: 0,
            filter: 'hue-rotate(310deg)'
          },
          '&:last-child': {
            pl: 0,
            filter: 'hue-rotate(250deg)'
          }
        }
      }
    }
  ]
});
