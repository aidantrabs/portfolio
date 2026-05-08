const indicator = document.querySelector<HTMLElement>('.loading-indicator');
const counter = document.querySelector<HTMLElement>('.loading-indicator__count');
const fill = document.querySelector<HTMLElement>('.loading-indicator__bar-fill');

if (indicator && counter && fill) {
    const start = performance.now();
    const fakeDuration = 700;
    let resolved = false;
    let pct = 0;

    document.fonts.ready.then(() => {
        resolved = true;
    });

    if (document.readyState === 'complete') {
        resolved = true;
    } else {
        window.addEventListener('load', () => {
            resolved = true;
        });
    }

    const tick = () => {
        const elapsed = performance.now() - start;
        const fakeProgress = Math.min(elapsed / fakeDuration, 1);
        const ceiling =
            resolved && elapsed >= fakeDuration ? 100 : Math.floor(fakeProgress * 94);

        if (ceiling > pct) pct = ceiling;

        counter.textContent = String(pct).padStart(3, '0');
        fill.style.width = `${pct}%`;

        if (pct < 100) {
            requestAnimationFrame(tick);
        } else {
            indicator.classList.add('is-done');
            const cleanup = () => indicator.remove();
            indicator.addEventListener('transitionend', cleanup, { once: true });
            setTimeout(cleanup, 1200);
        }
    };

    requestAnimationFrame(tick);
} else if (indicator) {
    indicator.remove();
}
