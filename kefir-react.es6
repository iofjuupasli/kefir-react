import React from 'react';

const getPropertyValue = property => {
    let value;
    const saveCurrentValue = v => value = v;
    property.onValue(saveCurrentValue).offValue(saveCurrentValue);
    return value;
};

const map = (fn, obj) => Object.keys(obj)
    .reduce((result, key) => {
        result[key] = fn(result[key])
        return result;
    }, {});

const mapObjIndexed = (fn, obj) => Object.keys(obj)
    .reduce((result, key) => {
        result[key] = fn(result[key], key)
        return result;
    }, {});

const equals = (a, b) => a.every((v, i) => b[i] === v);

export default class KefirReact extends React.Component {
    state = map(getPropertyValue, this.props.streams)

    _unsubscribe() {
        this.subscriptions.forEach(({stream, handler}) => {
            stream.offValue(handler);
        });
        this.subscriptions = [];
    }

    _subscribe(streams) {
        this.subscriptions = this.subscriptions || [];
        const handlerByKey = key => value => {
            this.setState(() => ({
                [key]: value
            }));
        };
        mapObjIndexed((stream, key) => {
            const handler = handlerByKey(key);
            this.subscriptions.push({
                stream,
                handler
            });
            stream.onValue(handler);
        }, streams);
    }

    componentDidMount() {
        this._subscribe(this.props.streams);
    }

    componentWillReceiveProps(nextProps) {
        if (!equals(
            Object.keys(nextProps.streams),
            Object.keys(this.props.streams)
        )) {
            this.setState(() => ({}));
            this._unsubscribe();
            this._subscribe(nextProps.streams);
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return React.createElement('div', null, React.Children.map(
            this.props.children,
            child => React.cloneElement(child, this.state)
        ));
    }
}
