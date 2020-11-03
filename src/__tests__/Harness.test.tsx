import { cleanup, render } from '@testing-library/react';
import test from 'ava';
import React from 'react';
import Harness from '../';

test.afterEach(cleanup);

test.serial('renders children', async(t) => {
  const Component = () => (
    <div data-testid="root"/>
  );
  const { findByTestId } = render(
    <Harness
      Component={() => null}
    >
      <Component/>
    </Harness>
  );

  await findByTestId('root');

  t.pass();
});

test.serial('stubs a component', async(t) => {
  const Component = () => (
    <div data-testid="root"/>
  );

  const { findByTestId } = render(
    <Harness Component={Component}>
      <Component/>
    </Harness>
  );

  await findByTestId('root').then(
    () => Promise.reject('should not resolve'),
    () => 'rejected',
  );

  t.pass();
});

test.serial('stubs a component with a Stub', async(t) => {
  const Component = () => (
    <div data-testid="root"/>
  );
  const Stub = () => (
    <div data-testid="mock">{'mock'}</div>
  );

  const { findByTestId } = render(
    <Harness
      Component={Component}
      Stub={Stub}
    >
      <Component/>
    </Harness>
  );

  await findByTestId('mock');

  t.pass();
});

test.serial('stubs a component with an element', async(t) => {
  const Component = () => (
    <div data-testid="root"/>
  );
  const Stub = () => (
    <div data-testid="mock">{'mock'}</div>
  );

  const { findByTestId } = render(
    <Harness
      Component={Component}
      stub={<Stub/>}
    >
      <Component/>
    </Harness>
  );

  await findByTestId('mock');

  t.pass();
});

test.serial('stubs a component by displayName', async(t) => {
  const Component = () => (
    <div data-testid="root"/>
  );
  Component.displayName = 'Component';
  const Stub = () => (
    <div data-testid="mock">{'mock'}</div>
  );

  const { findByTestId } = render(
    <Harness
      Component="Component"
      Stub={Stub}
    >
      <Component/>
    </Harness>
  );

  await findByTestId('mock');

  t.pass();
});

test.serial('stubs a component with static props', async(t) => {
  const Component = ({ name }: { name: string }) => (
    <div data-testid="root">{name}</div>
  );
  const Stub = ({
    name,
    text,
  }: {
    name: string,
    text: string
  }) => (
    <div data-testid="mock">
      {`${name} ${text}`}
    </div>
  );
  const { findByText } = render(
    <Harness
      Component={Component}
      Stub={Stub}
      text="mock"
    >
      <Component name="root"/>
    </Harness>
  );

  await findByText('root mock');

  t.pass();
});

test.serial('stub updates on subsequent renders', async(t) => {
  const Component = () => (
    <div>{'root'}</div>
  );
  const Wrapper = () => {
    const [ text, setText ] = React.useState('one');
    React.useEffect(() => {
      const h = setTimeout(() => {
        console.log('setting text to two');
        setText('two');
      }, 250);

      return () => clearTimeout(h);
    }, []);
    const Stub = ({ text }: { text: string }) => (
      <div>{text}</div>
    );

    return (
      <Harness
        Component={Component}
        stub={<Stub text={text}/>}
      >
        <div>
          <Component/>
        </div>
      </Harness>
    );
  };

  const { findByText, rerender } = render(<Wrapper/>);

  await findByText('one');

  rerender(<Wrapper/>);

  await findByText('two');

  t.pass();
});
