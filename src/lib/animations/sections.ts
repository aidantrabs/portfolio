import { gsap, ScrollTrigger, prefersReducedMotion } from '../gsap';

function splitChars(el: HTMLElement) {
    const text = el.textContent ?? '';
    el.textContent = '';
    const frag = document.createDocumentFragment();
    for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = ch === ' ' ? ' ' : ch;
        frag.appendChild(span);
    }
    el.appendChild(frag);
    return Array.from(el.querySelectorAll<HTMLElement>('.split-char'));
}

export function animateSections() {
    if (prefersReducedMotion) {
        for (const el of document.querySelectorAll<HTMLElement>('.fade-in-up-target')) {
            el.style.opacity = '1';
        }
        return;
    }

    for (const title of document.querySelectorAll<HTMLElement>('[data-section-title]')) {
        const chars = splitChars(title);
        gsap.from(chars, {
            yPercent: 110,
            opacity: 0,
            stagger: 0.025,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true,
            },
        });
    }

    for (const num of document.querySelectorAll<HTMLElement>('[data-section-num]')) {
        gsap.from(num, {
            opacity: 0,
            scale: 0.4,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: num,
                start: 'top 85%',
                once: true,
            },
        });
    }

    for (const el of document.querySelectorAll<HTMLElement>('.fade-in-up-target')) {
        gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true,
                },
            },
        );
    }

    for (const row of document.querySelectorAll<HTMLElement>('.project-row')) {
        gsap.fromTo(
            row,
            { opacity: 0, x: -16 },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 88%',
                    once: true,
                },
            },
        );
    }
}
