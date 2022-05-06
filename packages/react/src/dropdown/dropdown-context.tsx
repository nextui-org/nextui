import React, { HTMLAttributes, MutableRefObject, useContext } from 'react';
import { FocusStrategy } from '@react-types/shared';

export interface DropdownContextValue extends HTMLAttributes<HTMLElement> {
  onClose?: () => void;
  closeOnSelect?: boolean;
  shouldFocusWrap?: boolean;
  autoFocus?: boolean | FocusStrategy;
  ref?: MutableRefObject<HTMLUListElement>;
}

export const DropdownContext = React.createContext<DropdownContextValue>({});

export function useDropdownContext(): DropdownContextValue {
  return useContext(DropdownContext);
}
