import React, { useRef, useImperativeHandle, useLayoutEffect } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import Input from '../input';
import useResize from '../use-resize';
import useWarning from '../use-warning';
import { Props as InputProps } from '../input/input-props';
import {
  excludedInputPropsForTextarea,
  ExcludedInputProps
} from '../utils/prop-types';
import { __DEV__ } from '../utils/assertion';
import { calculateNodeHeight, SizingData, getSizingData } from './utils';

export type TextareaHeightChangeMeta = {
  rowHeight: number;
};

interface Props {
  rows?: number;
  maxRows?: number;
  minRows?: number;
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  cacheMeasurements?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const defaultProps = {
  minRows: 3,
  maxRows: 6,
  cacheMeasurements: true,
  initialValue: '',
  width: 'initial'
};

type NativeAttrs = Omit<
  React.TextareaHTMLAttributes<any>,
  keyof Props | keyof InputProps
>;

type BaseAttrs = Omit<InputProps, ExcludedInputProps>;

export type TextareaProps = Props &
  typeof defaultProps &
  NativeAttrs &
  BaseAttrs;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (textareaProps, ref: React.Ref<HTMLTextAreaElement | null>) => {
    const theme = useTheme();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const heightRef = React.useRef<number>(0);
    const measurementsCacheRef = React.useRef<SizingData>();

    const {
      width,
      cacheMeasurements,
      rows,
      maxRows,
      minRows,
      onChange,
      onHeightChange,
      ...props
    } = textareaProps;

    Object.keys(props).forEach((propNameKey: any) => {
      if (excludedInputPropsForTextarea.indexOf(propNameKey) > -1) {
        // @ts-ignored
        delete props[propNameKey];
      }
    });

    const isControlled = props.value !== undefined;

    if (__DEV__ && props.style) {
      if ('maxHeight' in props.style) {
        useWarning(
          'Using `style.maxHeight` for <Textarea/> is not supported. Please use `maxRows`.'
        );
      }
      if ('minHeight' in props.style) {
        useWarning(
          'Using `style.minHeight` for <Textarea/> is not supported. Please use `minRows`.'
        );
      }
    }

    useImperativeHandle(ref, () => textareaRef.current);

    const resizeTextarea = () => {
      const node = textareaRef.current!;
      const nodeSizingData =
        cacheMeasurements && measurementsCacheRef.current
          ? measurementsCacheRef.current
          : getSizingData(node);

      if (!nodeSizingData) {
        return;
      }

      measurementsCacheRef.current = nodeSizingData;

      const [height, rowHeight] = calculateNodeHeight(
        nodeSizingData,
        node.value || node.placeholder || 'x',
        rows || minRows,
        rows || maxRows
      );

      if (heightRef.current !== height) {
        heightRef.current = height;
        node.style.setProperty('height', `${height}px`, 'important');
        onHeightChange && onHeightChange(height, { rowHeight });
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        resizeTextarea();
      }
      onChange && onChange(event);
    };

    if (typeof document !== 'undefined') {
      useLayoutEffect(resizeTextarea);
      useResize(resizeTextarea);
    }

    return (
      <>
        <Input
          as="textarea"
          ref={textareaRef}
          width={width}
          onChange={handleChange}
          {...props}
        />
        <style jsx>{`
          :global(.textarea-wrapper) {
            box-sizing: border-box;
            width: ${width};
            min-width: 12.5rem;
            max-width: 100%;
            height: auto;
          }
          :global(textarea) {
            background-color: transparent;
            box-shadow: none;
            display: block;
            font-family: ${theme.fonts.sans};
            padding: ${theme.spacing.sm};
            width: 100%;
            height: 100%;
            resize: none;
            border: none;
            outline: none;
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
