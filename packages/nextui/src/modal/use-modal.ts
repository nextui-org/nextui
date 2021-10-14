import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import useCurrentState from '../use-current-state';

const useModal = (
  initialVisible: boolean = false
): {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentRef: MutableRefObject<boolean>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
} => {
  const [visible, setVisible, currentRef] = useCurrentState<boolean>(
    initialVisible
  );

  return {
    visible,
    setVisible,
    currentRef,
    bindings: {
      open: visible,
      onClose: () => setVisible(false)
    }
  };
};

export default useModal;
