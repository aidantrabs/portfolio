import { FadeSection, AboutInfo, ActionButton } from '@components';
import { GoInfo, GoMortarBoard, GoLog, GoClock, GoCodeSquare, GoTools, GoGitPullRequest } from "react-icons/go";

const aboutInfo = [
    {
        Icon: GoMortarBoard,
        title: "Education",
        description: "I'm in my final year of my Honours BSc in Computer Science at Wilfrid Laurier University. Some of the notable courses I have taken are: data structures, algorithms, applied cryptography, theory of computation and intro to compilers.",
    },
    {
        Icon: GoTools,
        title: "Technologies",
        description: "Some of the programming languages I'm proficient at and work with are: C/C++, Rust, Golang, Typescript, Python, Java and more. I am always looking to learn new technologies and expand my skillset.",
    },
    {
        Icon: GoLog,
        title: "Certifications",
        description: "I have completed the Developing Cloud Applications with Node.js & React from IBM. I'm currently working on my Cybersecurity Professional Certificate from Google, as well as, the Azure Security Engineer Associate (AZ-500) from Microsoft and Security+ (601) from CompTIA.",
    },
    {
        Icon: GoClock,
        title: "6+ Years of Experience",
        description: "I have over 6 years of experience in software development, project management, and team leadership. I have worked on a variety of projects, by myself and with a team.",
    },
    {
        Icon: GoCodeSquare,
        title: "40+ Projects Completed",
        description: "I have completed over 40 projects, ranging from small personal projects to large scale applications, in the realm of web development, cybersecurity, machine learning and embedded systems.",
    },
    {
        Icon: GoGitPullRequest,
        title: "5+ Projects Managed",
        description: "I have managed over 5 projects with various teams, this includes version control management, code reviews, and ensuring the project is completed on time and within budget.",
    }
];

const actionInfo = {
    description: "Learn more!",
    link: "https://aidantraboulay.dev/Resume.pdf"
};

const AboutSection: React.FC = () => {
    return (
        <FadeSection>
            <section id="about-section" className="text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <div className="flex items-center text-3xl lg:text-4xl font-bold mb-3">
                            <GoInfo size={35} className="mr-3" />
                            <h1>About Me</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aboutInfo.map((info, index) => (
                            <AboutInfo key={index} {...info} />
                        ))}
                    </div>
                    <ActionButton {...actionInfo} />
                </div>
            </section>
        </FadeSection>
    );
};

export { AboutSection };