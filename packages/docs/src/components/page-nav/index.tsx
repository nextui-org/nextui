import * as React from 'react';
import withDefaults from '@utils/with-defaults';
import { Route, addTagToSlug } from '@lib/docs/page';
import NextLink from 'next/link';
import { useTheme, NextUIThemes, Container, Button } from '@nextui-org/react';
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
          <Button
            auto
            light
            icon={<ArrowLeft fill={theme.palette.primary} size={20} />}
          >
            {prevRoute.title}
          </Button>
        </NextLink>
      ) : (
        <span />
      )}
      {nextRoute && (
        <NextLink
          href={addTagToSlug(removeFromLast(nextRoute.path || '', '.'), tag)}
        >
          <Button
            auto
            light
            iconRight
            icon={<ArrowRight fill={theme.palette.primary} size={20} />}
          >
            {nextRoute.title}
          </Button>
        </NextLink>
      )}
      <style jsx>{`
        :global(.page-nav) {
          padding: 12% 0;
        }
      `}</style>
    </Container>
  );
};

const PageNavMemo = React.memo(PageNav);

export default withDefaults(PageNavMemo, defaultProps);
