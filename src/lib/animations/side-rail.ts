import { gsap, prefersReducedMotion } from '../gsap';

export function animateSideRail() {
    if (prefersReducedMotion) return;

    const track = document.querySelector<HTMLElement>('[data-side-rail-track]');
    if (!track) return;

    const half = track.scrollHeight / 2;
    if (half <= 0) return;

    gsap.set(track, { y: 0 });
    gsap.to(track, {
        y: -half,
        duration: 60,
        ease: 'none',
        repeat: -1,
    });
}
