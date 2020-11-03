import React from 'react';
import type { CreateElement } from './types';
import withHarness from './withHarness';

// so this is extremely hacky as we're actually hijacking react's createElement and intercepting render requests

// grab the "real" createElement function
const { createElement: h } = React;

type Args = Parameters<CreateElement>;

const createElement = ((...[ type, ...args ]: Args) => {
  // we don't currently stub primitive elements or object components
  if (typeof type === 'function') {
    // wrap the component in our harness hoc
    type = withHarness(type);
  }
  return h(type, ...args);
}) as CreateElement;

// monkey patch React's createElement with this version
React.createElement = createElement;

export default h;
