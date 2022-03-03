import { styled, VariantProps } from '../theme/stitches.config';

export const StyledTooltipTrigger = styled('div', {
  width: 'max-content',
  display: 'inherit'
});

export const StyledTooltipArrow = styled('span', {
  display: 'none',
  content: '',
  size: '$5',
  zIndex: '-2',
  background: '$$tooltipColor',
  br: '0px 0px 2px 0px',
  position: 'absolute'
});

export const StyledTooltip = styled('div', {
  position: 'relative',
  fs: '$xs',
  padding: 0,
  variants: {
    hideArrow: {
      false: {
        [`& ${StyledTooltipArrow}`]: {
          display: 'block'
        }
      }
    }
  }
});

export const StyledTooltipContent = styled('div', {
  position: 'absolute',
  width: 'auto',
  padding: '$3 $sm',
  opacity: 0,
  zIndex: '$10',
  br: '$lg',
  '@motion': {
    transition: 'none'
  },
  variants: {
    color: {
      default: {
        $$tooltipColor: '$colors$background',
        bg: '$$tooltipColor'
      },
      primary: {
        $$tooltipColor: '$colors$primary',
        bg: '$$tooltipColor'
      },
      secondary: {
        $$tooltipColor: '$colors$secondary',
        bg: '$$tooltipColor'
      },
      success: {
        $$tooltipColor: '$colors$success',
        bg: '$$tooltipColor'
      },
      warning: {
        $$tooltipColor: '$colors$warning',
        bg: '$$tooltipColor'
      },
      error: {
        $$tooltipColor: '$colors$error',
        bg: '$$tooltipColor'
      },
      invert: {
        $$tooltipColor: '$colors$foreground',
        bg: '$$tooltipColor'
      }
    },
    contentColor: {
      default: {
        $$tooltipTextColor: '$colors$text',
        color: '$$tooltipTextColor'
      },
      primary: {
        $$tooltipTextColor: '$colors$primary',
        color: '$$tooltipTextColor'
      },
      secondary: {
        $$tooltipTextColor: '$colors$secondary',
        color: '$$tooltipTextColor'
      },
      success: {
        $$tooltipTextColor: '$colors$success',
        color: '$$tooltipTextColor'
      },
      warning: {
        $$tooltipTextColor: '$colors$warning',
        color: '$$tooltipTextColor'
      },
      error: {
        $$tooltipTextColor: '$colors$error',
        color: '$$tooltipTextColor'
      }
      invert: {
       $$tooltipTextColor: '$colors$background',
       color:'$$tooltipTextColor'
      }
    },
    rounded: {
      true: {
        br: '$pill'
      }
    },
    shadow: {
      true: {
        bs: '$md'
      }
    },
    animated: {
      true: {
        transition: 'opacity 0.25s ease 0s, top 0.25s ease 0s'
      },
      false: {
        transition: 'none'
      }
    }
  },
  compoundVariants: [
    // color='primary' && contentColor='default'
    {
      color: 'primary',
      contentColor: 'default',
      css: {
        $$tooltipTextColor: '$colors$white'
      }
    },
    // color='secondary' && contentColor='default'
    {
      color: 'secondary',
      contentColor: 'default',
      css: {
        $$tooltipTextColor: '$colors$white'
      }
    },
    // color='success' && contentColor='default'
    {
      color: 'success',
      contentColor: 'default',
      css: {
        $$tooltipTextColor: '$colors$white'
      }
    },
    // color='error' && contentColor='default'
    {
      color: 'error',
      contentColor: 'default',
      css: {
        $$tooltipTextColor: '$colors$white'
      }
    }
  ],
  defaultVariants: {
    color: 'default',
    contentColor: 'default'
  }
});

export type TooltipTriggerVariantsProps = VariantProps<
  typeof StyledTooltipTrigger
>;
export type TooltipContentVariantsProps = VariantProps<
  typeof StyledTooltipContent
>;
