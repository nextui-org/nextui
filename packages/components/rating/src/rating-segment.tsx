import {mergeRefs} from "@nextui-org/react-utils";
import {useRef} from "react";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useHover} from "@react-aria/interactions";
import {Radio} from "@nextui-org/radio";

import {useRatingContext} from "./rating-context";
import {RatingIcon} from "./rating-icon";

interface RatingSegmentProps {
  index: number;
  icon?: React.ReactNode;
  fillColor?: string;
}

const RatingSegment = ({index, icon, fillColor}: RatingSegmentProps) => {
  const context = useRatingContext();
  const {
    ratingValue,
    isRTL,
    isIconWrapperHovered,
    shouldConsiderHover,
    precision,
    slots,
    classNames,
    isSingleSelection,
    setRatingValue,
    onChange,
    name,
    onBlur,
  } = context;

  const iconRef = useRef<HTMLElement>(null);

  const onPointerUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconRef || !iconRef.current) return;
    if (isSingleSelection) {
      setRatingValue({selectedValue: index + 1, hoveredValue: ratingValue.hoveredValue});

      return;
    }

    const clientX = e.clientX;
    const {x, width} = iconRef.current.getBoundingClientRect();
    const sweepedWidth = isRTL ? x + width - clientX : clientX - x;
    const updatedSelectedValue = sweepedWidth / width;
    let precisedSelectedValue = Math.floor(updatedSelectedValue / precision) * precision;

    if (precisedSelectedValue < updatedSelectedValue)
      precisedSelectedValue = precisedSelectedValue + precision;
    if (Math.floor(precisedSelectedValue) > Math.floor(updatedSelectedValue))
      precisedSelectedValue = Math.floor(precisedSelectedValue);

    precisedSelectedValue += index;
    setRatingValue({selectedValue: precisedSelectedValue, hoveredValue: ratingValue.hoveredValue});
  };

  let value = ratingValue.selectedValue;

  if (isIconWrapperHovered && shouldConsiderHover) {
    value = ratingValue.hoveredValue;
  }

  const calculateOffset = (
    value: number,
    index: number,
    isSingleSelection: boolean,
    isRTL: boolean,
  ) => {
    if (isSingleSelection) {
      return Number(Math.floor(value) - 1 == index);
    }

    if (Math.floor(value) > index) {
      return Number(!isRTL);
    }

    if (Math.floor(value) < index) {
      return Number(isRTL);
    }

    if (isRTL) {
      return 1 - (value - Math.floor(value));
    }

    return value - Math.floor(value);
  };

  const offset = calculateOffset(value, index, isSingleSelection, false);
  const offsetRTL = calculateOffset(value, index, isSingleSelection, true);

  const segmentStyles = slots.iconSegment({class: clsx(classNames?.iconSegment)});
  const {isHovered, hoverProps} = useHover({});

  return (
    <div
      ref={mergeRefs(iconRef)}
      className={segmentStyles}
      data-hovered={dataAttr(isHovered)}
      data-slot="segment"
      onPointerUp={onPointerUp}
      {...hoverProps}
    >
      <RatingIcon fillColor={fillColor} icon={icon} offset={isRTL ? offsetRTL : offset} />
      <Radio
        className={`absolute top-0 inset-0 opacity-0 cursor-pointer`}
        name={name}
        value={index.toString()}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default RatingSegment;
