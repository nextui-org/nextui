import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";

export interface PaginationCursorProps extends HTMLHeroUIProps<"span"> {
  /**
   * The current active page.
   */
  activePage?: number;
}

const PaginationCursor = forwardRef<"span", PaginationCursorProps>((props, ref) => {
  const {as, activePage, ...otherProps} = props;

  const Component = as || "span";
  const domRef = useDOMRef(ref);

  return (
    <Component ref={domRef} aria-hidden={true} {...otherProps}>
      {activePage}
    </Component>
  );
});

PaginationCursor.displayName = "HeroUI.PaginationCursor";

export default PaginationCursor;
