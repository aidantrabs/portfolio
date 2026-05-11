import { prefersReducedMotion } from '../gsap';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    accent: boolean;
    pulsePhase: number;
}

interface CanvasState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    nodes: Node[];
    width: number;
    height: number;
    dpr: number;
    mouse: { x: number; y: number; active: boolean };
    rafId: number;
    running: boolean;
    paletteInk: string;
    paletteAccent: string;
    edgeColor: string;
}

const DRIFT = 0.18;
const REPULSE_RADIUS = 180;
const REPULSE_STRENGTH = 0.55;
const FRICTION = 0.985;

function readPalette(): { ink: string; accent: string; edge: string } {
    const root = getComputedStyle(document.documentElement);
    const ink = root.getPropertyValue('--ink').trim() || '#14110d';
    const accent =
        root.getPropertyValue('--accent-emphasis').trim() ||
        root.getPropertyValue('--vermillion').trim() ||
        '#d8442f';
    return { ink, accent, edge: hexToRgba(ink, 0.18) };
}

function hexToRgba(hex: string, alpha: number): string {
    const m = hex.trim().replace('#', '');
    if (m.length !== 6) return `rgba(20, 17, 13, ${alpha})`;
    const r = Number.parseInt(m.slice(0, 2), 16);
    const g = Number.parseInt(m.slice(2, 4), 16);
    const b = Number.parseInt(m.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function nodeCount(width: number): number {
    if (width < 640) return 6;
    if (width < 1024) return 12;
    if (width < 1600) return 18;
    return 22;
}

function makeNodes(count: number, width: number, height: number): Node[] {
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * DRIFT,
            vy: (Math.random() - 0.5) * DRIFT,
            size: 2.5 + Math.random() * 2.5,
            accent: Math.random() < 0.22,
            pulsePhase: Math.random() * Math.PI * 2,
        });
    }
    return nodes;
}

function sizeCanvas(state: CanvasState) {
    const rect = state.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.dpr = dpr;
    state.width = rect.width;
    state.height = rect.height;
    state.canvas.width = Math.floor(rect.width * dpr);
    state.canvas.height = Math.floor(rect.height * dpr);
    state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawFrame(state: CanvasState, time: number, drawEdges: boolean) {
    const { ctx, nodes, width, height, mouse } = state;
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= FRICTION;
        n.vy *= FRICTION;

        if (Math.abs(n.vx) < DRIFT * 0.5) n.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(n.vy) < DRIFT * 0.5) n.vy += (Math.random() - 0.5) * 0.02;

        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < REPULSE_RADIUS && dist > 0.1) {
                const force = (1 - dist / REPULSE_RADIUS) * REPULSE_STRENGTH;
                n.vx += (dx / dist) * force;
                n.vy += (dy / dist) * force;
            }
        }
    }

    if (drawEdges) {
        ctx.strokeStyle = state.edgeColor;
        ctx.lineWidth = 1;
        const proximity = 180;
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i]!;
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j]!;
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < proximity) {
                    const alpha = 1 - dist / proximity;
                    ctx.globalAlpha = alpha * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
    }

    for (const n of nodes) {
        const pulse = n.accent
            ? 0.85 + Math.sin(time * 0.002 + n.pulsePhase) * 0.25
            : 1;
        const size = n.size * pulse;

        ctx.fillStyle = n.accent ? state.paletteAccent : state.paletteInk;
        ctx.globalAlpha = n.accent ? 0.92 : 0.6;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-size, -size, size * 2, size * 2);
        ctx.restore();
    }

    ctx.globalAlpha = 1;
}

function paintSeed(state: CanvasState, drawEdges: boolean) {
    drawFrame(state, 0, drawEdges);
}

export function mountHeroCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette = readPalette();
    const state: CanvasState = {
        canvas,
        ctx,
        nodes: [],
        width: 0,
        height: 0,
        dpr: 1,
        mouse: { x: 0, y: 0, active: false },
        rafId: 0,
        running: false,
        paletteInk: palette.ink,
        paletteAccent: palette.accent,
        edgeColor: palette.edge,
    };

    sizeCanvas(state);
    const drawEdges = state.width >= 640;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    state.nodes = makeNodes(nodeCount(state.width), state.width, state.height);

    const tick = (time: number) => {
        if (!state.running) return;
        drawFrame(state, time, drawEdges);
        state.rafId = requestAnimationFrame(tick);
    };

    const start = () => {
        if (state.running) return;
        state.running = true;
        state.rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
        if (!state.running) return;
        state.running = false;
        cancelAnimationFrame(state.rafId);
    };

    if (prefersReducedMotion) {
        paintSeed(state, drawEdges);
        canvas.classList.add('is-ready');
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) start();
                else stop();
            }
        },
        { threshold: 0 },
    );
    io.observe(canvas);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (io.takeRecords().length === 0) start();
    });

    if (!isTouch) {
        canvas.parentElement?.addEventListener('pointermove', (event) => {
            const rect = canvas.getBoundingClientRect();
            state.mouse.x = event.clientX - rect.left;
            state.mouse.y = event.clientY - rect.top;
            state.mouse.active = true;
        });
        canvas.parentElement?.addEventListener('pointerleave', () => {
            state.mouse.active = false;
        });
    }

    let resizeRaf = 0;
    window.addEventListener('resize', () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
            sizeCanvas(state);
            state.nodes = makeNodes(
                nodeCount(state.width),
                state.width,
                state.height,
            );
        });
    });

    canvas.classList.add('is-ready');
}
