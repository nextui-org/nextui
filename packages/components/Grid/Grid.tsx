import React, {ReactNode} from "react";
import {useTheme} from "@nextui-org/theme"; // Ensure this is properly installed and configured

// Define the props for the Grid component
interface GridProps {
  children: ReactNode;
  columns?: number; // Number of columns in the grid
  gap?: string; // Gap between grid items, e.g., "10px"
  container?: boolean; // Enables centered container layout
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
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

  return (
    <div aria-label="Grid layout" className={className} role="grid" style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid;
