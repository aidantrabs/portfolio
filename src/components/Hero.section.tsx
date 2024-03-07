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
            <div className="flex flex-col items-center justify-center h-screen w-full text-center mt-[-4rem] md:mt-[-4rem]">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Hi I'm,
                </h1>
                <ArtFormat text={text} />
                <p className="text-2xl font-bold text-white mt-4">
                    (Aidan) <span role="img" aria-label="waving hand">👋</span>
                </p>
            </div>
        </FadeSection>
    );
};

export { HeroSection };