kefir-react
===

React wrapper component for linking Kefir.js observables as props value

Usage [example](https://github.com/iofjuupasli/kefir-react-example)

```js
import KefirReact from 'kefir-react';

const myProperty = Kefir.fromPoll(1, () => new Date()})
    .toProperty(() => new Date());

class App extends React.Component {
    render() {
        return this.props.myValue;
    }
}

class Main extends React.Component {
    render() {
        return React.createElement(KefirReact, {
                streams: {
                    myValue: myProperty
                }
            },
            React.createElement(App)
        );
    }
}
```

API
---
Exports React component class

Gets object of streams where keys are names of props and values are observables

```js
React.createElement(KefirReact, {
        streams: {
            valueWillBeAvailableInPropsAtThisKey: observable
        }
    },
    React.createElement(ComponentInWhichValuesWillBeInProps)
);
```

When observable is KefirProperty, current value of property will be immediately in props
