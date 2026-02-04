import './style.css';

document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = new Date().getFullYear().toString();
});

document.querySelectorAll<HTMLAnchorElement>('[data-scroll-to]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.scrollTo;
       
        if (targetId) {
            const target = document.getElementById(targetId);
            target?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-fade-in-up').forEach((el) => {
    observer.observe(el);
});
