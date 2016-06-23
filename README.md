kefir-react
===

React wrapper component for linking Kefir.js observables as props value

Usage [example](https://github.com/iofjuupasli/kefir-react-example)

```js
import { KefirReact } from 'kefir-react';

const myProperty = Kefir.fromPoll(1, () => new Date()})
    .toProperty(() => new Date());

class App extends React.Component {
    render() {
        return this.props.myValue;
    }
}

const AppWrapped = KefirReact(
    myProperty.map(myValue => { myValue }),
    App
);

class Main extends React.Component {
    render() {
        return React.createElement(AppWrapped);
    }
}
```

API
---
Exports `KefirReact` factory and `KefirReactComponent` react component

### `KefirReact`

```
(props$, ComponentClass) -> WrappedComponentClass
```

So in `props` of instantiated `ComponentClass` there will be values from `props$`

Use [kefir-combine-object](https://github.com/iofjuupasli/kefir-combine-object) to create `props$`
