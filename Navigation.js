// assets/js/components/Navigation.js
import { domUtils } from '../utils/domUtils.js';
import { eventUtils } from '../utils/eventUtils.js';

export class Navigation {
    constructor() {
        this.navMenu = domUtils.$('#nav-menu');
        this.hamburgerBtn = domUtils.$('#hamburger-btn');
        this.navLinks = domUtils.$$('.nav-link');

        this.init();
    }

    init() {
        if (this.hamburgerBtn && this.navMenu) {
            eventUtils.on(this.hamburgerBtn, 'click', () => {
                domUtils.toggleClass(this.navMenu, 'active');
            });
        }

        // 简单的导航高亮逻辑 (示例)
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === '') currentPage = 'index.html'; // 默认首页

        this.navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                domUtils.addClass(link, 'active');
            } else {
                domUtils.removeClass(link, 'active');
            }
        });
    }
}