import { ProjectCard, ActionButton } from "@components";
import { GoFileDirectory } from "react-icons/go";

const ProjectSection: React.FC = () => {
    const githubUrl = 'https://github.com/aidantrabs';

    const projects = [
        {
            title: 'CRusty',
            description: 'A Rust-based lexer and parser to process a predefined set of grammar rules (EZ lang), offering precise syntax analysis and parsing, optimized for speed and reliability in interpreting structured language inputs.',
            technologies: ['Rust', 'Cargo'],
            ghlink: 'https://github.com/aidantrabs/CRusty',
            link: '',
        },
        {
            title: 'RTracer',
            description: 'A Rust-based raytracer that efficiently produces photorealistic images by leveraging algorithms for light interaction, support for diverse materials, and optimized speed and quality for 3D visualization.',
            technologies: ['Rust', 'Cargo'],
            ghlink: 'https://github.com/aidantrabs/RTracer',
            link: '',
        },
        {
            title: ' Rendezvous',
            description: 'A Python-based Discord bot which utilizes the Pycord library and the Ticketmaster API, fully hosted on Google Cloud\'s Compute Engine 24/7 which allows users to find and filter events worldwide, with ease.',
            technologies: ['Python', 'Discord.py', 'Google Cloud'],
            ghlink: 'https://github.com/aidantrabs/Rendezvous',
            link: '',
        },
        {
            title: 'Laurier Computing Society Website',
            description: 'The official website for the Laurier Computing Society (LCS) which serves as a hub for all computing students at Wilfrid Laurier University, providing information on events, resources, and opportunities.',
            technologies: ['Typescript', 'React.js', 'Mantine', 'Firebase'],
            ghlink: 'https://github.com/LaurierCS/Website',
            link: 'https://lauriercs.ca',
        },
        {
            title: 'HawkHacks Website',
            description: 'The official website for the HawkHacks hackathon, providing information on the event, registration, and sponsors, as well as a platform for participants to submit their projects and demos.',
            technologies: ['Typescript', 'React.js', 'Tailwind', 'Firebase'],
            ghlink: 'https://github.com/LaurierHawkHacks/Landing',
            link: 'https://hawkhacks.ca',
        },
        {
            title: 'HawkHacks Dashboard',
            description: 'The official hacker portal for the HawkHacks hackathon, providing participants with a platform to register, submit projects and view the slated intinerary, as well as, any resources for the days of the event.',
            technologies: ['Typescript', 'React.js', 'Tailwind', 'Firebase'],
            ghlink: 'https://github.com/HawkHacks/Dashboard',
            link: '',
        },
    ];
    
    return (
        <section id="project-section" className="p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <h1 className="relative flex col-span-full text-3xl lg:text-4xl font-bold leading-none text-white mb-6">
                        <GoFileDirectory size={35} className="mr-3"/> Projects
                    </h1>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            technologies={project.technologies}
                            ghlink={project.ghlink}
                            link={project.link}
                        />
                    ))}
                </div>
                <ActionButton
                    description="View More!"
                    link={githubUrl}
                />
            </div>
        </section>
    );
};

export { ProjectSection };