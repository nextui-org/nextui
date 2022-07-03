import React, {useEffect, useRef, useState} from "react";
import {Link, useTheme} from "@nextui-org/react";

import {Anchor} from "../icons";

export interface Props {
  pure?: boolean;
}

export const virtualAnchorEncode = (text?: string) => {
  if (!text) return undefined;

  return text.toLowerCase().replace(/ /g, "-");
};

const VirtualAnchor: React.FC<React.PropsWithChildren<Props>> = ({children, pure}) => {
  const {theme} = useTheme();
  const ref = useRef<HTMLAnchorElement>(null);
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    if (!ref.current) return;
    setId(virtualAnchorEncode(ref.current.textContent || undefined));
  }, [ref.current]);

  return (
    <span ref={ref} className="parent">
      <Link href={`#${id}`}>{children}</Link>
      <span className="virtual" id={id} />
      {!pure && (
        <span className="icon">
          <Anchor size={20} />
        </span>
      )}
      <style jsx>{`
        .parent {
          position: relative;
          color: inherit;
        }
        .parent :global(a) {
          color: inherit;
        }
        .virtual {
          position: absolute;
          top: -65px;
          left: 0;
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
        }
        .icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          left: -1em;
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          opacity: 0;
          visibility: hidden;
          font-size: inherit;
          width: 1em;
          height: 1em;
          color: ${theme?.colors?.accents7?.value};
          transition: all 0.25s ease;
        }
        .parent:hover > .icon {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </span>
  );
};

export default VirtualAnchor;
