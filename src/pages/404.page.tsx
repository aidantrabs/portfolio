import React from 'react';

const text = `
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
`;

const ArtFormat: React.FC<{ text: string }> = ({ text }) => {
    return (
        <pre className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-pre-wrap font-mono m-0 select-none">
            {text}
        </pre>
    );
}

const NotFound: React.FC = () => {
    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen">
            <ArtFormat text={text} />
            <h1 className="text-4xl font-bold text-white mb-4">
                Page Not Found
            </h1>
            <p className="text-xl font-semibold text-white">
                Are you supposed to be here? 🤔
            </p>
        </div>
    );
};

export { NotFound };


