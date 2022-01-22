import * as React from 'react';
import withDefaults from '@utils/with-defaults';
import { Route, addTagToSlug } from '@lib/docs/page';
import { removeFromLast } from '@utils/index';
import { useIsMobile } from '@hooks/use-media-query';
import { Heading } from '@components';
import Category from './category';
import Post from './post';
import { NavLinkProps } from '../nav-link';

export interface Props {
  routes?: Route[];
  level?: number;
  tag?: string;
  slug?: string;
  onPostClick?: (route: Route) => void;
}

const defaultProps = {
  level: 1,
  tag: '',
  slug: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type SidebarProps = Props & typeof defaultProps & NativeAttrs;

function getCategoryPath(routes: Route[]): string {
  const route = routes.find((r) => r.path);
  return route && route.path ? removeFromLast(route.path, '/') : '';
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  level,
  tag,
  slug,
  onPostClick
}) => {
  const isMobile = useIsMobile();
  return (
    <>
      {routes?.map(
        ({
          path,
          title,
          icon,
          routes,
          newPost,
          comingSoon,
          updated,
          heading,
          open
        }) => {
          if (routes) {
            const pathname = getCategoryPath(routes);
            const categorySelected = slug.startsWith(pathname);
            const opened = categorySelected || isMobile ? false : open;

            if (heading) {
              return (
                <Heading key={pathname} title={title}>
                  <Sidebar
                    routes={routes}
                    level={level + 1}
                    tag={tag}
                    slug={slug}
                    onPostClick={onPostClick}
                  />
                </Heading>
              );
            }

            return (
              <Category
                key={pathname}
                routes={routes}
                isMobile={isMobile}
                iconUrl={icon}
                level={level}
                title={title}
                selected={categorySelected}
                opened={opened}
                updated={updated}
              >
                <Sidebar
                  routes={routes}
                  level={level + 1}
                  tag={tag}
                  slug={slug}
                  onPostClick={onPostClick}
                />
              </Category>
            );
          }
          const href = '/docs/[[...slug]]';
          const pagePath: string | undefined =
            path && removeFromLast(path, '.');
          const pathname = pagePath && addTagToSlug(pagePath, tag);
          const selected = pagePath && pagePath === slug;

          const route = {
            href,
            path,
            title,
            pathname,
            selected,
            comingSoon,
            newPost
          } as NavLinkProps;

          return (
            <Post
              key={title}
              isMobile={isMobile}
              level={level}
              route={route}
              onClick={() => onPostClick && onPostClick(route)}
            />
          );
        }
      )}
    </>
  );
};

const MemoSidebar = React.memo(Sidebar);

export default withDefaults(MemoSidebar, defaultProps);
