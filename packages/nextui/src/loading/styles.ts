import { CSSProperties } from 'react';
import { NormalLoaders, NormalSizes } from '../utils/prop-types';
import { NextUIThemes } from '../theme';

export const getLoaderSize = (type: NormalLoaders) => {
  const sizes: { [key in NormalLoaders]: { [key in NormalSizes]: string } } = {
    default: {
      xs: '1rem',
      sm: '1.5rem',
      md: '2rem',
      lg: '2.8rem',
      xl: '4rem'
    },
    'points-opacity': {
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px'
    },
    points: {
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px'
    },
    spinner: {
      xs: '.75rem',
      sm: '1rem',
      md: '1.25rem',
      lg: '1.875rem',
      xl: '2rem'
    },
    gradient: {
      xs: '1rem',
      sm: '1.5rem',
      md: '2rem',
      lg: '2.8rem',
      xl: '4rem'
    }
  };
  return sizes[type];
};

export const getLoaderBorder = (size: NormalSizes): string => {
  const defaultBorder = '3px';
  const sizes: { [key in NormalSizes]: string } = {
    xs: '2px',
    sm: '2px',
    md: '3px',
    lg: '3px',
    xl: '3px'
  };
  return sizes[size] || defaultBorder;
};

export const getLabelStyle = (
  type: NormalLoaders,
  theme: NextUIThemes,
  color?: string
): { [key in any]: CSSProperties } => {
  const common: CSSProperties = {
    width: '100%',
    color: color || theme.palette.text
  };
  const styles: {
    [key in NormalLoaders]: { [key in NormalSizes]: CSSProperties };
  } = {
    default: {
      xs: {
        ...common,
        marginRight: '0px',
        fontSize: '0.6rem'
      },
      sm: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 2rem)',
        fontSize: '0.745rem'
      },
      md: {
        ...common,
        marginRight: '0px',
        fontSize: '0.875rem'
      },
      lg: {
        ...common,
        fontSize: '0.875rem'
      },
      xl: {
        ...common,
        fontSize: '0.875rem'
      }
    },
    'points-opacity': {
      xs: {
        ...common,
        marginRight: theme.spacing.sm
      },
      sm: {
        ...common,
        marginRight: theme.spacing.sm
      },
      md: {
        ...common,
        marginRight: theme.spacing.sm
      },
      lg: {
        ...common,
        marginRight: theme.spacing.sm
      },
      xl: {
        ...common,
        marginRight: theme.spacing.sm
      }
    },
    points: {
      xs: {
        ...common,
        marginRight: theme.spacing.sm
      },
      sm: {
        ...common,
        marginRight: theme.spacing.sm
      },
      md: {
        ...common,
        marginRight: theme.spacing.sm
      },
      lg: {
        ...common,
        marginRight: theme.spacing.sm
      },
      xl: {
        ...common,
        marginRight: theme.spacing.sm
      }
    },
    spinner: {
      xs: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 1.6rem)'
      },
      sm: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 1.8rem)'
      },
      md: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 2rem)'
      },
      lg: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 2rem)'
      },
      xl: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 2.2rem)'
      }
    },
    gradient: {
      xs: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 1.6rem)',
        fontSize: '0.6rem'
      },
      sm: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 2rem)',
        fontSize: '0.745rem'
      },
      md: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 2.4rem)',
        fontSize: '0.875rem'
      },
      lg: {
        ...common,
        marginTop: 'calc(100% + 3rem)',
        fontSize: '0.875rem'
      },
      xl: {
        ...common,
        marginTop: 'calc(100% + 3.4rem)',
        fontSize: '0.875rem'
      }
    }
  };
  return styles[type];
};
