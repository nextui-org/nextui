import React from 'react';
import useTheme from '../../hooks/use-theme';
import withDefaults from '../../utils/with-defaults';

interface Props {
  count?: number;
  className?: string;
  animated?: boolean;
}

const defaultProps = {
  className: '',
  animated: true,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type AvatarGroupProps = Props & typeof defaultProps & NativeAttrs;

const AvatarGroup: React.FC<React.PropsWithChildren<AvatarGroupProps>> = ({
  count,
  className,
  children,
  animated,
  ...props
}) => {
  const theme = useTheme();

  return (
    <div className={`avatar-group ${className}`} {...props}>
      {children}
      {count && <span className="count">+{count}</span>}
      <style jsx>{`
        .avatar-group {
          display: flex;
          align-items: center;
          height: auto;
          width: max-content;
        }
        .avatar-group :global(.avatar) {
          margin-left: -0.625rem;
          transition: transform 0.25s ease;
        }
        .avatar-group :global(.avatar:hover) {
          transform: ${animated ? 'translate(-0.625rem)' : ''};
        }
        .count {
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          padding-left: ${theme.layout.gapQuarter};
          color: ${theme.palette.accents_7};
        }
      `}</style>
    </div>
  );
};

export default withDefaults(AvatarGroup, defaultProps);
