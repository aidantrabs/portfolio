import { gsap, prefersReducedMotion } from '../gsap';

export function animateHero() {
    introHero();
    if (prefersReducedMotion) return;
    bindHeroIdleFloat();
}

function introHero() {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from('[data-hero-topline]', {
        opacity: 0,
        y: 8,
        duration: 0.6,
        ease: 'power2.out',
    });

    tl.from(
        '.hero-scene__layer--front',
        {
            opacity: 0,
            y: 24,
            scale: 0.96,
            duration: 0.95,
            ease: 'power3.out',
        },
        '-=0.3',
    );

    tl.from(
        '[data-hero-tagline]',
        {
            opacity: 0,
            y: 14,
            duration: 0.7,
            ease: 'power3.out',
        },
        '-=0.55',
    );

    tl.from(
        '[data-hero-note]',
        { opacity: 0, x: 16, duration: 0.6, ease: 'power2.out' },
        '-=0.45',
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
        '-=0.55',
    );

    tl.from(
        '[data-hero-scroll]',
        { opacity: 0, x: 12, duration: 0.5 },
        '-=0.3',
    );
}

function bindHeroIdleFloat() {
    const scene = document.querySelector<HTMLElement>('[data-hero-scene]');
    if (!scene) return;

    const proxy = { y: 0 };
    gsap.to(proxy, {
        y: 1,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
            scene.style.setProperty('--float-y', `${(proxy.y - 0.5) * 14}px`);
        },
    });
}
