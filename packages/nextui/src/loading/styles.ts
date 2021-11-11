import { CSSProperties } from 'react';
import { NormalLoaders, NormalSizes } from '../utils/prop-types';
import { NextUIThemes } from '../theme';

export const getLoaderSize = (type: NormalLoaders) => {
  const sizes: { [key in NormalLoaders]: { [key in NormalSizes]: string } } = {
    default: {
      mini: '1rem',
      small: '1.5rem',
      medium: '2rem',
      large: '2.8rem',
      xlarge: '4rem'
    },
    'points-opacity': {
      mini: '2px',
      small: '4px',
      medium: '6px',
      large: '8px',
      xlarge: '10px'
    },
    points: {
      mini: '2px',
      small: '4px',
      medium: '6px',
      large: '8px',
      xlarge: '10px'
    },
    spinner: {
      mini: '.75rem',
      small: '1rem',
      medium: '1.25rem',
      large: '1.875rem',
      xlarge: '2rem'
    },
    gradient: {
      mini: '1rem',
      small: '1.5rem',
      medium: '2rem',
      large: '2.8rem',
      xlarge: '4rem'
    }
  };
  return sizes[type];
};

export const getLoaderBorder = (size: NormalSizes): string => {
  const defaultBorder = '3px';
  const sizes: { [key in NormalSizes]: string } = {
    mini: '2px',
    small: '2px',
    medium: '3px',
    large: '3px',
    xlarge: '3px'
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
      mini: {
        ...common,
        marginRight: '0px',
        // marginTop: 'calc(100% + 1.6rem)',
        fontSize: '0.6rem'
      },
      small: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 2rem)',
        fontSize: '0.745rem'
      },
      medium: {
        ...common,
        marginRight: '0px',
        // marginTop: 'calc(100% + 2.4rem)',
        fontSize: '0.875rem'
      },
      large: {
        ...common,
        // marginTop: 'calc(100% + 3rem)',
        fontSize: '0.875rem'
      },
      xlarge: {
        ...common,
        // marginTop: 'calc(100% + 3.4rem)',
        fontSize: '0.875rem'
      }
    },
    'points-opacity': {
      mini: {
        ...common,
        marginRight: theme.spacing.sm
      },
      small: {
        ...common,
        marginRight: theme.spacing.sm
      },
      medium: {
        ...common,
        marginRight: theme.spacing.sm
      },
      large: {
        ...common,
        marginRight: theme.spacing.sm
      },
      xlarge: {
        ...common,
        marginRight: theme.spacing.sm
      }
    },
    points: {
      mini: {
        ...common,
        marginRight: theme.spacing.sm
      },
      small: {
        ...common,
        marginRight: theme.spacing.sm
      },
      medium: {
        ...common,
        marginRight: theme.spacing.sm
      },
      large: {
        ...common,
        marginRight: theme.spacing.sm
      },
      xlarge: {
        ...common,
        marginRight: theme.spacing.sm
      }
    },
    spinner: {
      mini: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 1.6rem)'
      },
      small: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 1.8rem)'
      },
      medium: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 2rem)'
      },
      large: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 2rem)'
      },
      xlarge: {
        ...common,
        position: 'absolute',
        marginTop: 'calc(100% + 2.2rem)'
      }
    },
    gradient: {
      mini: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 1.6rem)',
        fontSize: '0.6rem'
      },
      small: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 2rem)',
        fontSize: '0.745rem'
      },
      medium: {
        ...common,
        marginRight: '0px',
        marginTop: 'calc(100% + 2.4rem)',
        fontSize: '0.875rem'
      },
      large: {
        ...common,
        marginTop: 'calc(100% + 3rem)',
        fontSize: '0.875rem'
      },
      xlarge: {
        ...common,
        marginTop: 'calc(100% + 3.4rem)',
        fontSize: '0.875rem'
      }
    }
  };
  return styles[type];
};
