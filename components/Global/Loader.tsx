import { ProgressBar } from 'primereact/progressbar';
import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

type LoaderProps = {
  line?: boolean;
};

export default function Loader({ line = false }: LoaderProps) {
  return (
    <>
      {line ? (
        <ProgressBar
          color='teal'
          mode='indeterminate'
          style={{ height: '6px' }}
        ></ProgressBar>
      ) : (
        <ProgressSpinner
          style={{ width: '60px', height: '60px' }}
          strokeWidth='4'
        />
      )}
    </>
  );
}
