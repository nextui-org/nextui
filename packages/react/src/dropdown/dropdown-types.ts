import type { HTMLAttributes } from 'react';
import { useMenuItem, useMenuSection } from '@react-aria/menu';
import type { FocusRingAria } from '@react-aria/focus';

export type MenuItemAria = ReturnType<typeof useMenuItem>;
export type MenuSectionAria = ReturnType<typeof useMenuSection>;

export interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
}

export interface IMenuItemAria extends MenuItemAria {
  /** Props for the main text element inside the menu item. */
  labelProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  /** Props for the description text element inside the menu item, if any. */
  descriptionProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  /** Props for the keyboard shortcut text element inside the item, if any. */
  keyboardShortcutProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
}

export interface IMenuSectionAria extends MenuSectionAria {
  /** Props for the wrapper list item. */
  itemProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  /** Props for the heading element, if any. */
  headingProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
  /** Props for the group element. */
  groupProps: Omit<HTMLAttributes<HTMLElement>, 'css'>;
}
