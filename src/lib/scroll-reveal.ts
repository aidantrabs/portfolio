export {};

const root = document.querySelector<HTMLElement>('.app-bounds');

const observerOptions: IntersectionObserverInit = {
    root,
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
};

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    }
}, observerOptions);

for (const el of document.querySelectorAll('.animate-fade-in-up')) {
    observer.observe(el);
}