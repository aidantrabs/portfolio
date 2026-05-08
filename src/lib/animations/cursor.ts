import { gsap, prefersReducedMotion } from '../gsap';

export function animateCursor() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const ink = document.querySelector<HTMLElement>('[data-cursor-ink]');
    if (!ink) return;

    const xTo = gsap.quickTo(ink, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(ink, 'y', { duration: 0.45, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    const interactive = 'a, button, [data-cursor-hover]';
    document.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest(interactive)) ink.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest(interactive)) ink.classList.remove('is-hover');
    });
}
