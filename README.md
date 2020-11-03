# react-harness
A provider/hook/hoc set that makes it much easier to develop with nested components.

[Examples](https://github.com/jackmellis/react-harness/tree/main/examples)

## Introduction
If you've ever used storybook on a medium/large application you'll quite likely have come across this issue. Say you have a simple header component and you want to work on it in a story:

```tsx
import Header from '../Header';

export const DumbHeader = () => (
  <Header/>
);
```

but when you run it you see something like
```
ERROR: cannot GET /api/my/account
```
Ack! That's because the Header renders a `<SmartProfile>` component which fetches your account details from an api. 

If only we could somehow stub the entire smart component...

## Harness
```ts
(props: {
  Component: ComponentType | string,
  Stub?: ComponentType,
  stub?: Element,
  ...props: any
}): Element
```
This component will intercept any attempted renders of `Component` and instead render a stub of it.

You can either pass in a stub component, an element, or neither (which will just render `null`):

```tsx
<Harness Component={SmartProfile} Stub={props => <div>stubbed</div>}>
  <Header/>
</Harness>
```

```tsx
<Harness Component={SmartProfile} stub={<DumbComponent/>}>
  <Header/>
</Harness>
```

```tsx
<Harness Component={SmartProfile}>
  <Header/>
</Harness>
```

Any additional props you pass in will be passed on to the `Stub` component:
```tsx
<Harness
  Component={SmartProfile}
  Stub={DumbProfile}
  accountName="Ross"
>
  <Header/>
</Harness>
```

If you need to stub multiple components you can just nest harnesses:
```tsx
<Harness Component={SmartProfile}>
  <Harness Component={SmartLanguage}>
    <Harness Component={SmartCurrency}>
      <Header/>
    </Harness>
  </Harness>
</Harness>
```
