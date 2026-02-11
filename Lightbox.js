// assets/js/components/Lightbox.js
import { domUtils } from '../utils/domUtils.js';
import { eventUtils } from '../utils/eventUtils.js';

export class Lightbox {
    constructor(triggerSelector = '.gallery-item img') {
        this.modal = domUtils.$('#lightbox-modal');
        this.modalImg = domUtils.$('#lightbox-img');
        this.closeBtn = domUtils.$('.close-btn', this.modal);
        this.triggerElements = domUtils.$$(triggerSelector);

        this.init();
    }

    init() {
        if (!this.triggerElements.length || !this.modal) return;

        this.triggerElements.forEach(img => {
            eventUtils.on(img, 'click', (e) => {
                this.open(e.target.src);
            });
        });

        eventUtils.on(this.closeBtn, 'click', () => this.close());
        eventUtils.on(this.modal, 'click', (e) => {
            if (e.target === this.modal) this.close();
        });

        eventUtils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.close();
            }
        });
    }

    open(src) {
        this.modalImg.src = src;
        domUtils.showElement(this.modal);
        document.body.style.overflow = 'hidden';
    }

    close() {
        domUtils.hideElement(this.modal);
        document.body.style.overflow = '';
    }
}