import * as React from 'react';
import withDefaults from '@utils/with-defaults';
import { Route, addTagToSlug } from '@lib/docs/page';
import { removeFromLast } from '@utils/index';
import { useIsMobile } from '@hooks/use-media-query';
import Heading from './heading';
import Category from './category';
import Post from './post';
import { NavLinkProps } from '../nav-link';

export interface Props {
  routes: Route[];
  level?: number;
  tag?: string;
  slug?: string;
}

const defaultProps = {
  level: 1,
  tag: 'main',
  slug: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type SidebarProps = Props & typeof defaultProps & NativeAttrs;

function getCategoryPath(routes: Route[]): string {
  const route = routes.find((r) => r.path);
  return route && route.path ? removeFromLast(route.path, '/') : '';
}

const Sidebar: React.FC<SidebarProps> = ({ routes, level, tag, slug }) => {
  const isMobile = useIsMobile();
  return (
    <>
      {routes.map(({ path, title, routes, heading, open }) => {
        if (routes) {
          const pathname = getCategoryPath(routes);
          const selected = slug.startsWith(pathname);
          const opened = selected || isMobile ? false : open;

          if (heading) {
            return (
              <Heading key={pathname} title={title}>
                <Sidebar
                  routes={routes}
                  level={level + 1}
                  tag={tag}
                  slug={slug}
                />
              </Heading>
            );
          }

          return (
            <Category
              key={pathname}
              isMobile={isMobile}
              level={level}
              title={title}
              selected={selected}
              opened={opened}
            >
              <Sidebar
                routes={routes}
                level={level + 1}
                tag={tag}
                slug={slug}
              />
            </Category>
          );
        }
        const href = '/docs/[[...slug]]';
        const pagePath: string | undefined = path && removeFromLast(path, '.');
        const pathname = pagePath && addTagToSlug(pagePath, tag);
        const selected = pagePath && slug.startsWith(pagePath);
        const route = { href, path, title, pathname, selected } as NavLinkProps;

        return (
          <Post key={title} isMobile={isMobile} level={level} route={route} />
        );
      })}
    </>
  );
};

const MemoSidebar = React.memo(Sidebar);

export default withDefaults(MemoSidebar, defaultProps);
