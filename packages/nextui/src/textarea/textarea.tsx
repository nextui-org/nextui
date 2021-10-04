import React, { useRef, useImperativeHandle } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import Input from '../input';
import { SimpleColors } from '../utils/prop-types';
import { Props as InputProps } from '../input/input-props';
import { __DEV__ } from '../utils/assertion';

interface Props extends InputProps {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  color?: SimpleColors;
  width?: string;
  minHeight?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const defaultProps = {
  initialValue: '',
  color: 'default' as SimpleColors,
  width: 'initial',
  minHeight: '6.25rem',
  disabled: false,
  readOnly: false,
  className: '',
};

type NativeAttrs = Omit<React.TextareaHTMLAttributes<any>, keyof Props>;
export type TextareaProps = Props & typeof defaultProps & NativeAttrs;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      width,
      color: colorProp,
      minHeight,
      disabled,
      readOnly,
      onFocus,
      onBlur,
      className,
      initialValue,
      onChange,
      value,
      ...props
    },
    ref: React.Ref<HTMLTextAreaElement | null>
  ) => {
    const theme = useTheme();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => textareaRef.current);

    return (
      <>
        <Input
          as="textarea"
          ref={textareaRef}
          className={className}
          {...props}
        />
        <style jsx>{`
          :global(.textarea-wrapper) {
            box-sizing: border-box;
            width: ${width};
            min-width: 12.5rem;
            max-width: 95vw;
            height: auto;
          }
          :global(textarea) {
            background-color: transparent;
            box-shadow: none;
            display: block;
            font-family: ${theme.font.sans};
            font-size: 0.875rem;
            width: 100%;
            height: 100%;
            min-height: ${minHeight};
            resize: none;
            border: none;
            outline: none;
            padding: ${theme.layout.gapHalf};
          }
          .disabled > textarea {
            cursor: not-allowed;
          }
          :global(textarea:-webkit-autofill),
          :global(textarea:-webkit-autofill:hover),
          :global(textarea:-webkit-autofill:active),
          :global(textarea:-webkit-autofill:focus) {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
          }
        `}</style>
      </>
    );
  }
);

if (__DEV__) {
  Textarea.displayName = 'NextUI - Textarea';
}

export default withDefaults(Textarea, defaultProps);
