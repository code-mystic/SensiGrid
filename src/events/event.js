import EventEmitter from 'event-emitter-es6';

export default class CustomEvent extends EventEmitter {

    constructor () {
        super();
    }
    /**
     * Wrapper around event-emiter-es6 class to overwrite
     * its `on` method by more well known and conventional 
     * `addEventListener` method 
     * @param {String} type String for the event name
     * @param {function} callback The listener function to be invoked
     */
    addEventListener(type, callback) {
        this.on(type, function listener(){
            var args = arguments;
            callback.apply(this, args);
        });
    }

    /*removeEventListener(){

    }

    dispatchEvent() {

    }*/
}