/* js/main.js */
/**
 * 爱弥斯个人博客主脚本
 * 处理所有交互逻辑与视觉效果
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    initBinaryBackground();
    initParticles();
    initScrollAnimations();
    initGlitchEffect();
    initCorruptedText();
    initSmoothScroll();
});

// 当前形态状态
let currentMode = 'human';
const modeConfig = {
    human: {
        description: '形态切换完成：标准人类形态 // 同步率监测中...',
        colorClass: 'text-cyan-400',
        bodyShadow: 'none'
    },
    mech: {
        description: '形态切换完成：隧者兵装已显化 // 飞行系统就绪',
        colorClass: 'text-pink-400',
        bodyShadow: 'inset 0 0 100px rgba(255, 42, 109, 0.1)'
    }
};

/**
 * 形态切换功能
 * 在人类形态与机兵形态间切换
 */
function toggleMode() {
    const switcher = document.querySelector('.mode-switch');
    const description = document.getElementById('modeDescription');
    const humanText = document.querySelector('.mode-text-human');
    const mechText = document.querySelector('.mode-text-mech');
    
    if (currentMode === 'human') {
        currentMode = 'mech';
        switcher.classList.remove('human');
        switcher.classList.add('mech');
        updateModeUI('mech', humanText, mechText, description);
    } else {
        currentMode = 'human';
        switcher.classList.remove('mech');
        switcher.classList.add('human');
        updateModeUI('human', humanText, mechText, description);
    }
    
    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('modeChange', { 
        detail: { mode: currentMode } 
    }));
}

function updateModeUI(mode, humanText, mechText, description) {
    const config = modeConfig[mode];
    
    description.textContent = config.description;
    description.className = `text-sm ${config.colorClass} orbitron h-6`;
    document.body.style.boxShadow = config.bodyShadow;
    
    if (mode === 'mech') {
        humanText.classList.add('text-gray-500');
        mechText.classList.remove('text-gray-500');
    } else {
        humanText.classList.remove('text-gray-500');
        mechText.classList.add('text-gray-500');
    }
}

/**
 * 初始化二进制背景
 * 生成随机的0/1数据流背景
 */
function initBinaryBackground() {
    const binaryBg = document.getElementById('binaryBg');
    if (!binaryBg) return;
    
    let binaryText = '';
    const rows = 100;
    const cols = 200;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            binaryText += Math.random() > 0.5 ? '1' : '0';
        }
        binaryText += '\n';
    }
    
    binaryBg.textContent = binaryText;
    
    // 定期更新部分数据模拟流动效果
    setInterval(() => {
        const chars = binaryBg.textContent.split('');
        const randomIndex = Math.floor(Math.random() * chars.length);
        if (chars[randomIndex] !== '\n') {
            chars[randomIndex] = chars[randomIndex] === '1' ? '0' : '1';
            binaryBg.textContent = chars.join('');
        }
    }, 100);
}

/**
 * 初始化粒子系统
 * 创建漂浮的数据粒子效果
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const config = AemeathConfig.visual.particles;
    let particleCount = 0;
    
    function createParticle() {
        if (particleCount >= config.count) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * (config.size.max - config.size.min) + config.size.min;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: ${config.color};
        `;
        
        container.appendChild(particle);
        particleCount++;
        
        setTimeout(() => {
            particle.remove();
            particleCount--;
        }, (duration + delay) * 1000);
    }
    
    // 初始创建
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }
    
    // 持续生成
    setInterval(createParticle, 500);
}

/**
 * 初始化滚动动画
 * 使用Intersection Observer实现元素进入视口时的动画
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 同步率条动画
                if (entry.target.classList.contains('sync-gauge')) {
                    const width = entry.target.style.width || '100%';
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
                
                // 卡片入场动画
                if (entry.target.classList.contains('holo-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有同步率条和卡片
    document.querySelectorAll('.sync-gauge, .holo-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 初始化故障艺术效果
 * 随机触发文字故障动画
 */
function initGlitchEffect() {
    const glitches = document.querySelectorAll('.glitch');
    const frequency = AemeathConfig.visual.glitch.frequency;
    
    setInterval(() => {
        glitches.forEach(el => {
            if (Math.random() < frequency) {
                el.style.animation = 'none';
                el.offsetHeight; // 强制重绘
                el.style.animation = '';
            }
        });
    }, 3000);
}

/**
 * 初始化损坏文本效果
 * 鼠标悬停时显示数据损坏效果
 */
function initCorruptedText() {
    document.querySelectorAll('.corrupted').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.textShadow = '2px 0 #ff2a6d, -2px 0 #05d9e8';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.transform = '';
        });
    });
}

/**
 * 初始化平滑滚动
 * 为导航链接添加平滑滚动行为
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 64; // 导航栏高度
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 同步率监测器
 * 模拟实时同步率波动
 */
class SyncRateMonitor {
    constructor() {
        this.current = 200;
        this.max = 200;
        this.element = document.querySelector('.sync-gauge');
        this.init();
    }
    
    init() {
        setInterval(() => {
            this.fluctuate();
        }, 2000);
    }
    
    fluctuate() {
        const change = Math.floor(Math.random() * 10) - 5;
        this.current = Math.max(0, Math.min(this.max, this.current + change));
        
        if (this.element) {
            const percentage = (this.current / this.max) * 100;
            this.element.style.width = percentage + '%';
        }
    }
}

// 初始化同步率监测（如果页面中有对应元素）
if (document.querySelector('.sync-gauge')) {
    new SyncRateMonitor();
}

/**
 * 键盘快捷键
 * M: 切换形态
 * G: 触发故障效果
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        toggleMode();
    }
    if (e.key === 'g' || e.key === 'G') {
        document.querySelectorAll('.glitch').forEach(el => {
            el.style.animation = 'glitch-skew 0.3s';
            setTimeout(() => {
                el.style.animation = '';
            }, 300);
        });
    }
});

// 控制台彩蛋
console.log('%c AEMEATH.exe ', 'background: #ff2a6d; color: #010a12; font-size: 20px; font-weight: bold;');
console.log('%c 电子幽灵系统已启动 ', 'color: #05d9e8;');
console.log('%c 同步率: 200/200 | 共鸣率: 4/4 ', 'color: #ff6b35;');
console.log('%c 警告: 检测到漂泊者频率 ', 'color: #ff2a6d; font-weight: bold;');