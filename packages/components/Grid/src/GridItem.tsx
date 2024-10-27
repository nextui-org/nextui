import React, {ReactNode, forwardRef} from "react";
<<<<<<< HEAD
import styled from "@emotion/styled"; // Use @emotion/styled directly as fallback
import {CSS, SizeType} from "@nextui-org/theme";
=======
//import styled from "@emotion/styled"; // Use @emotion/styled directly as fallback
import {CSS, SizeType} from "@nextui-org/theme";
import {styled} from "@nextui-org/system";
import {useCallback} from "react";
import {getBreakpointValue} from "@nextui-org/theme";
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)

/**
 * Props for the GridItem component.
 * - `span`: Number of columns to span for different breakpoints.
 * - `start`: Start position in the grid for different breakpoints.
 * - `end`: End position in the grid for different breakpoints.
 * - `order`: Order of the item in the grid.
 * - `css`: Custom CSS styles.
 */
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  span?: number | Record<SizeType, number>;
  start?: number | Record<SizeType, number>;
  end?: number | Record<SizeType, number>;
  order?: number | Record<SizeType, number>;
  css?: CSS;
}

/**
 * Styled component for a single grid item.
 * Applies grid cell display and optional span, start, and end properties.
 */
<<<<<<< HEAD
const StyledGridItem = styled("div")({
  display: "block",
=======
const StyledGridItem = styled("div", {
  $$gridItemPadding: "$space$4",
  display: "block",
  position: "relative",
  width: "100%",
  padding: "$$gridItemPadding",
  variants: {
    disablePadding: {
      true: {
        padding: 0,
      },
    },
  },
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
});

/**
 * GridItem component representing an individual cell within the grid.
 * Supports responsive spanning, starting, and ending positions.
 */
const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({children, span, start, end, order, css, ...props}, ref) => {
    /**
     * Helper function to generate responsive styles for a given CSS property.
     * - `property`: CSS property to be applied.
     * - `value`: Value of the property, either a single value or responsive object.
     */
<<<<<<< HEAD
    const getResponsiveStyles = (property: string, value: GridItemProps[keyof GridItemProps]) => {
      if (typeof value === "number") return {[property]: value};
      if (typeof value === "object") {
        return Object.entries(value).reduce((acc, [breakpoint, val]) => {
          acc[`@media (min-width: ${breakpoint}px)`] = {[property]: val};

          return acc;
        }, {} as CSS);
      }

      return {};
    };
=======
    const getResponsiveStyles = useCallback(
      (property: string, value: GridItemProps[keyof GridItemProps]) => {
        if (typeof value === "number") return {[property]: value};
        if (typeof value === "object") {
          return Object.entries(value).reduce((acc, [breakpoint, val]) => {
            const breakpointValue = getBreakpointValue(breakpoint as SizeType);

            acc[`@media (min-width: ${breakpointValue}px)`] = {[property]: val};

            return acc;
          }, {} as CSS);
        }

        return {};
      },
      [],
    );
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)

    return (
      <StyledGridItem
        ref={ref}
        css={{
          ...getResponsiveStyles("gridColumn", span && `span ${span}`),
          ...getResponsiveStyles("gridColumnStart", start),
          ...getResponsiveStyles("gridColumnEnd", end),
          ...getResponsiveStyles("order", order),
          ...css,
        }}
        role="gridcell" // ARIA role for individual grid cell
        {...props}
      >
        {children}
      </StyledGridItem>
    );
  },
);

GridItem.displayName = "NextUI.GridItem";

export default GridItem;
