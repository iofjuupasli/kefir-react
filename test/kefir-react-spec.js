var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
chai.should();

var R = require('ramda');
var Kefir = require('kefir');
var KefirConnect = require('../kefir-react');

describe('using with constant', function () {
    it('should copy value to state', function () {
        var prop = Kefir.constant('foo');
        var mixin = KefirConnect(prop, 'bar');
        var mockComponent = {
            setState: chai.spy()
        }
        var mixed = R.merge(mockComponent, mixin);

        var initialState = mixed.getInitialState();
        initialState.bar.should.equals('foo');

        mixed.componentDidMount();
        mixed.subscriptions.length.should.equals(1);
        mockComponent.setState.should.have.been.called.exactly(1);

        mixed.componentWillUnmount();
    });
});
