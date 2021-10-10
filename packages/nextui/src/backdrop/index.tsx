import React, { MouseEvent, useCallback } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import CSSTransition from '../utils/css-transition';
import useCurrentState from '../use-current-state';
import cslx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  visible?: boolean;
  fullScreenContent?: boolean;
  width?: string;
}

const defaultProps = {
  onClick: () => {},
  visible: false,
  fullScreenContent: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type BackdropProps = Props & typeof defaultProps & NativeAttrs;

const Backdrop: React.FC<React.PropsWithChildren<BackdropProps>> = React.memo(
  ({ children, onClick, visible, width, fullScreenContent, ...props }) => {
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

    return (
      <CSSTransition name="backdrop-wrapper" visible={visible} clearTime={300}>
        <div
          className={cslx('backdrop', {
            fullscreen: fullScreenContent
          })}
          onClick={clickHandler}
          onMouseUp={mouseUpHandler}
          {...props}
        >
          <div className="layer" />
          <div
            onClick={childrenClickHandler}
            className="content"
            onMouseDown={() => setIsContentMouseDown(true)}
          >
            {children}
          </div>
          <style jsx>{`
            .backdrop {
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
            .content {
              position: relative;
              z-index: 999999;
              outline: none;
              width: 100%;
              max-width: ${width};
              margin: 20px auto;
              vertical-align: middle;
              display: inline-block;
            }
            .fullscreen .content {
              width: 100vw;
              max-width: 100vw;
              height: 100vh;
              margin: 0;
            }
            .backdrop:before {
              display: inline-block;
              width: 0;
              height: 100%;
              vertical-align: middle;
              content: '';
            }
            .layer {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              opacity: ${theme.expressiveness.portalOpacity};
              background-color: black;
              transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
              pointer-events: none;
              z-index: 99999;
            }
            .fullscreen .layer {
              display: none;
            }
            .backdrop-wrapper-enter .layer {
              opacity: 0;
            }
            .backdrop-wrapper-enter-active .layer {
              opacity: ${theme.expressiveness.portalOpacity};
            }
            .backdrop-wrapper-leave .layer {
              opacity: ${theme.expressiveness.portalOpacity};
            }
            .backdrop-wrapper-leave-active .layer {
              opacity: 0;
            }
            @media only screen and (max-width: ${theme.breakpoints.sm.max}) {
              .content {
                width: 90%;
              }
            }
          `}</style>
        </div>
      </CSSTransition>
    );
  }
);

if (__DEV__) {
  Backdrop.displayName = 'NextUI - Backdrop';
}

export default withDefaults(Backdrop, defaultProps);
