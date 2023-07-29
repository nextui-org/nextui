import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";

export interface PaginationCursorProps extends HTMLNextUIProps<"span"> {
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

PaginationCursor.displayName = "NextUI.PaginationCursor";

export default PaginationCursor;
