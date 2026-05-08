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

const pullString = document.querySelector('.pull-string');
if (pullString) {
    pullString.addEventListener('click', () => {
        pullString.classList.add('pulling');
        const currentTheme: Theme = html.classList.contains('dark') ? 'dark' : 'light';
        const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setTimeout(() => pullString.classList.remove('pulling'), 350);
    });
}
