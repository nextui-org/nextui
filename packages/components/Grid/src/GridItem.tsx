import React, {ReactNode} from "react";

// Define the props for the GridItem component
interface GridItemProps {
  children: ReactNode;
}

// Single definition of the GridItem component
const GridItem: React.FC<GridItemProps> = ({children, ...props}) => {
  return <div {...props}>{children}</div>;
};

export default GridItem;
