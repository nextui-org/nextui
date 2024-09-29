import {useState} from "react";

export interface UseClipboardProps {
  /**
   * The time in milliseconds to wait before resetting the clipboard.
   * @default 2000
   */
  timeout?: number;
}

/**
 * Copies the given text to the clipboard.
 * @param {number} timeout - timeout in ms, default 2000
 * @returns {copy, copied, error, reset} - copy function, copied state, error state, reset function
 */
export function useClipboard({timeout = 2000}: UseClipboardProps = {}) {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const onClearTimeout = () => {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
  };

  const handleCopyResult = (value: boolean) => {
    onClearTimeout();
    setCopyTimeout(setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const compatibilityCopy = (text: string) => {
    const input = document.createElement("input");

    input.setAttribute("value", text);
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    try {
      let result = document.execCommand("copy");
      handleCopyResult(result);
    } catch (err) {
      setCopied(false);
      setError(new Error("useClipboard: document.execCommand is not supported"));
    }
    document.body.removeChild(input);
  };

  const copy = (valueToCopy: any) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => {
          setError(err);
          compatibilityCopy(valueToCopy);
        });
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"));
      compatibilityCopy(valueToCopy);
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    onClearTimeout();
  };

  return {copy, reset, error, copied};
}

export type UseClipboardReturn = ReturnType<typeof useClipboard>;
