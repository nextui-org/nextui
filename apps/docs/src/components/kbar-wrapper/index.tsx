import { KBarProvider } from 'kbar';
import dynamic from 'next/dynamic';
import React from 'react';
import useKbarActions from '@lib/kbar-actions';

type KBARWrapperProps = {
  children?: React.ReactNode;
};

const KbarComponent = dynamic(() => import('../kbar'), {
  ssr: false
});

const KBARWrapper: React.FC<KBARWrapperProps> = ({ children }) => {
  const kbarActions = useKbarActions();

  return (
    <KBarProvider
      actions={kbarActions}
      options={{
        animations: {
          enterMs: 250,
          exitMs: 100
        }
      }}
    >
      <KbarComponent />
      {children}
    </KBarProvider>
  );
};

export default KBARWrapper;
