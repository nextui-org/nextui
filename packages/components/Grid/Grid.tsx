import React, {ReactNode} from "react";
import {useTheme} from "@nextui-org/theme"; // Ensure this is properly installed and configured

// Define the props for the Grid component
interface GridProps {
  children: ReactNode;
<<<<<<< HEAD
  columns?: number; // Number of columns in the grid
  gap?: string; // Gap between grid items, e.g., "10px"
  container?: boolean; // Enables centered container layout
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
=======
  columns?: number & {valueOf(): number}; // Number of columns in the grid
  gap?: `${number}${"px" | "rem" | "em"}`; // Gap between grid items
  container?: boolean; // Enables centered container layout
  responsive?: {
    sm?: number & {valueOf(): number};
    md?: number & {valueOf(): number};
    lg?: number & {valueOf(): number};
    xl?: number & {valueOf(): number};
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
  };
  justify?: "start" | "center" | "end" | "space-between" | "space-around"; // Horizontal alignment of grid items
  align?: "start" | "center" | "end" | "stretch"; // Vertical alignment of grid items
  className?: string; // Custom class name for additional styling
}

// Single definition of the Grid component
const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = "10px",
  container = false,
  responsive,
  justify = "start",
  align = "stretch",
  className,
}) => {
  const theme = useTheme();
<<<<<<< HEAD

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    maxWidth: container ? theme.breakpoints.xl : "none",
    margin: container ? "0 auto" : "none",
    justifyContent: justify,
    alignItems: align,
    ...(responsive && {
      [`@media (min-width: ${theme.breakpoints.sm})`]: {
        gridTemplateColumns: `repeat(${responsive.sm || columns}, 1fr)`,
      },
      [`@media (min-width: ${theme.breakpoints.md})`]: {
        gridTemplateColumns: `repeat(${responsive.md || columns}, 1fr)`,
      },
      [`@media (min-width: ${theme.breakpoints.lg})`]: {
        gridTemplateColumns: `repeat(${responsive.lg || columns}, 1fr)`,
      },
      [`@media (min-width: ${theme.breakpoints.xl})`]: {
        gridTemplateColumns: `repeat(${responsive.xl || columns}, 1fr)`,
      },
    }),
  };

=======

  const gridStyle = React.useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      maxWidth: container ? theme.breakpoints.xl : "100%",
      margin: container ? "0 auto" : 0,
      padding: container ? `0 ${theme.spacing.md}` : 0,
      justifyContent: justify,
      alignItems: align,
      ...(responsive && {
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          gridTemplateColumns: `repeat(${responsive.sm || columns}, 1fr)`,
        },
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          gridTemplateColumns: `repeat(${responsive.md || columns}, 1fr)`,
        },
        [`@media (min-width: ${theme.breakpoints.lg})`]: {
          gridTemplateColumns: `repeat(${responsive.lg || columns}, 1fr)`,
        },
        [`@media (min-width: ${theme.breakpoints.xl})`]: {
          gridTemplateColumns: `repeat(${responsive.xl || columns}, 1fr)`,
        },
      }),
    }),
    [columns, gap, container, responsive, justify, align, theme.breakpoints],
  );

>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
  return (
    <div aria-label="Grid layout" className={className} role="grid" style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid;
