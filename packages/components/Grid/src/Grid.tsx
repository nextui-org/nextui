import React, {ReactNode} from "react";

// Define the props for the Grid component
interface GridProps {
  children: ReactNode;
  columns?: number; // Number of columns in the grid
  gap?: string; // Gap between grid items, e.g., "10px"
}

// Single definition of the Grid component
const Grid: React.FC<GridProps> = ({children, columns = 3, gap = "10px"}) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  };

  return <div style={gridStyle}>{children}</div>;
};

export default Grid;
