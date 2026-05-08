import { gsap } from '../gsap';

export function runLoader() {
    const indicator = document.querySelector<HTMLElement>('.loading-indicator');
    if (!indicator) return Promise.resolve();

    return new Promise<void>((resolve) => {
        const start = performance.now();
        const minDuration = 800;

        const finish = () => {
            const elapsed = performance.now() - start;
            const wait = Math.max(0, minDuration - elapsed);
            window.setTimeout(() => {
                indicator.classList.add('is-done');
                window.setTimeout(() => {
                    indicator.remove();
                    resolve();
                }, 1200);
            }, wait);
        };

        const ready = () => {
            if (document.readyState === 'complete') {
                document.fonts.ready.then(finish).catch(finish);
            } else {
                window.addEventListener('load', () => {
                    document.fonts.ready.then(finish).catch(finish);
                });
            }
        };

        ready();

        gsap.fromTo(
            '.loading-indicator__brand',
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        );
        gsap.fromTo(
            '.loading-indicator__hanko',
            { opacity: 0, scale: 0.4, rotate: -25 },
            {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.5,
                delay: 0.25,
                ease: 'back.out(2)',
            },
        );
    });
}
