import React from 'react';
import {
  StyledInputBlockLabel,
  InputBlockLabelVariantsProps
} from './input.styles';
import clsx from '../utils/clsx';

export interface InputBlockLabelLabel {
  labelId: string;
  label: string;
  htmlFor: string;
  isTextarea?: boolean;
  selfValue?: string;
}

export type InputBlockLabelProps = InputBlockLabelLabel &
  InputBlockLabelVariantsProps;

const preClass = 'next-input-block-label';

const InputBlockLabel: React.FC<InputBlockLabelProps> = ({
  label,
  labelId,
  htmlFor,
  selfValue,
  ...props
}) => {
  return (
    <StyledInputBlockLabel
      id={labelId}
      className={clsx(preClass, {
        [`${preClass}--with-value`]: !!selfValue
      })}
      withValue={!!selfValue}
      htmlFor={htmlFor}
      {...props}
    >
      {label}
    </StyledInputBlockLabel>
  );
};

const MemoInputBlockLabel = React.memo(InputBlockLabel);

export default MemoInputBlockLabel;
