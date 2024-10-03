import {useCallback, useRef} from "react";

// Type for the return API
interface UseKeyRepeatBlockerReturn {
  handleKeyDown: (key: string) => void;
  handleKeyUp: (key: string) => void;
  isKeyDown: (key: string) => boolean;
}

export const useKeyRepeatBlocker = (blockedKeys: string[]): UseKeyRepeatBlockerReturn => {
  // Ref to store the mutable map of key pressed states
  const keyPressedRef = useRef<Record<string, boolean>>({});

  // useCallback to ensure stable function references
  const handleKeyDown = useCallback(
    (key: string) => {
      if (blockedKeys.includes(key)) {
        // If the key is already pressed, do nothing
        if (keyPressedRef.current[key]) {
          return;
        }

        // Mark the key as pressed
        keyPressedRef.current[key] = true;
      }
    },
    [blockedKeys],
  );

  const handleKeyUp = useCallback(
    (key: string) => {
      if (blockedKeys.includes(key)) {
        // Mark the key as not pressed
        keyPressedRef.current[key] = false;
      }
    },
    [blockedKeys],
  );

  // Function to check if a given key is already pressed
  const isKeyDown = useCallback((key: string): boolean => {
    return keyPressedRef.current[key];
  }, []);

  // Return the API
  return {
    handleKeyDown,
    handleKeyUp,
    isKeyDown,
  };
};
