import React, {useEffect, useRef, useState} from "react";
import {Link} from "@nextui-org/react";

import {LinkCircleLinearIcon} from "@/components/icons";

export interface Props {
  pure?: boolean;
  children?: React.ReactNode;
}

export const virtualAnchorEncode = (text?: string) => {
  if (!text) return undefined;

  return text.toLowerCase().replace(/ /g, "-");
};

export const VirtualAnchor: React.FC<Props> = ({children, pure}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    if (!ref.current) return;
    setId(virtualAnchorEncode(ref.current.textContent || undefined));
  }, [ref.current]);

  return (
    <span ref={ref} className="relative text-inherit">
      <Link className="text-inherit" href={`#${id}`}>
        {children}
      </Link>
      <span
        className="absolute top-[-65px] left-0 opacity-0 invisible pointer-events-none"
        id={id}
      />
      {!pure && (
        <span className="absolute left-[-1em] top-1/2 transform -translate-y-1/2 inline-flex justify-center items-center overflow-hidden opacity-0 invisible transition-all duration-200 ease-in group-hover:opacity-100 group-hover:visible text-accent-7 w-4 h-4">
          <LinkCircleLinearIcon size={20} />
        </span>
      )}
    </span>
  );
};
