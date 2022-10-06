/**
 * Part of this code is taken from @chakra-ui/system 🙏🏻
 */
import {
  As,
  rootStyled,
  DOMElements,
  CapitalizedDOMElements,
  NextUIComponent,
  HTMLNextUIComponents,
} from "./system";

type NextUIRoot = {
  <T extends As, P = {}>(component: T): NextUIComponent<T, P>;
};

function root() {
  const cache = new Map<DOMElements, NextUIComponent<DOMElements>>();

  return new Proxy(rootStyled, {
    /**
     * @example
     * const Div = NextUI("div")
     * const StyledComponent = NextUI(AnotherComponent)
     */
    apply(target, thisArg, argArray: [DOMElements]) {
      return rootStyled(...argArray);
    },
    /**
     * @example
     * <NextUI.Div />
     */
    get(_, element: CapitalizedDOMElements) {
      const key = element.toLowerCase() as DOMElements;

      if (!cache.has(key)) {
        cache.set(key, rootStyled(key));
      }

      return cache.get(key);
    },
  }) as NextUIRoot & HTMLNextUIComponents;
}
/**
 * The NextUI root serves as an object of stitches styled components enabled JSX elements,
 * and also a function that can be used to enable custom component receive nextui's props.
 *
 */
export const NextUI = root();
