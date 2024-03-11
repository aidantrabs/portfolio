import React from 'react';
import { FadeSection } from '@components';

interface ActionButtonProps {
    description: string;
    link: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ description, link }) => {
    return (
        <FadeSection>
            <div className="flex justify-center mt-8">
                <button 
                    className="backdrop-blur-sm bg-white bg-opacity-5 rounded-lg overflow-hidden shadow-lg border border-gray-100 px-6 py-3 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                    onClick={() => window.open(link, '_blank noopener noreferrer')}
                >
                    <span className="text-sm font-semibold text-white">{ description }</span>
                </button>
            </div>
        </FadeSection>
    );
};

export { ActionButton };