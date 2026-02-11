// assets/js/components/HeroAnimation.js
import { domUtils } from '../utils/domUtils.js';
import { eventUtils } from '../utils/eventUtils.js';

export class HeroAnimation {
    constructor(canvasId = 'particle-canvas') {
        this.canvas = domUtils.$(`#${canvasId}`);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.resizeCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createParticles() {
        const particleCount = domUtils.isMobile() ? 50 : 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(236, 64, 122, ${Math.random() * 0.5})`, // 粉色调
            });
        }
    }

    bindEvents() {
        eventUtils.on(window, 'resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.resizeCanvas();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > this.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.height) p.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}