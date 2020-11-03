import { createElement, ReactElement, ComponentType } from 'react';

export type CreateElement = typeof createElement;

export type Stub = {
  Component: ComponentType<any> | string,
  Stub?: ComponentType<any>,
  stub?: ReactElement<any>,
  props?: object,
};

export interface Context {
  stubs: Stub[],
}
