import React, {ReactNode} from "react";
import styled from "@emotion/styled"; // Use @emotion/styled for styling

// Define the props for the Grid component
interface GridProps {
  children: ReactNode;
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

export default Grid;
