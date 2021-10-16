import React from 'react';
import { useTheme, Backdrop } from '@nextui-org/react';
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  VisualState,
  useKBar
} from 'kbar';
import KBarOption from './option';
import KBarInput from './input';
import generateStyles from './styles';

const KBar: React.FC<unknown> = () => {
  const theme = useTheme();
  const styles = generateStyles(theme);
  const { visible } = useKBar((state) => ({
    visible: state.visualState !== VisualState.hidden
  }));

  const closeFromBackdrop = () => console.log('close');

  return (
    <KBarPortal>
      <Backdrop
        blur
        onClick={closeFromBackdrop}
        visible={visible}
        width={styles.container.maxWidth}
      >
        <KBarPositioner>
          <KBarAnimator style={styles.container}>
            <KBarInput placeholder="What do you need?" />
            <KBarResults
              style={styles.result}
              onRender={(action, handlers, state) => (
                <KBarOption action={action} handlers={handlers} state={state} />
              )}
            />
          </KBarAnimator>
        </KBarPositioner>
      </Backdrop>
    </KBarPortal>
  );
};

export default KBar;
