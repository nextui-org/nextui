/**
 * Part of this code is taken from @chakra-ui/system 🙏🏻
 */

import {styled} from "./stitches.config";
import {As, DOMElements, NextUIComponent, HTMLNextUIComponents} from "./system";

type NextUIRoot = {
  <T extends As, P = {}>(component: T): NextUIComponent<T, P>;
};

function root() {
  const cache = new Map<DOMElements, NextUIComponent<DOMElements>>();

  return new Proxy(styled, {
    /**
     * @example
     * const Div = NextUI("div")
     * const StyledComponent = NextUI(AnotherComponent)
     */
    apply(target, thisArg, argArray: [DOMElements]) {
      return styled(...argArray);
    },
    /**
     * @example
     * <nextui.div />
     */
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, styled(element));
      }

      return cache.get(element);
    },
  }) as NextUIRoot & HTMLNextUIComponents;
}
/**
 * The NextUI root serves as an object of stitches styled components enabled JSX elements,
 * and also a function that can be used to enable custom component receive nextui's props.
 *
 */
export const nextui = root();
