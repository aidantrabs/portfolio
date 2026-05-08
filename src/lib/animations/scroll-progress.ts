import { scroller } from '../gsap';

export function animateScrollProgress() {
    const fill = document.querySelector<HTMLElement>('[data-scroll-progress-fill]');
    const root = scroller;
    if (!fill || !root) return;

    let ticking = false;

    const update = () => {
        const max = root.scrollHeight - root.clientHeight;
        const progress = max > 0 ? root.scrollTop / max : 0;
        fill.style.height = `${progress * 100}%`;
        ticking = false;
    };

    root.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        },
        { passive: true },
    );
    window.addEventListener('resize', update);
    update();
}
