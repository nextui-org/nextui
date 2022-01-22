import React from 'react';
import { Palette, Magic, GamingConsole } from '../../icons';
import { Logo } from '@components';

const themes = [
  {
    id: 'nextui',
    title: 'NextUI',
    icon: () => (
      <Logo
        small
        size={44}
        css={{
          '& path': {
            fill: 'currentColor'
          }
        }}
      />
    )
  },
  {
    id: 'modern',
    title: 'Modern',
    icon: () => <Palette size={44} fill="currentColor" />
  },
  {
    id: 'elegant',
    title: 'Elegant',
    icon: () => <Magic size={44} fill="currentColor" />
  },
  {
    id: 'retro',
    title: 'Retro',
    icon: () => <GamingConsole size={44} fill="currentColor" />
  }
];

const sizes = [
  {
    id: 'extra-small',
    title: 'XS'
  },
  {
    id: 'small',
    title: 'S'
  },
  {
    id: 'medium',
    title: 'M'
  },
  {
    id: 'large',
    title: 'L'
  },
  {
    id: 'extra-large',
    title: 'XL'
  }
];

export { themes, sizes };
