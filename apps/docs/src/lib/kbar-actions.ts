import { Action } from 'kbar';
import { NextRouter, useRouter } from 'next/router';
import { ThemeType } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { Route } from '@lib/docs/page';
import { getId } from '../utils/collections';
import { removeFromLast } from '@utils/index';
// data imported from manifest
import docsManifest from '../../content/docs/manifest.json';

const docsActions: Action[] = [];

const buildDocsActions = (
  router: NextRouter,
  routes: Route[],
  parent?: string
) => {
  routes.forEach((route: Route) => {
    const routeId = getId();
    const routePath: any = route.path ? removeFromLast(route.path, '.') : null;
    const action: Action = {
      id: routeId,
      name: route.title,
      section: route.section || '',
      parent: parent,
      shortcut: [],
      children: [],
      keywords: route.keywords || '',
      subtitle: route.subtitle || ''
    };
    if (routePath) {
      action.perform = () => {
        router.push(routePath);
      };
    }
    if (route.icon) {
      action.icon = route.icon;
    }
    if (parent) {
      docsActions
        .filter((act) => act.id === parent)
        .map((act) => {
          return act.children?.push(routeId);
        });
    }
    docsActions.push(action);
    if (route.routes) {
      buildDocsActions(router, route.routes, routeId);
    }
  });
};

const handleExternalLink = (href: string) => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    rel: 'noopener noreferrer',
    href
  }).click();
};

const useActions = (): Action[] => {
  const router = useRouter();
  const { setTheme } = useNextTheme();
  const routes = docsManifest.routes;
  buildDocsActions(router, routes);

  const handleChangeTheme = (theme: ThemeType) => {
    setTheme(theme);
  };

  const staticActions: Action[] = [
    {
      id: 'twitter',
      name: 'Twitter',
      subtitle: '@getnextui',
      section: 'Social',
      shortcut: [],
      keywords: 'dm, twitter, contact',
      icon: 'twitter',
      perform: () => handleExternalLink('https://twitter.com/getnextui')
    },
    {
      id: 'discord',
      name: 'Discord',
      subtitle: 'Join us!',
      section: 'Social',
      shortcut: [],
      keywords: 'chat, community, join',
      icon: 'discord',
      perform: () => handleExternalLink('https://discord.gg/9b6yyZKmH4')
    },
    {
      id: 'github',
      name: 'Github',
      subtitle: 'nextui-org',
      section: 'Social',
      shortcut: [],
      keywords: 'github, source code, open, code',
      icon: 'github',
      perform: () => handleExternalLink('https://github.com/nextui-org/nextui')
    },
    {
      id: 'changeTheme',
      name: 'Change Theme',
      section: 'General',
      shortcut: [],
      keywords:
        'background, change color, color, change theme, theme, dark, light',
      icon: 'palette',
      children: ['darkTheme', 'lightTheme']
    },
    {
      id: 'darkTheme',
      name: 'Dark',
      parent: 'changeTheme',
      keywords: 'dark',
      icon: 'moon',
      shortcut: [],
      perform: () => handleChangeTheme('dark')
    },
    {
      id: 'lightTheme',
      name: 'Light',
      parent: 'changeTheme',
      keywords: 'light',
      shortcut: [],
      icon: 'sun',
      perform: () => handleChangeTheme('light')
    }
  ];

  return [...docsActions, ...staticActions];
};

export default useActions;
