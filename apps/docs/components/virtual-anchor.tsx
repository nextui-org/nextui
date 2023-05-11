import React, {useEffect, useRef, useState} from "react";
import {Link} from "@nextui-org/react";

import {LinkLinearIcon} from "@/components/icons";

export interface Props {
  children?: React.ReactNode;
}

export const virtualAnchorEncode = (text?: string) => {
  if (!text) return undefined;

  return text.toLowerCase().replace(/ /g, "-");
};

export const VirtualAnchor: React.FC<Props> = ({children}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    if (!ref.current) return;
    setId(virtualAnchorEncode(ref.current.textContent || undefined));
  }, [ref.current]);

  return (
    <Link ref={ref} className="relative flex items-center gap-1 group text-inherit" href={`#${id}`}>
      {children}
      <span className="opacity-0 transition-opacity group-hover:opacity-100">
        <LinkLinearIcon size={20} strokeWidth="2" />
      </span>
    </Link>
  );
};
