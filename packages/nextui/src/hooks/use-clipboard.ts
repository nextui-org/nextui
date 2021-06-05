import usePortal from './use-portal';
import useWarning from './use-warning';
import { useCallback } from 'react';

export type UseClipboardOptions = {
  onError: Function;
};

export type UseClipboardResult = {
  copy: (text: string) => void;
};

const defaultOptions: UseClipboardOptions = {
  onError: () => useWarning('Failed to copy.', 'use-clipboard'),
};

const useClipboard = (
  options: UseClipboardOptions = defaultOptions
): UseClipboardResult => {
  const el = usePortal('clipboard');

  const copyText = (el: HTMLElement | null, text: string) => {
    if (!el || !text) return;
    const selection = window.getSelection();
    if (!selection) return;

    el.style.whiteSpace = 'pre';
    el.textContent = text;

    const range = window.document.createRange();
    selection.removeAllRanges();
    range.selectNode(el);
    selection.addRange(range);
    try {
      window.document.execCommand('copy');
    } catch (e) {
      options.onError && options.onError();
    }

    selection.removeAllRanges();
    if (el) {
      el.textContent = '';
    }
  };

  const copy = useCallback(
    (text: string) => {
      copyText(el, text);
    },
    [el]
  );

  return { copy };
};

export default useClipboard;
