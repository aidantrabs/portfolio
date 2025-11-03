import './style.css';
import { initI18n, t } from './i18n';
import { renderContent } from './render';
import confetti from 'canvas-confetti';

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

const inputSequence: string[] = [];
const UNLOCK_CODE = import.meta.env.VITE_SECRET_CODE.toLowerCase();

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

function showModal(): void {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h1 class="modal-title">${import.meta.env.VITE_MODAL_MESSAGE}</h1>
            <p class="modal-body">${import.meta.env.VITE_MODAL_BODY}</p>
            <button class="modal-close">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#000000', '#ffff00', '#ffffff']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#000000', '#ffff00', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };
    frame();

    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function triggerSpecialAnimation(): void {
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

    setTimeout(() => {
        showModal();
    }, 500);
}

window.addEventListener('keydown', (e) => {
    inputSequence.push(e.key.toLowerCase());

    if (inputSequence.length > UNLOCK_CODE.length) {
        inputSequence.shift();
    }

    if (inputSequence.join('') === UNLOCK_CODE) {
        triggerSpecialAnimation();
        inputSequence.length = 0;
    }
});

console.log(
    '%c🚀 Portfolio loaded',
    'color: #00f0ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;'
);
console.log('%cBuilt with Vite + TypeScript + Tailwind CSS', 'color: #8892b0; font-size: 12px;');
