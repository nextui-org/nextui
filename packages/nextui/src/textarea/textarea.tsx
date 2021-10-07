import React, { useRef, useImperativeHandle } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import Input from '../input';
import { Props as InputProps } from '../input/input-props';
import { __DEV__ } from '../utils/assertion';

interface Props {
  minHeight?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const defaultProps = {
  initialValue: '',
  width: 'initial',
  minHeight: '6.25rem',
};

type NativeAttrs = Omit<
  React.TextareaHTMLAttributes<any>,
  keyof Props | keyof InputProps
>;

type BaseAttrs = Omit<
  InputProps,
  | 'clearable'
  | 'as'
  | 'rounded'
  | 'labelLeft'
  | 'labelRight'
  | 'contentLeft'
  | 'contentRight'
  | 'contentClickable'
  | 'contentLeftStyling'
  | 'contentRightStyling'
  | 'onContentClick'
>;

export type TextareaProps = Props &
  typeof defaultProps &
  NativeAttrs &
  BaseAttrs;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (textareaProps, ref: React.Ref<HTMLTextAreaElement | null>) => {
    const theme = useTheme();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Some lines has @ts-ignored becauses it's neecessary removed them from the props object
    const {
      // @ts-ignore
      clearable,
      // @ts-ignore
      as,
      // @ts-ignore
      rounded,
      // @ts-ignore
      labelLeft,
      // @ts-ignore
      labelRight,
      // @ts-ignore
      contentLeft,
      // @ts-ignore
      contentRight,
      // @ts-ignore
      contentClickable,
      // @ts-ignore
      contentLeftStyling,
      // @ts-ignore
      contentRightStyling,
      // @ts-ignore
      onContentClick,
      width,
      minHeight,
      ...props
    } = textareaProps;

    useImperativeHandle(ref, () => textareaRef.current);

    return (
      <>
        <Input as="textarea" ref={textareaRef} width={width} {...props} />
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
        `}</style>
      </>
    );
  }
);

if (__DEV__) {
  Textarea.displayName = 'NextUI - Textarea';
}

export default withDefaults(Textarea, defaultProps);
