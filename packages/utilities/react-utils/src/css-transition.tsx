import React, {useEffect, useState} from "react";
import {clsx} from "@nextui-org/shared-utils";

interface CSSTransitionProps {
  visible?: boolean;
  childrenRef?: React.RefObject<HTMLElement>;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
  name?: string;
  onExited?: () => void;
  onEntered?: () => void;
}

export const CSSTransition: React.FC<React.PropsWithChildren<CSSTransitionProps>> = ({
  children,
  childrenRef,
  visible = false,
  enterTime = 60,
  leaveTime = 60,
  clearTime = 60,
  className = "",
  name = "transition",
  onExited,
  onEntered,
  ...props
}) => {
  const [classes, setClasses] = useState<string>("");
  const [renderable, setRenderable] = useState<boolean>(visible);

  useEffect(() => {
    const statusClassName = visible ? "enter" : "leave";
    const time = visible ? enterTime : leaveTime;

    if (visible && !renderable) {
      setRenderable(true);
    }

    setClasses(`${name}-${statusClassName}`);

    // set class to active
    const timer = setTimeout(() => {
      setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`);
      if (statusClassName === "leave") {
        onExited?.();
      } else {
        onEntered?.();
      }
      clearTimeout(timer);
    }, time);

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses("");
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);

  // update children ref classes
  useEffect(() => {
    if (!childrenRef?.current) {
      return;
    }
    const classesArr = classes.split(" ");
    const refClassesArr = childrenRef.current.className.split(" ");
    const newRefClassesArr = refClassesArr.filter((item) => !item.includes(name));

    childrenRef.current.className = clsx(newRefClassesArr, classesArr);
  }, [childrenRef, classes]);

  if (!React.isValidElement(children) || !renderable) return null;

  return React.cloneElement(children, {
    ...props,
    className: clsx(children.props.className, className, !childrenRef?.current ? classes : ""),
  });
};
