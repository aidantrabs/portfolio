import { scroller } from '../gsap';

export function animateNav() {
    const root = scroller;
    if (!root) return;

    const links = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('.site-nav__link'),
    );
    const sections = links
        .map((link) => {
            const id = link.getAttribute('href')?.replace('#', '');
            const el = id ? document.getElementById(id) : null;
            return el ? { link, el } : null;
        })
        .filter((x): x is { link: HTMLAnchorElement; el: HTMLElement } => x !== null);

    if (sections.length === 0) return;

    let ticking = false;
    const update = () => {
        const top = root.scrollTop + 140;
        let active = sections[0];
        for (const s of sections) {
            if (s.el.offsetTop <= top) active = s;
        }
        for (const s of sections) {
            s.link.classList.toggle('is-active', s === active);
        }
        ticking = false;
    };

    root.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        },
        { passive: true },
    );
    update();
}
