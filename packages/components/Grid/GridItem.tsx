import React, {ReactNode} from "react";

// Define the props for the GridItem component
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

// Single definition of the GridItem component with ref forwarding and grid semantics
const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
<<<<<<< HEAD
  ({children, className, ...props}, ref) => {
    return (
      <div
        ref={ref}
=======
  ({children, className, "aria-label": ariaLabel, ...props}, ref) => {
    return (
      <div
        ref={ref}
        aria-label={ariaLabel}
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
        className={className}
        role="gridcell" // Adds grid semantics for accessibility
        {...props}
      >
        {children}
      </div>
    );
  },
);

GridItem.displayName = "NextUI.GridItem"; // Sets a display name for better debugging

export default GridItem;
