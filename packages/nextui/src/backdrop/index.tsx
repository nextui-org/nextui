import React, { MouseEvent, useCallback, useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import useCurrentState from '../use-current-state';
import cslx from '../utils/clsx';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { __DEV__ } from '../utils/assertion';

interface Props {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent | KeyboardEvent) => void;
  visible?: boolean;
  fullScreenContent?: boolean;
  width?: string;
  animated?: boolean;
  blur?: boolean;
  opacity?: number;
}

const defaultProps = {
  onClick: () => {},
  visible: false,
  blur: false,
  animated: true,
  opacity: 0.5,
  fullScreenContent: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type BackdropProps = Props & typeof defaultProps & NativeAttrs;

const Backdrop: React.FC<React.PropsWithChildren<BackdropProps>> = React.memo(
  ({
    children,
    onClick,
    onKeyPress,
    visible,
    width,
    blur,
    animated,
    opacity,
    fullScreenContent,
    ...props
  }) => {
    const theme = useTheme();
    const [, setIsContentMouseDown, IsContentMouseDownRef] =
      useCurrentState(false);
    const clickHandler = (event: MouseEvent<HTMLElement>) => {
      if (IsContentMouseDownRef.current) return;
      onClick && onClick(event);
    };
    const childrenClickHandler = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
      },
      []
    );
    const mouseUpHandler = () => {
      if (!IsContentMouseDownRef.current) return;
      const timer = setTimeout(() => {
        setIsContentMouseDown(false);
        clearTimeout(timer);
      }, 0);
    };

    const { bindings } = useKeyboard(
      (ev: React.KeyboardEvent | KeyboardEvent) => {
        onKeyPress && onKeyPress(ev);
      },
      [KeyCode.Escape, KeyCode.Space],
      {
        disableGlobalEvent: true
      }
    );

    const renderChildren = useMemo(() => {
      return (
        <div
          tabIndex={-1}
          role="button"
          aria-hidden={true}
          className={cslx('nextui-backdrop', {
            'nextui-backdrop-fullscreen': fullScreenContent
          })}
          onClick={clickHandler}
          onMouseUp={mouseUpHandler}
          {...bindings}
          {...props}
        >
          <div
            className={cslx(
              'nextui-backdrop-layer',
              blur ? 'nextui-layer-blur' : 'nextui-layer-default'
            )}
          />
          <div
            className="nextui-backdrop-content"
            onClick={childrenClickHandler}
            onMouseDown={() => setIsContentMouseDown(true)}
          >
            {children}
          </div>
          <style jsx>{`
            .nextui-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              overflow: auto;
              z-index: 99999;
              -webkit-overflow-scrolling: touch;
              box-sizing: border-box;
              text-align: center;
            }
            .nextui-backdrop.nextui-backdrop-fullscreen {
              display: inline-flex;
              overflow: hidden;
            }
            .nextui-backdrop:before {
              display: inline-block;
              width: 0;
              height: 100%;
              vertical-align: middle;
              content: '';
            }
            .nextui-backdrop-content {
              position: relative;
              z-index: 999999;
              outline: none;
              width: 100%;
              max-width: ${width};
              margin: 20px auto;
              vertical-align: middle;
              display: inline-block;
            }
            .nextui-backdrop-fullscreen .nextui-backdrop-content {
              width: 100vw;
              max-width: 100vw;
              height: 100vh;
              margin: 0;
            }
            .nextui-backdrop-layer {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 99999;
            }
            .nextui-layer-default {
              background-color: black;
              opacity: ${opacity};
              transition: ${animated
                ? 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none'};
            }
            .nextui-layer-blur {
              opacity: 1;
              transition: ${animated
                ? 'background 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none'};
              backdrop-filter: saturate(180%) blur(20px);
              background-color: rgba(0, 0, 0, 0.1);
            }
            .nextui-backdrop-fullscreen .nextui-backdrop-layer {
              display: none;
            }
            .nextui-backdrop-wrapper-enter .nextui-layer-default {
              opacity: 0;
            }
            .nextui-backdrop-wrapper-enter-active .nextui-layer-default {
              opacity: ${opacity};
            }
            .nextui-backdrop-wrapper-leave .nextui-layer-default {
              opacity: ${opacity};
            }
            .nextui-backdrop-wrapper-leave-active .nextui-layer-default {
              opacity: 0;
            }
            .nextui-backdrop-wrapper-enter .nextui-layer-blur {
              background-color: rgba(0, 0, 0, 0.1);
            }
            .nextui-backdrop-wrapper-enter-active .nextui-layer-blur {
              background-color: rgba(0, 0, 0, 0.4);
            }
            .nextui-backdrop-wrapper-leave .nextui-layer-blur {
              background-color: rgba(0, 0, 0, 0.4);
            }
            .nextui-backdrop-wrapper-leave-active .nextui-layer-blur {
              background-color: rgba(0, 0, 0, 0.1);
            }
            @media only screen and (max-width: ${theme.breakpoints.sm}) {
              .nextui-backdrop-content {
                width: 90%;
              }
            }
          `}</style>
        </div>
      );
    }, [children]);

    return (
      <>
        {animated ? (
          <CSSTransition
            name="nextui-backdrop-wrapper"
            visible={visible}
            enterTime={20}
            leaveTime={20}
            clearTime={150}
          >
            {renderChildren}
          </CSSTransition>
        ) : visible ? (
          renderChildren
        ) : null}
      </>
    );
  }
);

if (__DEV__) {
  Backdrop.displayName = 'NextUI - Backdrop';
}

export default withDefaults(Backdrop, defaultProps);
