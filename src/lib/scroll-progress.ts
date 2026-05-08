const thumb = document.querySelector<HTMLElement>('.app-shell__scroll-thumb');

if (thumb) {
    let ticking = false;

    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        thumb.style.top = `calc(${progress} * (100% - 4px))`;
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
}
