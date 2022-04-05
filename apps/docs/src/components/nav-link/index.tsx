import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link, styled } from '@nextui-org/react';

export interface Props {
  href: string;
  pathname: string;
  title: string;
  selected: boolean;
  newPost?: boolean;
  updated?: boolean;
  comingSoon?: boolean;
  color?: string;
}

const defaultProps = {
  href: '',
  pathname: '',
  title: '',
  selected: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type NavLinkProps = Props & typeof defaultProps & NativeAttrs;

const BaseLink = styled(Link, {
  d: 'flex',
  textDecoration: 'none',
  '@smMax': {
    pt: 0,
    pl: 0,
    pb: 0,
    d: 'flex',
    ai: 'center'
  },
  '&:active': {
    opacity: 0.7
  },
  variants: {
    selected: {
      true: {
        boxSizing: 'border-box',
        fontWeight: '$semibold',
        '@smMax': {
          borderLeft: 'none',
          paddingLeft: 0
        }
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        pe: 'none'
      }
    }
  }
});

const NavLink: React.FC<NavLinkProps> = ({
  href,
  pathname,
  title,
  color,
  selected,
  comingSoon,
  onClick
}) => {
  const router = useRouter();
  const onlyHashChange = pathname === router.pathname;

  if (onlyHashChange) {
    return (
      <BaseLink
        href={pathname}
        selected={selected}
        disabled={comingSoon}
        css={{
          color: color ? color : 'inherit'
        }}
      >
        {title}
      </BaseLink>
    );
  }

  return (
    <NextLink href={!comingSoon ? pathname || href : ''}>
      <BaseLink
        href={pathname}
        selected={selected}
        disabled={comingSoon}
        onClick={(e: any) => !comingSoon && onClick && onClick(e)}
        css={{
          color: color ? color : 'inherit'
        }}
      >
        {title}
      </BaseLink>
    </NextLink>
  );
};

export default NavLink;
