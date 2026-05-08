export interface Post {
    title: string;
    link: string;
    description: string;
    date: string;
}

const FEED_URL = 'https://blog.aidantraboulay.dev/feed.xml';

const FALLBACK: Post[] = [
    {
        title: 'visit the blog',
        link: 'https://blog.aidantraboulay.dev',
        description: 'recent posts available at blog.aidantraboulay.dev',
        date: '',
    },
];

function decodeEntities(input: string): string {
    return input
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

function extract(item: string, tag: string): string {
    const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
        `<${escaped}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${escaped}>`
    );
    const m = re.exec(item);
    if (!m) return '';
    return decodeEntities((m[1] ?? m[2] ?? '').trim());
}

export async function fetchRecentPosts(limit = 5): Promise<Post[]> {
    try {
        const res = await fetch(FEED_URL, {
            headers: { 'User-Agent': 'aidantraboulay.dev portfolio build' },
        });
        if (!res.ok) return FALLBACK;
        const xml = await res.text();
        const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
        const posts: Post[] = itemMatches
            .map((m) => m[1] ?? '')
            .slice(0, limit)
            .map((item) => ({
                title: extract(item, 'title'),
                link: extract(item, 'link'),
                description: extract(item, 'description'),
                date: extract(item, 'pubDate'),
            }))
            .filter((p) => p.title && p.link);
        return posts.length > 0 ? posts : FALLBACK;
    } catch {
        return FALLBACK;
    }
}

export function formatPostDate(raw: string): string {
    if (!raw) return '';
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
