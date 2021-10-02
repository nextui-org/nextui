import * as React from 'react';
import withDefaults from '@utils/with-defaults';
import { Route, addTagToSlug } from '@lib/docs/page';
import NextLink from 'next/link';
import { useTheme, NextUIThemes, Container, Link } from '@nextui-org/react';
import { ArrowRight, ArrowLeft } from '../icons';
import { removeFromLast } from '@utils/index';

export interface PageNavProps {
  tag?: string;
  prevRoute?: Route;
  nextRoute?: Route;
}

const defaultProps = {};

const PageNav: React.FC<PageNavProps> = ({ tag, prevRoute, nextRoute }) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <Container
      display="flex"
      justify="space-between"
      className="page-nav"
      gap={0}
    >
      {prevRoute ? (
        <NextLink
          href={addTagToSlug(removeFromLast(prevRoute.path || '', '.'), tag)}
        >
          <Link color={theme.palette.foreground} className="nav__link" block>
            <ArrowLeft fill={theme.palette.primary} size={20} />
            {prevRoute.title}
          </Link>
        </NextLink>
      ) : (
        <span />
      )}
      {nextRoute && (
        <NextLink
          href={addTagToSlug(removeFromLast(nextRoute.path || '', '.'), tag)}
        >
          <Link color={theme.palette.foreground} className="nav__link" block>
            {nextRoute.title}
            <ArrowRight fill={theme.palette.primary} size={20} />
          </Link>
        </NextLink>
      )}
      <style jsx>{`
        :global(.page-nav) {
          padding: 12% 0;
        }
        :global(.nav__link) {
          display: flex !important;
          align-items: center !important;
        }
      `}</style>
    </Container>
  );
};

const PageNavMemo = React.memo(PageNav);

export default withDefaults(PageNavMemo, defaultProps);
