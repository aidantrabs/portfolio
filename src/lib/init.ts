import { runLoader } from './animations/loader';
import { animateHero } from './animations/hero';
import { animateSections } from './animations/sections';
import { animateCursor } from './animations/cursor';
import { animateScrollProgress } from './animations/scroll-progress';
import { animateNav } from './animations/nav';

async function boot() {
    animateCursor();
    animateScrollProgress();
    animateNav();
    animateSections();

    await runLoader();
    animateHero();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
