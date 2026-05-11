import { gsap, prefersReducedMotion } from '../gsap';

export function animateHero() {
    introHero();
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

