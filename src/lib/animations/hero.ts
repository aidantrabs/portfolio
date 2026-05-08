import { gsap, prefersReducedMotion } from '../gsap';

const PARALLAX = 80;
const TILT_X = 16;
const TILT_Y = 24;
const LERP = 0.08;

export function animateHero() {
    introHero();
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    bindHero3D();
}

function introHero() {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from('.hero__topbar', {
        opacity: 0,
        y: -8,
        duration: 0.5,
    });

    tl.from(
        '.hero-scene__layer--back',
        { opacity: 0, scale: 0.92, duration: 1.0, ease: 'power3.out' },
        '-=0.2',
    );
    tl.from(
        '.hero-scene__layer--mid',
        { opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out' },
        '-=0.85',
    );
    tl.from(
        '.hero-scene__layer--front',
        {
            opacity: 0,
            scale: 0.96,
            rotateX: -18,
            duration: 0.95,
            ease: 'power3.out',
        },
        '-=0.75',
    );

    tl.from(
        '.hero-scene__hint',
        { opacity: 0, y: 10, duration: 0.5 },
        '-=0.3',
    );

    tl.from(
        '[data-hero-bottombar] .hero__data',
        {
            opacity: 0,
            y: 14,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
        },
        '-=0.5',
    );

    tl.from(
        '[data-hero-scroll]',
        { opacity: 0, x: 12, duration: 0.5 },
        '-=0.3',
    );
}

function bindHero3D() {
    const scene = document.querySelector<HTMLElement>('[data-hero-scene]');
    if (!scene) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let pressed = 0;
    let targetPressed = 0;
    let active = false;
    let raf = 0;

    const setVars = () => {
        scene.style.setProperty('--px', `${currentX * PARALLAX}px`);
        scene.style.setProperty('--py', `${currentY * PARALLAX * 0.6}px`);
        scene.style.setProperty('--ry', `${currentX * TILT_Y}deg`);
        scene.style.setProperty('--rx', `${-currentY * TILT_X}deg`);
        scene.style.setProperty('--pressed', `${pressed}`);
    };

    const tick = () => {
        currentX += (targetX - currentX) * LERP;
        currentY += (targetY - currentY) * LERP;
        pressed += (targetPressed - pressed) * 0.18;
        setVars();

        const stillMoving =
            Math.abs(targetX - currentX) > 0.001 ||
            Math.abs(targetY - currentY) > 0.001 ||
            Math.abs(targetPressed - pressed) > 0.001;

        if (stillMoving) {
            raf = requestAnimationFrame(tick);
        } else {
            raf = 0;
        }
    };

    const ensureRaf = () => {
        if (!raf) raf = requestAnimationFrame(tick);
    };

    scene.addEventListener('mouseenter', () => {
        active = true;
        scene.classList.add('is-active');
    });

    scene.addEventListener('mouseleave', () => {
        active = false;
        scene.classList.remove('is-active');
        targetX = 0;
        targetY = 0;
        targetPressed = 0;
        ensureRaf();
    });

    scene.addEventListener('mousemove', (e) => {
        if (!active) {
            active = true;
            scene.classList.add('is-active');
        }
        const rect = scene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        targetX = (x - 0.5) * 2;
        targetY = (y - 0.5) * 2;
        ensureRaf();
    });

    scene.addEventListener('mousedown', () => {
        targetPressed = 1;
        ensureRaf();
    });

    const release = () => {
        targetPressed = 0;
        ensureRaf();
    };

    scene.addEventListener('mouseup', release);
    scene.addEventListener('mouseleave', release);
    window.addEventListener('blur', release);
}
