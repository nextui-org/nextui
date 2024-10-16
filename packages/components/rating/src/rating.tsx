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
    isInvalid,
    isRequired,
    ratingValue,
    defaultValue,
    value,
    name,
    description,
    errorMessage,
    classNames,
    slots,
    validationBehavior,
    icon = <StarIcon />,
    onChange,
    onBlur,
    setRatingValue,
    getBaseProps,
    getMainWrapperProps,
    getIconWrapperProps,
    getInputProps,
    validate,
  } = context;

  const IconList = useMemo(() => {
    return (
      <div {...getIconWrapperProps()}>
        <RadioGroup
          classNames={{
            errorMessage: slots.errorMessage({class: classNames?.errorMessage}),
            description: slots.description({class: classNames?.description}),
          }}
          data-slot="radio-group"
          defaultValue={defaultValue}
          description={description}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          isRequired={isRequired}
          name={name}
          orientation="horizontal"
          validate={validate}
          validationBehavior={validationBehavior}
          value={ratingValue.selectedValue != -1 ? ratingValue.selectedValue.toString() : null}
          onChange={onChange}
          onValueChange={(e) => {
            setRatingValue({selectedValue: Number(e), hoveredValue: Number(e)});
          }}
        >
          <Radio
            className={"absolute inset-0 top-0 opacity-0"}
            data-slot="radio"
            name={name}
            value={"0"}
            onBlur={onBlur}
            onChange={onChange}
          />
          {children ??
            Array.from(Array(length)).map((_, idx) => (
              <RatingSegment key={"segment-" + idx} icon={icon} index={idx} />
            ))}
        </RadioGroup>
      </div>
    );
  }, [
    children,
    length,
    getIconWrapperProps,
    name,
    defaultValue,
    ratingValue,
    setRatingValue,
    isInvalid,
    isRequired,
    description,
    errorMessage,
    slots,
    classNames,
    validationBehavior,
    onBlur,
    onChange,
    validate,
  ]);

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
