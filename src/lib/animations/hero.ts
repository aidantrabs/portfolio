import { gsap, prefersReducedMotion } from '../gsap';

export function animateHero() {
    if (prefersReducedMotion) {
        gsap.set('[data-hero-anim]', { opacity: 1, y: 0 });
        return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from('.hero__plate-tick', {
        opacity: 0,
        scale: 0,
        rotate: -45,
        duration: 0.5,
        stagger: 0.06,
        ease: 'back.out(2)',
    });

    tl.from(
        '.hero__plate::before, .hero__plate',
        { opacity: 0, duration: 0.4 },
        '-=0.4',
    );

    tl.from(
        '[data-hero-eyebrow]',
        { opacity: 0, y: -10, duration: 0.5 },
        '-=0.2',
    );

    tl.from(
        '[data-hero-name] .split-word',
        {
            yPercent: 105,
            opacity: 0,
            rotate: 4,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
        },
        '-=0.3',
    );

    tl.from(
        '[data-hero-shadow]',
        { opacity: 0, x: -8, y: -8, duration: 0.5 },
        '-=0.3',
    );

    tl.from(
        '[data-hero-tag]',
        { opacity: 0, y: 12, duration: 0.5 },
        '-=0.4',
    );

    tl.from(
        '[data-hero-hanko]',
        {
            opacity: 0,
            scale: 0.4,
            rotate: -25,
            duration: 0.55,
            ease: 'back.out(2.4)',
        },
        '-=0.4',
    );

    tl.from(
        '[data-hero-scroll]',
        { opacity: 0, y: 12, duration: 0.5 },
        '-=0.2',
    );
}
