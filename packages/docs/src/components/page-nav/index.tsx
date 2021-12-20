import * as React from 'react';
import withDefaults from '@utils/with-defaults';
import { Route, addTagToSlug } from '@lib/docs/page';
import NextLink from 'next/link';
import { useTheme, Container, Link } from '@nextui-org/react';
import { ArrowRight, ArrowLeft } from '../icons';
import { removeFromLast } from '@utils/index';

export interface PageNavProps {
  tag?: string;
  prevRoute?: Route;
  nextRoute?: Route;
}

const defaultProps = {};

const PageNav: React.FC<PageNavProps> = ({ tag, prevRoute, nextRoute }) => {
  const { theme } = useTheme();
  return (
    <Container
      display="flex"
      justify="space-between"
      className="page-nav"
      css={{ py: '12%' }}
      gap={0}
    >
      {prevRoute ? (
        <NextLink
          href={addTagToSlug(removeFromLast(prevRoute.path || '', '.'), tag)}
        >
          <Link
            css={{ color: '$foreground', d: 'flex', ai: 'center' }}
            className="nav__link"
            block
          >
            <ArrowLeft fill={theme?.colors?.primary?.value} size={20} />
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
          <Link
            css={{ color: '$foreground', d: 'flex', ai: 'center' }}
            className="nav__link"
            block
          >
            {nextRoute.title}
            <ArrowRight fill={theme?.colors?.primary?.value} size={20} />
          </Link>
        </NextLink>
      )}
    </Container>
  );
};

const PageNavMemo = React.memo(PageNav);

export default withDefaults(PageNavMemo, defaultProps);
