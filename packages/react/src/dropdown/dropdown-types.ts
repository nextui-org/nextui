import type { HTMLAttributes } from 'react';
import { useMenuItem } from '@react-aria/menu';
import type { FocusRingAria } from '@react-aria/focus';

export type MenuItemAria = ReturnType<typeof useMenuItem>;

export interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
}

export interface IMenuItemAria extends MenuItemAria {
  labelProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  descriptionProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  keyboardShortcutProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
}
