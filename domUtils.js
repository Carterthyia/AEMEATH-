// assets/js/utils/domUtils.js
export const domUtils = {
    $: (selector, parent = document) => parent.querySelector(selector),
    $$: (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),
    createElement: (tag, className = '', attributes = {}) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    },
    hideElement: (element) => {
        if (element) element.style.display = 'none';
    },
    showElement: (element, display = 'block') => {
        if (element) element.style.display = display;
    },
    toggleClass: (element, className) => {
        if (element) element.classList.toggle(className);
    },
    addClass: (element, className) => {
        if (element) element.classList.add(className);
    },
    removeClass: (element, className) => {
        if (element) element.classList.remove(className);
    },
    isMobile: () => window.innerWidth <= 768,
};