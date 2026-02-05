import './style.css';

const THEME_KEY = 'theme';
const html = document.documentElement;

function getPreferredTheme(): 'dark' | 'light' {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
        return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme: 'dark' | 'light') {
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    localStorage.setItem(THEME_KEY, theme);
}

setTheme(getPreferredTheme());

const pullString = document.querySelector('.pull-string');
if (pullString) {
    pullString.addEventListener('click', () => {
        pullString.classList.add('pulling');

        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        setTimeout(() => {
            pullString.classList.remove('pulling');
        }, 350);
    });
}

document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = new Date().getFullYear().toString();
});

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const scrollBehavior = isMobile ? 'auto' : 'smooth';

document.querySelectorAll<HTMLAnchorElement>('[data-scroll-to]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.scrollTo;

        if (targetId) {
            const target = document.getElementById(targetId);
            target?.scrollIntoView({ behavior: scrollBehavior });
        }
    });
});

const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
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

document.fonts.ready.then(() => {
    document.body.classList.add('loaded');
});
