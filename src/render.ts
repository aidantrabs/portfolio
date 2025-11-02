import type { Translation } from './i18n';

export function renderContent(content: Translation): void {
    setTextContent('[data-i18n="hero.badge"]', content.hero.badge);
    setTextContent('[data-i18n="hero.title"]', content.hero.title);
    setTextContent('[data-i18n="hero.titleAccent"]', content.hero.titleAccent);
    setTextContent('[data-i18n="hero.tagline"]', content.hero.tagline);

    setTextContent('[data-i18n="nav.about"]', content.nav.about);
    setTextContent('[data-i18n="nav.work"]', content.nav.work);
    setTextContent('[data-i18n="nav.skills"]', content.nav.skills);
    setTextContent('[data-i18n="nav.contact"]', content.nav.contact);

    setTextContent('[data-i18n="about.number"]', content.about.number);
    setTextContent('[data-i18n="about.title"]', content.about.title);
    setTextContent('[data-i18n="about.paragraph1"]', content.about.paragraph1);
    setTextContent('[data-i18n="about.paragraph2"]', content.about.paragraph2);
    setTextContent('[data-i18n="about.info.location.label"]', content.about.info.location.label);
    setTextContent('[data-i18n="about.info.location.value"]', content.about.info.location.value);
    setTextContent(
        '[data-i18n="about.info.experience.label"]',
        content.about.info.experience.label
    );
    setTextContent(
        '[data-i18n="about.info.experience.value"]',
        content.about.info.experience.value
    );
    setTextContent('[data-i18n="about.info.focus.label"]', content.about.info.focus.label);
    setTextContent('[data-i18n="about.info.focus.value"]', content.about.info.focus.value);

    setTextContent('[data-i18n="work.number"]', content.work.number);
    setTextContent('[data-i18n="work.title"]', content.work.title);

    const projectsContainer = document.getElementById('projects-container');

    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        content.work.projects.forEach((project, index) => {
            const article = document.createElement('article');
            article.className = `swiss-card p-8 md:p-12 ${
                project.theme === 'dark'
                    ? 'bg-swiss-black text-swiss-white'
                    : 'bg-swiss-white text-swiss-black'
            }`;

            // Determine badge color class
            const badgeColorClass =
                project.badgeColor === 'red'
                    ? 'text-swiss-red'
                    : project.badgeColor === 'blue'
                      ? 'text-swiss-accent'
                      : 'text-swiss-red';

            // Determine text color for description
            const descriptionColorClass =
                project.theme === 'dark' ? 'text-swiss-gray' : 'text-swiss-gray-dark';

            // Determine border color for tags
            const tagBorderClass =
                project.theme === 'dark' ? 'border-swiss-white' : 'border-swiss-black';

            // Determine link color class
            const linkColorClass = project.theme === 'dark' ? 'text-swiss-white' : '';

            // Determine button color class
            const buttonColorClass =
                project.theme === 'dark'
                    ? 'text-swiss-white hover:text-swiss-red'
                    : 'text-swiss-black hover:text-swiss-red';

            // Truncate description for mobile (150 characters)
            const maxLength = 150;
            const truncated =
                project.description.length > maxLength
                    ? project.description.substring(0, maxLength) + '...'
                    : project.description;
            const needsTruncation = project.description.length > maxLength;

            article.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div class="md:col-span-8">
                        <div class="text-sm uppercase tracking-widest mb-4 ${badgeColorClass}">
                            ${project.badge}
                        </div>
                        <h3 class="text-3xl md:text-5xl font-bold mb-4">
                            ${project.title}
                        </h3>
                        <div class="text-lg mb-6 ${descriptionColorClass}">
                            <p class="hidden md:block">
                                ${project.description}
                            </p>
                            <div class="md:hidden">
                                <p class="project-description-${index}">
                                    ${truncated}
                                </p>
                                ${
                                    needsTruncation
                                        ? `
                                    <button
                                        class="read-more-btn mt-2 text-sm font-bold uppercase tracking-wider ${buttonColorClass} transition-colors"
                                        data-project-index="${index}"
                                        data-expanded="false"
                                    >
                                        Read more ↓
                                    </button>
                                `
                                        : ''
                                }
                            </div>
                        </div>
                        <!-- Tags - Desktop: show all -->
                        <div class="hidden md:flex flex-wrap gap-4 mb-6">
                            ${project.tags
                                .map(
                                    (tag) =>
                                        `<span class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase brutalist-tag">${tag}</span>`
                                )
                                .join('')}
                        </div>
                        <!-- Tags - Mobile: show max 3 initially -->
                        <div class="flex md:hidden flex-wrap gap-4 mb-6 tags-container-${index}">
                            ${project.tags
                                .slice(0, 3)
                                .map(
                                    (tag) =>
                                        `<span class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase brutalist-tag">${tag}</span>`
                                )
                                .join('')}
                            ${project.tags.length > 3 ? `<button class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase opacity-50 hover:opacity-100 transition-opacity tags-toggle-${index} brutalist-tag" data-project-index="${index}">+${project.tags.length - 3}</button>` : ''}
                        </div>
                    </div>
                    <div class="md:col-span-4 flex items-end">
                        <div class="space-y-2 w-full">
                            <a href="${project.links.demo.url}" target="_blank" rel="noopener noreferrer" class="swiss-link block text-xl font-bold hover:text-swiss-red ${linkColorClass}">
                                ${project.links.demo.text} →
                            </a>
                            <a href="${project.links.github.url}" target="_blank" rel="noopener noreferrer" class="swiss-link block text-xl font-bold hover:text-swiss-red ${linkColorClass}">
                                ${project.links.github.text} →
                            </a>
                        </div>
                    </div>
                </div>
            `;

            projectsContainer.appendChild(article);

            // Add click handler for read more button if needed
            if (needsTruncation) {
                const readMoreBtn = article.querySelector(`[data-project-index="${index}"]`);
                const descriptionEl = article.querySelector(`.project-description-${index}`);

                if (readMoreBtn && descriptionEl) {
                    readMoreBtn.addEventListener('click', () => {
                        const isExpanded = readMoreBtn.getAttribute('data-expanded') === 'true';

                        if (isExpanded) {
                            descriptionEl.textContent = truncated;
                            readMoreBtn.textContent = 'Read more ↓';
                            readMoreBtn.setAttribute('data-expanded', 'false');
                        } else {
                            descriptionEl.textContent = project.description;
                            readMoreBtn.textContent = 'Read less ↑';
                            readMoreBtn.setAttribute('data-expanded', 'true');
                        }
                    });
                }
            }

            // Add click handler for tags toggle button if needed
            if (project.tags.length > 3) {
                const tagsContainer = article.querySelector(`.tags-container-${index}`);

                const handleTagsToggle = () => {
                    const tagsToggleBtn = tagsContainer?.querySelector(
                        `.tags-toggle-${index}`
                    ) as HTMLButtonElement;
                    if (!tagsToggleBtn || !tagsContainer) return;

                    const isExpanded = tagsToggleBtn.getAttribute('data-expanded') === 'true';

                    if (isExpanded) {
                        // Show only first 3 tags
                        tagsContainer.innerHTML = `
                            ${project.tags
                                .slice(0, 3)
                                .map(
                                    (tag) =>
                                        `<span class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase brutalist-tag">${tag}</span>`
                                )
                                .join('')}
                            <button class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase opacity-50 hover:opacity-100 transition-opacity tags-toggle-${index} brutalist-tag" data-project-index="${index}">+${project.tags.length - 3}</button>
                        `;

                        // Re-attach event listener
                        const newBtn = tagsContainer.querySelector(`.tags-toggle-${index}`);
                        newBtn?.addEventListener('click', handleTagsToggle);
                    } else {
                        // Show all tags
                        tagsContainer.innerHTML = `
                            ${project.tags
                                .map(
                                    (tag) =>
                                        `<span class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase brutalist-tag">${tag}</span>`
                                )
                                .join('')}
                            <button class="px-4 py-2 border-2 ${tagBorderClass} text-sm font-bold uppercase opacity-50 hover:opacity-100 transition-opacity tags-toggle-${index} brutalist-tag" data-project-index="${index}" data-expanded="true">Show less</button>
                        `;

                        // Re-attach event listener
                        const newBtn = tagsContainer.querySelector(`.tags-toggle-${index}`);
                        newBtn?.addEventListener('click', handleTagsToggle);
                    }
                };

                const tagsToggleBtn = article.querySelector(`.tags-toggle-${index}`);
                if (tagsToggleBtn && tagsContainer) {
                    tagsToggleBtn.addEventListener('click', handleTagsToggle);
                }
            }
        });
    }

    setTextContent('[data-i18n="skills.number"]', content.skills.number);
    setTextContent('[data-i18n="skills.title"]', content.skills.title);

    // Skills - dynamically create all skill categories
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        content.skills.categories.forEach((category) => {
            const div = document.createElement('div');
            div.className = 'space-y-4';

            // Determine icon color class
            const iconColorClass =
                category.color === 'red'
                    ? 'text-swiss-red'
                    : category.color === 'blue'
                      ? 'text-swiss-accent'
                      : 'text-swiss-black';

            div.innerHTML = `
                <div class="text-4xl font-bold ${iconColorClass} skill-icon">
                    ${category.icon}
                </div>
                <h3 class="text-2xl font-bold uppercase tracking-tight">
                    ${category.title}
                </h3>
                <ul class="space-y-2 text-swiss-gray-dark">
                    ${category.items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
            `;

            skillsContainer.appendChild(div);
        });
    }

    setTextContent('[data-i18n="contact.number"]', content.contact.number);
    setTextContent('[data-i18n="contact.title"]', content.contact.title);
    setTextContent('[data-i18n="contact.subtitle"]', content.contact.subtitle);

    // Contact Links - dynamically create all contact link sections
    const contactLinksContainer = document.getElementById('contact-links-container');
    if (contactLinksContainer) {
        contactLinksContainer.innerHTML = '';

        // Split links into two columns
        const midpoint = Math.ceil(content.contact.links.length / 2);
        const leftLinks = content.contact.links.slice(0, midpoint);
        const rightLinks = content.contact.links.slice(midpoint);

        // Create left column
        const leftColumn = document.createElement('div');
        leftColumn.className = 'space-y-6';
        leftLinks.forEach((link) => {
            const div = document.createElement('div');
            div.className = 'contact-border border-swiss-white pt-6';
            div.innerHTML = `
                <div class="text-sm uppercase tracking-widest mb-2 text-swiss-gray">
                    ${link.label}
                </div>
                <a href="${link.href}" target="_blank" rel="noopener" class="swiss-link text-2xl font-bold hover:text-swiss-red break-words">
                    <span>${link.value}</span>
                </a>
            `;
            leftColumn.appendChild(div);
        });
        contactLinksContainer.appendChild(leftColumn);

        // Create right column
        const rightColumn = document.createElement('div');
        rightColumn.className = 'space-y-6';
        rightLinks.forEach((link) => {
            const div = document.createElement('div');
            div.className = 'contact-border border-swiss-white pt-6';
            div.innerHTML = `
                <div class="text-sm uppercase tracking-widest mb-2 text-swiss-gray">
                    ${link.label}
                </div>
                <a href="${link.href}" target="_blank" rel="noopener" class="swiss-link text-2xl font-bold hover:text-swiss-red break-words">
                    <span>${link.value}</span>
                </a>
            `;
            rightColumn.appendChild(div);
        });
        contactLinksContainer.appendChild(rightColumn);
    }

    setTextContent('[data-i18n="footer.copyright"]', content.footer.copyright);
    setTextContent('[data-i18n="footer.tagline"]', content.footer.tagline);
}

function setTextContent(selector: string, text: string): void {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

function setAttribute(selector: string, attribute: string, value: string): void {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute(attribute, value);
    }
}
