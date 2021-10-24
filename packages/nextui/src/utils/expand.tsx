import React, { useEffect, useRef, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import useRealShape from '../use-real-shape';
import clsx from './clsx';

interface Props {
  isExpanded?: boolean;
  animated?: boolean;
  delay?: number;
}

const defaultProps = {
  isExpanded: false,
  animated: true,
  delay: 200
};

export type ExpandProps = Props & typeof defaultProps;

const Expand: React.FC<React.PropsWithChildren<ExpandProps>> = ({
  isExpanded,
  delay,
  animated,
  children
}) => {
  const [height, setHeight] = useState<string>(isExpanded ? 'auto' : '0');
  const [selfExpanded, setSelfExpanded] = useState<boolean>(isExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const entryTimer = useRef<number>();
  const leaveTimer = useRef<number>();
  const resetTimer = useRef<number>();
  const [state, updateShape] = useRealShape<HTMLDivElement>(contentRef);

  useEffect(() => setHeight(`${state.height}px`), [state.height]);
  useEffect(() => {
    // show element or reset height.
    // force an update once manually, even if the element does not change.
    // (the height of the element might be "auto")
    if (!isExpanded) {
      updateShape();
      setHeight(`${state.height}px`);
    }

    // show expand animation
    entryTimer.current = window.setTimeout(() => {
      setSelfExpanded(isExpanded);
      clearTimeout(entryTimer.current);
    }, 30);

    // Reset height after animation
    if (isExpanded) {
      resetTimer.current = window.setTimeout(() => {
        setHeight('auto');
        clearTimeout(resetTimer.current);
      }, delay);
    } else {
      leaveTimer.current = window.setTimeout(() => {
        clearTimeout(leaveTimer.current);
      }, delay / 2);
    }

    return () => {
      clearTimeout(entryTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(resetTimer.current);
    };
  }, [isExpanded]);

  return (
    <div className={clsx('container', { expanded: selfExpanded, animated })}>
      <div ref={contentRef} className="content">
        {children}
      </div>
      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          height: 0;
          opacity: 0;
          overflow: hidden;
        }
        .animated {
          transition: height ${delay}ms ease 0ms,
            opacity ${delay * 1.5}ms ease 0ms;
        }
        .expanded {
          height: ${height};
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(Expand, defaultProps);
