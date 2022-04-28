import React, { useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import NavLink, { NavLinkProps } from '../nav-link';
import withDefaults from '@utils/with-defaults';
import { Badge } from '@components';
import { useTheme, Spacer } from '@nextui-org/react';

export interface Props {
  level: number;
  route: NavLinkProps;
  isMobile: boolean;
  onClick?: () => void;
}

const defaultProps = {
  level: 1,
  isMobile: false
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;

export type PostProps = Props & typeof defaultProps & NativeAttrs;

const Post: React.FC<React.PropsWithChildren<PostProps>> = ({
  isMobile,
  route,
  level = 1,
  onClick
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);
  const ref = route.selected ? selectedRef : null;
  const { theme, isDark } = useTheme();

  useEffect(() => {
    if (ref && ref.current && !isMobile) {
      const content = document.querySelector(
        '.sidebar-content'
      ) as HTMLDivElement;
      // 32 is the top and bottom margin for `.link`
      const height = ref.current.offsetTop - 32;

      if (content) {
        content.scrollTop = height - content.offsetHeight / 2;
      }
    }
  }, [ref, isMobile]);

  const linkColor = useMemo(() => {
    if (route.selected) return;
    if (route.comingSoon) return theme?.colors?.accents6?.value;
    return theme?.colors?.accents8?.value;
  }, [isDark, route.selected]);

  return (
    <div
      ref={ref}
      className={cn('link', `level-${level}`, { disabled: route?.comingSoon })}
    >
      <NavLink {...route} color={linkColor} onClick={onClick} />
      <Spacer inline x={0.2} />
      {route?.newPost && (
        <Badge className="post__new-badge" type="primary">
          New
        </Badge>
      )}
      {route?.updated && (
        <Badge className="post__new-badge" type="secondary">
          Updated
        </Badge>
      )}
      {route?.comingSoon && (
        <Badge className="post__coming-soon-badge" type="disabled">
          Coming soon
        </Badge>
      )}
      <style jsx>{`
        .link {
          margin: 18px 0;
          display: flex;
          align-items: center;
          min-height: 24px;
        }
        .link.disabled {
          cursor: not-allowed;
        }
        .link::before {
          content: '';
          flex-basis: 4px;
          flex-shrink: 0;
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${route.selected
            ? theme?.colors?.accents8?.value
            : theme?.colors?.accents7?.value};
          margin-right: 16px;
        }
        .link:first-child {
          margin-top: 0;
        }
        .link:last-child {
          margin-bottom: 0;
        }
        @media screen and (max-width: 950px) {
          .link {
            margin: 24px 0;
          }
        }
      `}</style>
    </div>
  );
};

const MemoPost = React.memo(Post);

export default withDefaults(MemoPost, defaultProps);
