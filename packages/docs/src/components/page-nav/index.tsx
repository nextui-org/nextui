import * as React from 'react';
import withDefaults from '@utils/with-defaults';
import { Route, addTagToSlug } from '@lib/docs/page';
import NextLink from 'next/link';
import { useTheme, styled, Container, Link } from '@nextui-org/react';
import { ArrowRight, ArrowLeft } from '../icons';
import { removeFromLast } from '@utils/index';

export interface PageNavProps {
  tag?: string;
  prevRoute?: Route;
  nextRoute?: Route;
}

const defaultProps = {};

const StyledLink = styled(Link, {
  '&.page-nav__link': {
    d: 'flex',
    ai: 'center',
    color: '$text',
    '&:hover': {
      bg: '$accents2'
    }
  }
});

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
          <StyledLink block className="page-nav__link">
            <ArrowLeft fill={theme?.colors?.primary?.value} size={20} />
            {prevRoute.title}
          </StyledLink>
        </NextLink>
      ) : (
        <span />
      )}
      {nextRoute && (
        <NextLink
          href={addTagToSlug(removeFromLast(nextRoute.path || '', '.'), tag)}
        >
          <StyledLink block className="page-nav__link">
            {nextRoute.title}
            <ArrowRight fill={theme?.colors?.primary?.value} size={20} />
          </StyledLink>
        </NextLink>
      )}
    </Container>
  );
};

export default withDefaults(PageNav, defaultProps);
