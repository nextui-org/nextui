import React, { useMemo } from 'react';
import { Link } from '@components';
import { Props as LinkProps } from '../link/link';
import useTheme from '@hooks/use-theme';
import withDefaults from '@utils/with-defaults';
import ImageBrowserHttpsIcon from './image-browser-https-icon';
import { getBrowserColors, BrowserColors } from './styles';

type AnchorProps = Omit<React.AnchorHTMLAttributes<unknown>, keyof LinkProps>;

interface Props {
  title?: string;
  url?: string;
  showFullLink?: boolean;
  invert?: boolean;
  anchorProps?: AnchorProps;
  className?: string;
}

const defaultProps = {
  className: '',
  showFullLink: false,
  anchorProps: {} as AnchorProps,
  invert: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ImageBrowserProps = Props & typeof defaultProps & NativeAttrs;

const getHostFromUrl = (url: string) => {
  try {
    return new URL(url).host;
  } catch (e) {
    return url;
  }
};

const getTitle = (title: string, colors: BrowserColors) => (
  <div className="title">
    {title}
    <style jsx>{`
      .title {
        color: ${colors.titleColor};
        font-size: 0.75rem;
      }
    `}</style>
  </div>
);

const getAddressInput = (
  url: string,
  showFullLink: boolean,
  colors: BrowserColors,
  anchorProps: AnchorProps
) => (
  <div className="address-input">
    <span className="https">
      <ImageBrowserHttpsIcon />
    </span>
    <Link href={url} title={url} target="_blank" {...anchorProps}>
      {showFullLink ? url : getHostFromUrl(url)}
    </Link>
    <style jsx>{`
      .address-input {
        height: 1.75rem;
        max-width: 60%;
        min-width: 40%;
        background-color: ${colors.inputBgColor};
        color: inherit;
        border-radius: 3px;
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
    {
      url,
      title,
      children,
      showFullLink,
      invert,
      anchorProps,
      className,
      ...props
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    const colors = useMemo(() => getBrowserColors(invert, theme.palette), [
      invert,
      theme.palette,
    ]);
    const input = useMemo(() => {
      if (url) return getAddressInput(url, showFullLink, colors, anchorProps);
      if (title) return getTitle(title, colors);
      return null;
    }, [url, showFullLink, title, colors, anchorProps]);

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
