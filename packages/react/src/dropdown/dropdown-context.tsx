import React, { HTMLAttributes, RefObject, useContext } from 'react';
import { FocusStrategy } from '@react-types/shared';

export interface DropdownContextValue extends HTMLAttributes<HTMLElement> {
  onClose?: () => void;
  closeOnSelect?: boolean;
  shouldFocusWrap?: boolean;
  autoFocus?: boolean | FocusStrategy;
  ref?: RefObject<HTMLUListElement>;
}

export const DropdownContext = React.createContext<DropdownContextValue>({});

export function useDropdownContext(): DropdownContextValue {
  return useContext(DropdownContext);
}
