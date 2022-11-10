import * as React from "react";
import {useTheme} from "@nextui-org/react";

const DotsContainer: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const {theme} = useTheme();

  return (
    <div className="wrapper">
      {children}
      <style jsx>{`
        .wrapper {
          --dot-size: 1px;
          --dot-space: 22px;
          min-width: 100vw;
          min-height: 100vh;
          overflow: hidden;
          background: linear-gradient(
                90deg,
                ${theme?.colors?.background?.value} 21px,
                transparent 1%
              )
              50%,
            linear-gradient(${theme?.colors?.background?.value} 21px, transparent 1%) 50%,
            ${theme?.colors?.accents2?.value};
          background-size: var(--dot-space) var(--dot-space);
        }
      `}</style>
    </div>
  );
};

export default DotsContainer;
