import React from 'react';
import withDefaults from '../../utils/with-defaults';

interface Props {
  isRight?: boolean;
  isSingle?: boolean;
  className?: string;
}

const defaultProps = {
  isRight: false,
  className: '',
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
      className={`icon ${isRight ? 'right' : ''} ${
        isSingle ? 'single' : ''
      } ${className}`}
      {...props}
    >
      {children}
      <style jsx>{`
        .icon {
          position: absolute;
          left: var(--next-ui-button-padding);
          right: auto;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--next-ui-button-color);
          z-index: 1;
        }
        .right {
          right: var(--next-ui-button-padding);
          left: auto;
        }
        .icon :global(svg) {
          background: transparent;
          height: calc(var(--next-ui-button-height) / 2.35);
          width: calc(var(--next-ui-button-height) / 2.35);
        }
        .single {
          position: static;
          transform: none;
        }
      `}</style>
    </span>
  );
};

const MemoButtonIcon = React.memo(ButtonIcon);

export default withDefaults(MemoButtonIcon, defaultProps);
