v5.0.0-rc.2
===

New Features
---
 - `KefirReact` also gets third argument `LoaderComponentClass`

v5.0.0-rc.1
===

Breaking
---
 - API was completely changed

New Features
---
 - `KefirReact` is component factory `(props$, Component) => WrappedComponent`

Use [kefir-combine-object](https://github.com/iofjuupasli/kefir-combine-object) to create `props$`

v4.0.0
===

Breaking
---
 - Now it uses `render` method in props instead of `children`

Bug fixes
---
 - Fixed double subscribing to stream

New Features
---
 - Use `debounce` prop to debounce updating component for new values in streams. Useful for atomic updates of multiple streams bound to one component

v3.0.0
===

It has been completely rewritten to use wrapper component

Breaking
---
 - Uses wrapper instead of mixin

v2.0.0
===

Breaking
---
 - KefirReact.js renamed to kefir-react.js
 - Always adds `getInitialState`, sets `undefined` if not a property or no value

Changes
---
 - Support **all** versions of kefir
