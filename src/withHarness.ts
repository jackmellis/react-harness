import { cloneElement, ComponentType, useContext } from 'react';
import context from './context';
import createElement from './createElement';

const DefaultStub = (): null => null;

export default <T>(Component: ComponentType<T>): ComponentType<T> => {
  const Harnessed = (props: T) => {
    const ctx = useContext(context);

    // if there aren't any stubs we can exit early
    if (!ctx?.stubs?.length) {
      return createElement(Component, props);
    }
    // is there a stub for this component?
    const stub = ctx.stubs.find(({ Component: C }) => {
      if (C === Component || C === Harnessed || C === Component.displayName) {
        return true;
      }
    });
    if (stub == null) {
      return createElement(Component, props);
    }
    const {
      Stub,
      stub: element,
      props: staticProps,
    } = stub;

    if (element) {
      return cloneElement(element);
    }

    if (Stub) {
      return createElement(Stub, {
        ...props,
        ...staticProps,
      });
    }

    // if we haven't set a stub component, we just want to render null and essentially remove the component from the tree
    return createElement(DefaultStub);
  };
  Harnessed.displayName = `Harnessed${Component.displayName || Component.name || ''}`;

  return Harnessed;
};
