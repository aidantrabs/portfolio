export {};

const track = document.querySelector<HTMLElement>('[data-marquee-track]');
const toggle = document.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
const timeEl = document.querySelector<HTMLElement>('[data-marquee-time]');

if (track && toggle) {
    toggle.addEventListener('click', () => {
        const paused = track.classList.toggle('is-paused');
        toggle.classList.toggle('is-paused', paused);
        toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
        toggle.setAttribute('aria-label', paused ? 'Play marquee' : 'Pause marquee');
    });
}

if (timeEl) {
    const start = performance.now();

    const pad = (n: number) => String(n).padStart(2, '0');

    const update = () => {
        const elapsed = Math.floor((performance.now() - start) / 1000);
        const hours = Math.floor(elapsed / 3600) % 24;
        const minutes = Math.floor(elapsed / 60) % 60;
        const seconds = elapsed % 60;
        timeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    update();
    setInterval(update, 1000);
}