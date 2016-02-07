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
                },
                render: values => React.createElement(App, values)
            }
        );
    }
}
```

API
---
Exports React component class

Gets object of streams where keys are names of props and values are observables

And gets `render` function which should be used for render children components

```js
React.createElement(KefirReact, {
        streams: {
            valueWillBeAvailableInPropsAtThisKey: observable
        },
        render: values => React.createElement(ComponentInWhichValuesWillBeInProps, values)
    }
);
```

If observable is KefirProperty, current value of property will be immediately in props
