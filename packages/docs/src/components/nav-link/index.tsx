import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Link } from '@nextui-org/react';

export interface Props {
  href: string;
  pathname: string;
  title: string;
  selected: boolean;
  color?: string | boolean;
}

const defaultProps = {
  href: '',
  pathname: '',
  title: '',
  selected: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type NavLinkProps = Props & typeof defaultProps & NativeAttrs;

const NavLink: React.FC<NavLinkProps> = ({
  href,
  pathname,
  title,
  color,
  selected,
  onClick,
}) => {
  const router = useRouter();
  const onlyHashChange = pathname === router.pathname;
  return (
    <div className={cn('nav-link', { selected })}>
      {
        // NOTE: use just anchor element for triggering `hashchange` event
        onlyHashChange ? (
          <Link className={selected ? 'selected' : ''} href={pathname}>
            {title}
          </Link>
        ) : (
          <NextLink href={pathname || href}>
            <Link onClick={onClick}>{title}</Link>
          </NextLink>
        )
      }
      <style jsx>{`
        div.selected {
          box-sizing: border-box;
        }
        .nav-link {
          display: flex;
        }
        .nav-link :global(a) {
          color: ${color ? color : 'inherit'} !important;
          text-decoration: none;
          font-size: 1rem;
          line-height: 1.5rem;
          box-sizing: border-box;
        }
        .selected :global(a) {
          font-weight: 600;
        }
        @media screen and (max-width: 950px) {
          div {
            padding-top: 0;
            padding-left: 0;
            padding-bottom: 0;
          }
          div.selected {
            border-left: none;
            padding-left: 0;
          }
          .nav-link :global(a) {
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default NavLink;
