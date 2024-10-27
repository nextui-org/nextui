//import React, {ReactNode} from "react";
//import styled from "@emotion/styled"; // Use @emotion/styled for styling

import React, {ReactNode} from "react";
<<<<<<< HEAD
import styled from "@emotion/styled"; // Use @emotion/styled for styling
=======
import {styled} from "@nextui-org/system";
import {CSS} from "@nextui-org/theme";
import {SizeType, BreakpointValue} from "@nextui-org/theme";
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)

// Define the props for the Grid component
interface GridProps {
  children: ReactNode;
<<<<<<< HEAD
  columns?: number; // Number of columns in the grid
  gap?: string; // Gap between grid items, e.g., "10px"
  container?: boolean;
}

// Styled component with dynamic grid column handling
const StyledGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 3}, 1fr);
  gap: ${(props) => props.gap || "10px"};
  max-width: ${(props) => (props.container ? "1200px" : "100%")};
  margin: ${(props) => (props.container ? "0 auto" : "0")};
`;

const Grid: React.FC<GridProps> = ({children, columns = 3, gap = "10px", container = false}) => {
  return (
    <StyledGrid columns={columns} container={container} gap={gap} role="grid">
      {React.Children.map(children, (child) => (
        <div role="gridcell">{child}</div>
      ))}
    </StyledGrid>
  );
};
=======
  // Layout
  columns?: number | Record<SizeType, number>;
  gap?: BreakpointValue<string | number>;
  container?: boolean;
  // Alignment
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  alignItems?: "start" | "center" | "end" | "stretch";
  // NextUI integration
  css?: CSS;
  className?: string;
}

// Styled component with dynamic grid column handling
const StyledGrid = styled("div", {
  display: "grid",
  $$maxWidth: "1200px",
  variants: {
    container: {
      true: {
        maxWidth: "$$maxWidth",
        mx: "auto",
        px: "$sm",
      },
    },
    justify: {
      start: {justifyContent: "flex-start"},
      center: {justifyContent: "center"},
      end: {justifyContent: "flex-end"},
      between: {justifyContent: "space-between"},
      around: {justifyContent: "space-around"},
      evenly: {justifyContent: "space-evenly"},
    },
    alignItems: {
      start: {alignItems: "flex-start"},
      center: {alignItems: "center"},
      end: {alignItems: "flex-end"},
      stretch: {alignItems: "stretch"},
    },
  },
});

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    children,
    columns = 3,
    gap = "$md",
    container = false,
    justify,
    alignItems,
    css,
    ...otherProps
  } = props;

  const getResponsiveColumns = (cols: GridProps["columns"]) => {
    if (typeof cols === "number") return `repeat(${cols}, 1fr)`;

    return Object.entries(cols).reduce(
      (acc, [breakpoint, value]) => ({
        ...acc,
        [`@${breakpoint}`]: {
          gridTemplateColumns: `repeat(${value}, 1fr)`,
        },
      }),
      {},
    );
  };

  return (
    <StyledGrid
      ref={ref}
      alignItems={alignItems}
      container={container}
      css={{
        gridTemplateColumns: getResponsiveColumns(columns),
        gap,
        ...css,
      }}
      justify={justify}
      role="grid"
      {...otherProps}
    >
      {children}
    </StyledGrid>
  );
});
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)

Grid.displayName = "NextUI.Grid";
export default Grid;
