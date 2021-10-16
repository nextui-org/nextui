import React from 'react';
import { createAction, Action } from 'kbar';
import { Discord } from '../components/icons';
import { NextRouter } from 'next/router';

const getActions = (router: NextRouter): Action[] => [
  {
    id: 'homeAction',
    name: 'Home',
    shortcut: ['h'],
    keywords: 'back',
    section: 'Navigation',
    perform: () => router.push('/'),
    icon: <Discord />,
    subtitle: 'Subtitles can help add more context.'
  },
  {
    id: 'docsAction',
    name: 'Docs',
    shortcut: ['g', 'd'],
    keywords: 'help',
    section: 'Navigation',
    perform: () => router.push('/docs')
  },
  {
    id: 'contactAction',
    name: 'Contact',
    shortcut: ['c'],
    keywords: 'email hello',
    section: 'Navigation',
    perform: () => window.open('mailto:jrgarciadev@gmail.com', '_blank')
  },
  {
    id: 'twitterAction',
    name: 'Twitter',
    shortcut: ['t'],
    keywords: 'social contact dm',
    section: 'Navigation',
    perform: () => window.open('https://twitter.com/jrgarciadev', '_blank')
  },
  createAction({
    name: 'Github',
    shortcut: ['g', 'h'],
    keywords: 'sourcecode',
    section: 'Navigation',
    perform: () => window.open('https://github.com/nextui-org/nextui', '_blank')
  }),
  {
    id: 'theme',
    name: 'Change theme',
    shortcut: [],
    keywords: 'interface color dark light',
    section: '',
    children: ['darkTheme', 'lightTheme']
  },
  {
    id: 'darkTheme',
    name: 'Dark',
    shortcut: [],
    keywords: 'dark',
    section: '',
    perform: () => document.documentElement.setAttribute('data-theme-dark', ''),
    parent: 'theme'
  },
  {
    id: 'lightTheme',
    name: 'Light',
    shortcut: [],
    keywords: 'light',
    section: '',
    perform: () => document.documentElement.removeAttribute('data-theme-dark'),
    parent: 'theme'
  }
];

export default getActions;
