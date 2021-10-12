import React, { useMemo } from 'react';
import withDefaults from '@utils/with-defaults';
import { NextUIThemes, NextUIThemesPalette, useTheme } from '@nextui-org/react';

export type BadgeType = 'default' | 'primary' | 'warning' | 'success' | 'error';

interface BadgeProps {
  type: BadgeType;
  label: string;
  className?: string;
}

const defaultProps = {
  type: 'default' as BadgeType,
  label: 'Badge',
  className: '',
};

export interface BadgeStyles {
  background: string;
  color: string;
}

const getBadgeStyles = (
  palette: NextUIThemesPalette,
  type: BadgeType
): BadgeStyles => {
  const key = (type === 'default' ? 'primary' : type) || 'primary';
  const badgeStyles = {
    background: palette[key] || palette.primary,
    color: palette.white,
  };

  return badgeStyles;
};

const Badge: React.FC<BadgeProps> = ({ type, label, className, ...props }) => {
  const theme = useTheme() as NextUIThemes;

  const { background, color } = useMemo(
    () => getBadgeStyles(theme.palette, type),
    [theme, type]
  );

  return (
    <span className={`badge ${className}`} {...props}>
      {label || type}
      <style jsx>{`
        .badge {
          display: inline-block;
          align-items: center;
          color: ${color};
          background: ${background};
          text-transform: uppercase;
          padding: 5px 5px;
          margin: 0 2px;
          font-size: 10px;
          font-weight: 800;
          border-radius: 14px;
          letter-spacing: 0.6px;
          line-height: 1;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
          box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 10%);
          align-items: center;
          align-self: center;
        }
      `}</style>
    </span>
  );
};

export default withDefaults(Badge, defaultProps);
