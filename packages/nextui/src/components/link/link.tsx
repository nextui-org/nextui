import React from 'react';
import withDefaults from '../../utils/with-defaults';
import useTheme from '../../hooks/use-theme';
import useWarning from '../../hooks/use-warning';
import LinkIcon from './icon';
import { addColorAlpha } from '../../utils/color';

export interface Props {
  href?: string;
  color?: boolean;
  pure?: boolean;
  icon?: boolean;
  underline?: boolean;
  block?: boolean;
  className?: string;
}

const defaultProps = {
  href: '',
  color: false,
  pure: false,
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
    {
      href,
      color,
      underline,
      pure,
      children,
      className,
      block,
      icon,
      ...props
    },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const theme = useTheme();
    const linkColor = color || block ? theme.palette.link : 'inherit';
    const hoverColor =
      color || block
        ? addColorAlpha(theme.palette.link, 0.8)
        : addColorAlpha(theme.palette.text, 0.8);
    const padding = block ? theme.layout.gapQuarter : '0';
    const decoration = underline ? 'underline' : 'none';
    if (pure) {
      useWarning('Props "pure" is deprecated, now the default Link is pure.');
    }

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
            transition: all 250ms ease 0ms;
          }
          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }
          .link:hover {
            background-color: ${block
              ? addColorAlpha(theme.palette.link, 0.2)
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
