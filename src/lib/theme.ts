export {};

const THEME_KEY = 'theme';
const html = document.documentElement;

type Theme = 'dark' | 'light';

function getPreferredTheme(): Theme {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme: Theme) {
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
}

setTheme(getPreferredTheme());

const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
if (toggle) {
    toggle.addEventListener('click', () => {
        const current: Theme = html.classList.contains('dark') ? 'dark' : 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}
