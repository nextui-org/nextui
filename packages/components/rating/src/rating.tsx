import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {StarIcon} from "@nextui-org/shared-icons";

import {UseRatingProps, useRating} from "./use-rating";
import RatingSegment from "./rating-segment";
import {RatingProvider} from "./rating-context";

export interface RatingProps extends UseRatingProps {}

const Rating = forwardRef<"div", RatingProps>((props, ref) => {
  const context = useRating({...props, ref});

  const {
    Component,
    children,
    length,
    ratingValue,
    value,
    name,
    icon = <StarIcon />,
    onChange,
    onBlur,
    setRatingValue,
    getBaseProps,
    getMainWrapperProps,
    getIconWrapperProps,
    getInputProps,
    getRadioGroupProps,
  } = context;

  const IconList = useMemo(() => {
    return (
      <RadioGroup {...getRadioGroupProps()}>
        <Radio
          className={"absolute inset-0 top-0 opacity-0"}
          data-slot="radio"
          name={name}
          value={"0"}
          onBlur={onBlur}
          onChange={onChange}
        />
        <div {...getIconWrapperProps()}>
          {children ??
            Array.from(Array(length)).map((_, idx) => (
              <RatingSegment key={"segment-" + idx} icon={icon} index={idx} />
            ))}
        </div>
      </RadioGroup>
    );
  }, [name, children, length, icon, onBlur, onChange, getIconWrapperProps, getRadioGroupProps]);

  const Input = useMemo(
    () => (
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
    ),
    [value, ratingValue, setRatingValue, getInputProps],
  );

  return (
    <Component {...getBaseProps()}>
      <RatingProvider value={context}>
        <div {...getMainWrapperProps()}>
          {IconList}
          {Input}
        </div>
      </RatingProvider>
    </Component>
  );
});

Rating.displayName = "NextUI.Rating";

export default Rating;
