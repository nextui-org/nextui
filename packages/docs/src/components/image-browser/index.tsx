import React, { useMemo } from 'react';
import withDefaults from '@utils/with-defaults';
import { getBrowserColors, BrowserColors } from './styles';
import { useTheme } from '@nextui/react';

interface Props {
  dark?: boolean;
  className?: string;
}

const defaultProps = {
  className: '',
  dark: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ImageBrowserProps = Props & typeof defaultProps & NativeAttrs;

const getAddressInput = (colors: BrowserColors) => (
  <div className="address-input">
    <span className="https">
      <p>Hola</p>
    </span>
    <style jsx>{`
      .address-input {
        height: 1.75rem;
        max-width: 60%;
        min-width: 40%;
        background-color: ${colors.inputBgColor};
        color: inherit;
        border-radius: ${colors.radius};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        overflow: hidden;
        position: relative;
      }
      .address-input :global(*) {
        font-size: 0.75rem;
        color: inherit;
      }
      .address-input :global(a) {
        max-width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        color: inherit;
      }
      .https {
        width: 12px;
        height: 12px;
        margin-right: 5px;
        user-select: none;
        margin-top: -1px;
        color: inherit;
      }
    `}</style>
  </div>
);

const ImageBrowser = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ImageBrowserProps>
>(
  (
    { title, children, dark, className, ...props },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const colors = useMemo(() => getBrowserColors(dark, theme), [dark, theme]);
    const input = useMemo(() => {
      return getAddressInput(colors);
    }, [colors]);

    return (
      <div className={`browser ${className}`} ref={ref} {...props}>
        <header>
          <div className="traffic">
            <span className="close" />
            <span className="mini" />
            <span className="full" />
          </div>
          {input}
        </header>
        {children}
        <style jsx>{`
          .browser {
            background-color: transparent;
            box-shadow: ${theme.expressiveness.shadowLarge};
            width: max-content;
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            border-radius: ${theme.layout.radius};
            overflow: hidden;
          }

          .browser :global(.image) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }

          header {
            height: 2.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            color: ${colors.color};
            background-color: ${colors.barBgColor};
            border-bottom: 1px solid ${colors.borderColor};
          }

          .traffic {
            width: auto;
            position: absolute;
            left: ${theme.layout.gapHalf};
            top: 50%;
            transform: translateY(-50%);
            bottom: 0;
            height: 100%;
            display: flex;
            align-items: center;
            user-select: none;
          }

          .traffic span {
            border-radius: 50%;
            width: 0.75rem;
            height: 0.75rem;
            display: inline-block;
            margin-right: 0.5rem;
          }

          .close {
            background-color: #ff5f56;
          }

          .mini {
            background-color: #ffbd2e;
          }

          .full {
            background-color: #27c93f;
          }
        `}</style>
      </div>
    );
  }
);

ImageBrowser.displayName = 'ImageBrowser';

export default withDefaults(ImageBrowser, defaultProps);
