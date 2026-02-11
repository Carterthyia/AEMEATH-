// assets/js/utils/eventUtils.js
export const eventUtils = {
    on: (element, events, handler, options) => {
        if (element && typeof element.addEventListener === 'function') {
            events.split(' ').forEach(event => element.addEventListener(event, handler, options));
        }
    },
    off: (element, events, handler) => {
        if (element && typeof element.removeEventListener === 'function') {
            events.split(' ').forEach(event => element.removeEventListener(event, handler));
        }
    },
    once: (element, event, handler) => {
        const onceHandler = (e) => {
            handler(e);
            element.removeEventListener(event, onceHandler);
        };
        element.addEventListener(event, onceHandler);
    },
};