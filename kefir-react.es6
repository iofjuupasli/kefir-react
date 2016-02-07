import React from 'react';
import Kefir from 'kefir';

export default class KefirReact extends React.Component {
    constructor(props) {
        super(props);
    }

    _unsubscribe() {
        this.subscriptions.forEach(({
            stream, handler
        }) => {
            stream.offValue(handler);
        });
        this.subscriptions = [];
    }

    _subscribe(streams) {
        const streamPairs = [];
        Object.keys(streams)
            .map(key => streamPairs.push([key, streams[key]]));
        let stream = Kefir.combine(
            streamPairs.map(([_, s]) => s),

            (...args) => args.reduce((result, v, i) => {
                result[streamPairs[i][0]] = v;
                return result;
            }, {})
        );
        if (this.props.debounce) {
            stream = stream.debounce(this.props.debounce);
        }
        this.subscriptions = this.subscriptions || [];
        const handler = v => this.setState(v);
        this.subscriptions.push({
            stream,
            handler
        });
        stream.onValue(handler);
    }

    componentWillMount() {
        this._subscribe(this.props.streams);
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.streams).length !== Object.keys(this.props.streams) ||
            Object.keys(nextProps.streams).some(k => !(k in this.props.streams))) {
            this.setState(() => ({}));
            this._unsubscribe();
            this._subscribe(nextProps.streams);
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return this.props.render(this.state);
    }
}
