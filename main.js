// assets/js/main.js
import { domUtils } from './utils/domUtils.js';
import { Navigation } from './components/Navigation.js';
import { HeroAnimation } from './components/HeroAnimation.js';
import { Lightbox } from './components/Lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("鸣潮·爱弥斯专题站已启动 (V5.0 - 基于萌娘百科)");

    const loadingScreen = domUtils.$('#loading-screen');
    setTimeout(() => {
        domUtils.addClass(loadingScreen, 'hidden');
    }, 1500);

    new Navigation();
    if (document.getElementById('particle-canvas')) {
        new HeroAnimation();
    }
    if (document.getElementById('lightbox-modal')) {
        new Lightbox();
    }
});