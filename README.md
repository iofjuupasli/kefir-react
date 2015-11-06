[![Build Status](https://travis-ci.org/iofjuupasli/kefir-react.svg?branch=master)](https://travis-ci.org/iofjuupasli/kefir-react)

kefir-react
===

React mixin for linking Kefir.js observables as state value

Usage [example](https://github.com/iofjuupasli/kefir-react-example)

```js
import KefirConnect from 'kefir-react';

const myProperty = Kefir.fromPoll(1, () => new Date()})
    .toProperty(() => new Date());

const MyComponent = React.createClass({
    mixins: [KefirConnect(myProperty, 'myValue')],
    render: function () {
        return React.DOM.div(null, this.state.myValue);
    }
});
```

API
---
Exports React mixin constructor

```ts
interface KefirConnectMixin {
    (observable : KefirObservable, statePropertyName : string) : ReactMixin
}
```

When observable is KefirProperty, current value of property is used for `getInitialState`

Value is available at `this.state[statePropertyName]`
