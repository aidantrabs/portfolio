export {};

const bounds = document.querySelector<HTMLElement>('.app-bounds');
const thumb = document.querySelector<HTMLElement>('[data-scroll-thumb]');
const track = document.querySelector<HTMLElement>('.outer-frame__scrollbar');

if (bounds && thumb && track) {
    let ticking = false;

    const update = () => {
        const max = bounds.scrollHeight - bounds.clientHeight;
        const progress = max > 0 ? bounds.scrollTop / max : 0;
        const trackHeight = track.clientHeight;
        const thumbHeight = thumb.offsetHeight;
        const range = trackHeight - thumbHeight;
        thumb.style.top = `${progress * range}px`;
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    };

    bounds.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
}