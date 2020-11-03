import React from 'react';
import Harness from '..';

export default {
  title: 'Harness',
};

export const Basic = () => {
  const Smart = () => (
    <div>{'I am smart'}</div>
  );
  const Smart2 = () => (
    <div>{'I am not stubbed'}</div>
  );
  const Wrapper = () => (
    <div>
      <div>{'I am about to render a smart component...'}</div>
      <Smart/>
    </div>
  );
  const IdStub = ({ id }: { id: number }) => (
    <div>{'The answer is '}{id}</div>
  );

  return (
    <Harness
      Component={Smart}
      Stub={IdStub}
      id={44}
    >
      <Harness
        Component={Smart2}
        stub={<div>{'I am stubbed 2'}</div>}
      >
        <Smart/>
        <Smart2/>
        <Wrapper/>
      </Harness>
    </Harness>
  );
};
