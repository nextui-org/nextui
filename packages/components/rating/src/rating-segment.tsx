import {useMemo} from "react";
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
    name,
    onChange,
    onBlur,
    setRatingValue,
  } = context;

  let value = ratingValue.selectedValue;

  if (isIconWrapperHovered && shouldConsiderHover) {
    value = ratingValue.hoveredValue;
  }

  const calculateOffsets = (value: number, index: number, isSingleSelection: boolean) => {
    if (isSingleSelection) {
      const singleOffset = Number(Math.floor(value) - 1 == index);

      return {offset: singleOffset, offsetRTL: 1 - singleOffset};
    }

    if (Math.floor(value) > index) {
      return {offset: 1, offsetRTL: 0};
    }

    if (Math.floor(value) < index) {
      return {offset: 0, offsetRTL: 1};
    }

    const fractionalPart = value - Math.floor(value);

    return {offset: fractionalPart, offsetRTL: 1 - fractionalPart};
  };

  const {offset, offsetRTL} = calculateOffsets(value, index, isSingleSelection);

  const segmentStyles = slots.iconSegment({class: clsx(classNames?.iconSegment)});
  const {isHovered, hoverProps} = useHover({});

  const radioButtons = useMemo(() => {
    const numButtons = Math.floor(1 / precision);
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${numButtons}, 1fr)`,
    };

    return (
      <div
        className={slots.radioButtonsWrapper({class: classNames?.radioButtonsWrapper})}
        style={gridStyle}
      >
        {Array.from(Array(numButtons)).map((_, idx) => {
          const radioButtonValue =
            idx === numButtons - 1 ? index + 1 : index + precision + idx * precision;

          return (
            <div
              key={idx}
              className={slots.radioButtonWrapper({class: classNames?.radioButtonWrapper})}
              onMouseMove={() => {
                setRatingValue({
                  hoveredValue: radioButtonValue,
                  selectedValue: ratingValue.selectedValue,
                });
              }}
            >
              <Radio
                key={idx}
                classNames={{base: "w-full h-full m-0"}}
                data-slot="radio"
                name={name}
                value={radioButtonValue.toString()}
                onBlur={onBlur}
                onChange={onChange}
              />
            </div>
          );
        })}
      </div>
    );
  }, [precision, name, ratingValue, setRatingValue]);

  return (
    <div
      className={segmentStyles}
      data-hovered={dataAttr(isHovered)}
      data-slot="segment"
      {...hoverProps}
    >
      <RatingIcon fillColor={fillColor} icon={icon} offset={isRTL ? offsetRTL : offset} />
      {radioButtons}
    </div>
  );
};

export default RatingSegment;
