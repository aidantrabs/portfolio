export default {
    hero: {
        badge: 'Aidan Traboulay',
        title: 'Developer',
        titleAccent: '& Monkey',
        tagline: 'I like building things.',
    },
    nav: {
        about: '01 — About',
        work: '02 — Work',
        skills: '03 — Skills',
        contact: '04 — Contact',
    },
    about: {
        number: '01',
        title: 'About',
        paragraph1:
            "I'm a full-stack engineer driven by curiosity and a love for tackling complex challenges. I thrive on transforming ambitious ideas into high-impact digital experiences—combining precision engineering with thoughtful design.",
        paragraph2:
            'Whether architecting scalable systems in Go or crafting intuitive frontends in React, I approach every project as an opportunity to push boundaries and learn something new. I believe great software blends creativity, technical rigor, and the courage to take on what others consider difficult.',
        info: {
            location: {
                label: 'Location',
                value: 'Canada',
            },
            experience: {
                label: 'Experience',
                value: '5+ Years',
            },
            focus: {
                label: 'Focus',
                value: 'Project Management, Infrastructure & Full-Stack',
            },
        },
    },
    work: {
        number: '02',
        title: 'Selected Work',
        projects: [
            {
                badge: 'Featured Project',
                badgeColor: 'red',
                title: 'Konfer Landing',
                description:
                    'Konfer is a full-scale product and software development powerhouse that also delivers strategic event solutions. Our in-house engineering team creates full-stack websites, web apps, and custom software solutions for clients needing technical expertise. We deliver end-to-end solutions using modern frameworks and best practices. We also create engaging community experiences through yacht parties, case competitions, hackathons, and workshops. Our technical precision and creative strategy combine with expertise in event planning, partnerships, marketing, operations, and audience engagement to deliver impactful results.',
                tags: ['TypeScript', 'React', 'TailwindCSS', 'Firebase'],
                links: {
                    demo: { text: 'View Project', url: 'https://konfer.ca' },
                    github: { text: 'GitHub', url: 'https://github.com/KonferCA/Konfer' },
                },
                theme: 'light',
            },
            {
                badge: 'Development',
                badgeColor: 'blue',
                title: 'SPUR Capital Landing',
                description:
                    "SPUR Capital's landing page showcases our innovative investment platform designed for sophisticated investors seeking opportunities in the tech startup ecosystem. The site features a clean, professional design that highlights our investment thesis, portfolio companies, and track record of success. With an emphasis on transparency and data-driven decision making, the platform provides detailed insights into our investment strategy, deal flow, and due diligence process. Investors can easily access comprehensive information about our fund performance, investment criteria, and upcoming opportunities. The site also includes a secure portal for accredited investors to review confidential deal information and express interest in specific opportunities.",
                tags: ['Next.js', 'TailwindCSS', 'Vercel'],
                links: {
                    demo: { text: 'View Project', url: 'https://capital.spuric.com/' },
                    github: { text: 'GitHub', url: 'https://github.com/KonferCA/SPUR-Capital/' },
                },
                theme: 'dark',
            },
            {
                badge: 'Real-time Platform',
                badgeColor: 'red',
                title: 'SPUR Onboard',
                description:
                    'SPUR aims to build a comprehensive marketplace platform where tech startup founders can access funding, crowdfunding opportunities, talent recruitment, office space solutions, and additional support - all in one place. Through "Onboard", users can create a company, obtain SPUR\'s approval, and secure funding directly without intermediaries. Companies can also request engineering talent, mentorship, consulting services, financial support, investments, data center resources, event venues, and office spaces.',
                tags: [
                    'Typescript',
                    'React',
                    'TailwindCSS',
                    'HeadlessUI',
                    'Golang w/ Echo',
                    'PostgreSQL 16 (Docker Compose)',
                    'Ubuntu Server 24.04 LTS',
                    'Nginx',
                    'Cloudflare CDN',
                ],
                links: {
                    demo: { text: 'View Project', url: 'https://onboard.spuric.com/' },
                    github: { text: 'GitHub', url: 'https://github.com/KonferCA/SPUR-Onboard' },
                },
                theme: 'light',
            },
            {
                badge: 'Real-time Platform',
                badgeColor: 'red',
                title: 'HawkHacks Landing',
                description:
                    "We developed a modern, responsive website for this initiative that effectively communicates the event's mission while attracting significant recognition and sponsorships. The site features an intuitive user interface, a seamless registration flow, and a dynamic content management system. The landing page drove impressive engagement for HawkHacks 2024, attracting nearly 850 attendees and securing partnerships with over 30 sponsors, allowing us over $180,000 in prizes.",
                tags: ['React.js', 'TailwindCSS', 'CVA', 'Firebase'],
                links: {
                    demo: { text: 'View Project', url: 'https://hawkhacks.ca' },
                    github: {
                        text: 'GitHub',
                        url: 'https://github.com/KonferCA/HawkHacks-Landing',
                    },
                },
                theme: 'dark',
            },
            {
                badge: 'Real-time Platform',
                badgeColor: 'red',
                title: 'SpurHacks Landing',
                description:
                    "We designed and developed the SpurHacks landing page for Canada's largest student hackathon, hosted at SPUR Campus in Waterloo. The site highlights SpurHacks' mission to inspire innovation and collaboration among over 2,000 participants nationwide. With clear event details, interactive sections, and a modern aesthetic, the landing page captures the energy of the event while driving engagement, signups, and sponsorship opportunities.",
                tags: ['React.js', 'TailwindCSS', 'Vercel'],
                links: {
                    demo: { text: 'View Project', url: 'https://spurhacks.com' },
                    github: { text: 'GitHub', url: 'http://github.com/KonferCA/spurhacks' },
                },
                theme: 'light',
            },
        ],
    },
    skills: {
        number: '03',
        title: 'Skills & Expertise',
        categories: [
            {
                icon: '/',
                title: 'Frontend',
                items: [
                    'TypeScript',
                    'JavaScript',
                    'React.js',
                    'Next.js',
                    'TailwindCSS',
                    'HeadlessUI',
                ],
                color: 'red',
            },
            {
                icon: '*',
                title: 'Backend',
                items: ['Go', 'Rust', 'C/C++', 'Python', 'PHP', 'Node.js', 'Laravel'],
                color: 'blue',
            },
            {
                icon: '+',
                title: 'Database',
                items: ['PostgreSQL', 'MongoDB', 'Firebase'],
                color: 'black',
            },
            {
                icon: '×',
                title: 'DevOps & Cloud',
                items: ['Docker', 'Nginx', 'CI/CD', 'AWS', 'Git', 'GCP', 'Cloudflare CDN'],
                color: 'red',
            },
        ],
    },
    contact: {
        number: '04',
        title: "Let's Work Together",
        subtitle: "I'm always interested in hearing about new projects and opportunities.",
        links: [
            {
                label: 'Email',
                value: 'aidantraboulay@protonmail.com',
                href: 'mailto:aidantraboulay@protonmail.com',
            },
            {
                label: 'GitHub',
                value: '@aidantrabs',
                href: 'https://github.com/aidantrabs',
            },
            {
                label: 'LinkedIn',
                value: '/in/aidan-traboulay',
                href: 'https://linkedin.com/in/aidan-traboulay',
            },
            {
                label: 'Devpost',
                value: '@aidantrabs',
                href: 'https://devpost.com/aidantrabs',
            },
        ],
    },
    footer: {
        copyright: '© 2025 Aidan Traboulay',
        tagline: 'Made with ♥ by Aidan',
    },
};
