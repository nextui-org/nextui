import React from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import clsx from '../utils/clsx';

interface Props {
  count?: number;
  className?: string;
  animated?: boolean;
}

const defaultProps = {
  className: '',
  animated: true
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
  const isDark = theme.type === 'dark';
  return (
    <div
      className={clsx(
        'nextui-avatar-group',
        { 'nextui-avatar-group-is-dark': isDark },
        className
      )}
      {...props}
    >
      {children}
      {count && <span className="nextui-avatar-group-count">+{count}</span>}
      <style jsx>{`
        .nextui-avatar-group {
          display: flex;
          align-items: center;
          height: auto;
          width: max-content;
        }
        .nextui-avatar-group :global(.nextui-avatar) {
          margin-left: -0.625rem;
          transition: transform 0.25s ease;
        }
        .nextui-avatar-group :global(.only-text-avatar) {
          box-shadow: -4px 0 4px rgb(0 0 0 / 5%);
        }
        .nextui-avatar-group-is-dark :global(.only-text-avatar) {
          box-shadow: -4px 0 15px rgb(0 0 0 / 50%);
        }
        .nextui-avatar-group :global(.nextui-avatar:hover) {
          transform: ${animated ? 'translate(-0.625rem)' : ''};
        }
        .nextui-avatar-group-count {
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          padding-left: ${theme.spacing[1]}
          color: ${theme.palette.accents_7};
        }
      `}</style>
    </div>
  );
};

export default withDefaults(AvatarGroup, defaultProps);
