/* global JSX */
import {
  ComponentType,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';
import Context from './context';
import createElement from './createElement';

type Props<T> = {
  Component: ComponentType<any> | string,
  Stub?: ComponentType<T>,
  stub?: ReactElement,
  children?: ReactNode,
} & Partial<T>;

export default function Harness<T>({
  Component,
  Stub,
  stub: stubElement,
  children,
  ...props
}: Props<T>) {
  const context = useContext(Context);
  const stubsRef = useRef(context?.stubs ?? []);

  // is there already a stub registered for this component?
  const stub = stubsRef.current.find(({ Component: C }) => C === Component);
  // lots of mutation going on here :eyes:
  // this just keeps things fast and lets us leverage references and reduce re-renders
  // we're going to merge the new stub properties into the existing one
  // this will happen every render, but it ensures we're rendering the "latest" stubbed component
  if (stub) {
    Object.assign(stub, {
      Stub,
      stub: stubElement,
      props,
    });
  } else {
    stubsRef.current.push({
      Component,
      Stub,
      stub: stubElement,
      props,
    });
  }

  // If this is the first harness in the component tree, there won't be a context yet
  // so we need to render a provider
  // if it's not the first harness, we should already have context and won't need a new provider
  if (context) {
    return children as JSX.Element;
  }

  // react hook after return?!
  // it's okay though because you shouldn't be able to have a context and also not have a context between renders
  const value = useMemo(() => ({ stubs: stubsRef.current }), []);

  return createElement(
    Context.Provider,
    {
      value,
      children,
    },
  );
}
