import './style.css';
import { initI18n, t } from './i18n';
import { renderContent } from './render';

initI18n();
renderContent(t());

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    });
});

const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
    observer.observe(section);
});

let ticking = false;

function updateParallax(): void {
    const scrolled = window.scrollY;
    const gridOverlay = document.querySelector('.grid-overlay') as HTMLElement;

    if (gridOverlay) {
        gridOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    ticking = false;
}

window.addEventListener(
    'scroll',
    () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    },
    { passive: true }
);

const keyBuffer: string[] = [];
const SECRET_CODE = import.meta.env.VITE_SECRET_CODE.toLowerCase();

function createHeart(): HTMLDivElement {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = `${Math.random() * 30 + 20}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.opacity = '0';
    heart.style.transform = 'scale(0) rotate(0deg)';
    heart.style.transition = 'all 0.5s ease-out';

    return heart;
}

function triggerHeartAnimation(): void {
    const heartsCount = 30;
    const hearts: HTMLDivElement[] = [];

    for (let i = 0; i < heartsCount; i++) {
        const heart = createHeart();
        document.body.appendChild(heart);
        hearts.push(heart);

        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = `scale(1) rotate(${Math.random() * 360}deg)`;

            const floatAnimation = setInterval(() => {
                const currentTop = Number.parseFloat(heart.style.top);
                heart.style.top = `${currentTop - 2}px`;
            }, 50);

            setTimeout(() => {
                clearInterval(floatAnimation);
                heart.style.opacity = '0';
                heart.style.transform = `scale(0) rotate(${Math.random() * 720}deg)`;

                setTimeout(() => {
                    document.body.removeChild(heart);
                }, 500);
            }, 3000);
        }, i * 100);
    }
}

window.addEventListener('keydown', (e) => {
    keyBuffer.push(e.key.toLowerCase());

    if (keyBuffer.length > SECRET_CODE.length) {
        keyBuffer.shift();
    }

    if (keyBuffer.join('') === SECRET_CODE) {
        triggerHeartAnimation();
        keyBuffer.length = 0;
    }
});

console.log(
    '%c🚀 Portfolio loaded',
    'color: #00f0ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;'
);
console.log('%cBuilt with Vite + TypeScript + Tailwind CSS', 'color: #8892b0; font-size: 12px;');
