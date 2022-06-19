import React from "react";

import withDefaults from "../../utils/with-defaults";

export interface Props {
  className?: string;
  width?: string;
  height?: string;
  alt?: string;
}

const defaultProps = {
  className: "",
  width: "100%",
  height: "100%",
  alt: "block placeholder",
};

const PlaceholderBlock: React.FC<Props> = ({className, width, height, alt, ...props}) => {
  return (
    <div className={className} style={{width, height}} {...props}>
      <img
        alt={alt}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />
      <style jsx>
        {`
          div {
            position: relative;
            display: flex;
            width: ${width};
            height: ${height};
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default withDefaults(PlaceholderBlock, defaultProps);
