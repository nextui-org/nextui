import React from 'react';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';

interface Props {
  isRight?: boolean;
  isSingle?: boolean;
  className?: string;
}

const defaultProps = {
  isRight: false,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ButtonIconProps = Props & typeof defaultProps & NativeAttrs;

const ButtonIcon: React.FC<React.PropsWithChildren<ButtonIconProps>> = ({
  isRight,
  isSingle,
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'nextui-button-icon',
        {
          'nextui-button-icon-right': isRight,
          'nextui-button-icon-single': isSingle
        },
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .nextui-button-icon {
          position: absolute;
          left: var(--nextui-button-padding);
          right: auto;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--nextui-button-color);
          z-index: 1;
        }
        .nextui-button-icon :global(svg) {
          background: transparent;
          height: calc(var(--nextui-button-height) / 2.35);
          width: calc(var(--nextui-button-height) / 2.35);
        }
        .nextui-button-icon-right {
          right: var(--nextui-button-padding);
          left: auto;
        }
        .nextui-button-icon-single {
          position: static;
          transform: none;
        }
      `}</style>
    </span>
  );
};

const MemoButtonIcon = React.memo(ButtonIcon);

export default withDefaults(MemoButtonIcon, defaultProps);
