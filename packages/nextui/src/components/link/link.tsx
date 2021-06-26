import React, { useMemo } from 'react';
import withDefaults from '../../utils/with-defaults';
import useTheme from '../../hooks/use-theme';
import LinkIcon from './icon';
import { addColorAlpha, getNormalColor } from '../../utils/color';
import { SimpleColors } from '../../utils/prop-types';

export interface Props {
  href?: string;
  color?: SimpleColors | boolean | string;
  icon?: boolean;
  underline?: boolean;
  block?: boolean;
  className?: string;
}

const defaultProps = {
  href: '',
  color: false,
  icon: false,
  underline: false,
  block: false,
  className: '',
};

type NativeAttrs = Omit<React.AnchorHTMLAttributes<unknown>, keyof Props>;
export type LinkProps = Props & typeof defaultProps & NativeAttrs;

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkProps>
>(
  (
    { href, color, underline, children, className, block, icon, ...props },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const theme = useTheme();

    const linkColor = useMemo(
      () => getNormalColor(color || block, theme.palette, theme.palette.link),
      [color, theme.palette]
    );
    const hoverColor = useMemo(
      () =>
        color || block
          ? addColorAlpha(linkColor, 0.8)
          : addColorAlpha(theme.palette.text, 0.8),
      [color, block, theme, linkColor]
    );

    const padding = block ? theme.layout.gapQuarter : '0';
    const decoration = underline ? 'underline' : 'none';

    return (
      <a className={`link ${className}`} href={href} {...props} ref={ref}>
        {children}
        {icon && <LinkIcon />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            padding: calc(${padding} * 0.8) calc(${padding} * 1.7);
            border-radius: ${block ? theme.layout.radius : 0};
            width: fit-content;
            transition: all 0.25s ease;
          }
          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }
          .link:hover {
            background-color: ${block
              ? addColorAlpha(linkColor, 0.2)
              : 'inherit'};
            color: ${hoverColor};
          }
        `}</style>
      </a>
    );
  }
);

Link.displayName = 'Link';
const MemoLink = React.memo(Link);

export default withDefaults(MemoLink, defaultProps);
