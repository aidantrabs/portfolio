import { gsap, prefersReducedMotion } from '../gsap';

export function animateHero() {
    if (prefersReducedMotion) {
        gsap.set('[data-hero-name], [data-hero-tag], [data-hero-scroll]', {
            opacity: 1,
            y: 0,
        });
        return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from('[data-hero-name] .split-word', {
        yPercent: 105,
        opacity: 0,
        rotate: 4,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
    });

    tl.from(
        '[data-hero-shadow]',
        { opacity: 0, x: -10, y: -10, duration: 0.6 },
        '-=0.4',
    );

    tl.from(
        '[data-hero-tag]',
        { opacity: 0, y: 16, duration: 0.6 },
        '-=0.4',
    );

    tl.from(
        '[data-hero-scroll]',
        { opacity: 0, y: 12, duration: 0.5 },
        '-=0.3',
    );
}
