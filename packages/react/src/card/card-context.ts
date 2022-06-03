import { createContext } from '../utils/context';
import type { UseCardReturn } from './use-card';

export const [CardProvider, useCardContext] = createContext<UseCardReturn>({
  name: 'CardContext',
  strict: false
});
