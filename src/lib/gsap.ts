import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
).matches;

export const scroller = document.querySelector<HTMLElement>('.app-bounds');

if (scroller) {
    ScrollTrigger.defaults({ scroller });
}

gsap.defaults({
    ease: 'power3.out',
    duration: 0.9,
});

export { gsap, ScrollTrigger };
