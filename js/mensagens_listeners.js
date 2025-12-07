class Listener {
    constructor(htmlElement, eventType, callback) {
        this.htmlElement = htmlElement;
        this.eventType = eventType;
        this.callback = callback;
    }
    attach() {
        this.htmlElement.addEventListener(this.eventType, this.callback);
    }
    detach() {
        this.htmlElement.removeEventListener(this.eventType, this.callback);
    }
}

class Listeners {
    constructor() {
        this.listeners = [];
    }

    addListener(htmlElement, eventType, callback) {
        const listener = new Listener(htmlElement, eventType, callback);
        this.listeners.push(listener);
        listener.attach();
    }
    removeListener(htmlElement, eventType, callback) {
        this.listeners = this.listeners.filter((listener) => {
            if (listener.htmlElement === htmlElement && listener.eventType === eventType && listener.callback === callback) {
                listener.detach();
                return false;
            }
            return true;
        });
    }
}