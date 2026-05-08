export {};

const bounds = document.querySelector<HTMLElement>('.app-bounds');
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const scrollBehavior: ScrollBehavior = isMobile ? 'auto' : 'smooth';

for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-scroll-to]')) {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.scrollTo;
        if (!targetId) return;

        if (targetId === 'top') {
            (bounds ?? window).scrollTo({ top: 0, behavior: scrollBehavior });
            return;
        }

        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    });
}