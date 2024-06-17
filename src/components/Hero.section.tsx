import React from 'react';
import { FadeSection } from '@components';

const text = `
█████╗ ██╗██████╗  █████╗ ███╗   ██╗
██╔══██╗██║██╔══██╗██╔══██╗████╗  ██║
███████║██║██║  ██║███████║██╔██╗ ██║
██╔══██║██║██║  ██║██╔══██║██║╚██╗██║
██║  ██║██║██████╔╝██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

const ArtFormat: React.FC<{ text: string }> = ({ text }) => {
    return (
        <pre className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-pre-wrap font-mono m-0 select-none">
            {text}
        </pre>
    );
}

const HeroSection: React.FC = () => {
    return (
        <FadeSection>
            <div className="flex flex-col items-center justify-center h-screen w-full text-center mt-[-4rem] md:mt-[-4rem]" id="top">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Hi I'm,
                </h1>
                <ArtFormat text={text} />
                <p className="text-2xl font-bold text-white mt-4">
                    (Aidan) <span role="img" aria-label="waving hand">👋</span>
                </p>
            </div>

            <div className="absolute bottom-32 right-0 p-4 text-right">
                <p className="text-white text-sm font-semibold lg:text-md 2xl:text-md">
                    Don't care to read the entire page? Check out my resume <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="text-accent-element">here</a>.
                </p>

                <p className="text-white text-sm font-semibold mt-2 lg:text-md 2xl:text-md">
                    Want to hire me? Get in touch <a href="mailto:aidantraboulay@protonmail.com" className="text-accent-element">here</a>.
                </p>
            </div>
        </FadeSection>
    );
};

export { HeroSection };