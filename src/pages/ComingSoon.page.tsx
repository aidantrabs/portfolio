import React from 'react';
import { FadeSection } from '@components';

const ComingSoon: React.FC = () => {
    return (
        <FadeSection>
            <div className="flex justify-center items-center flex-col gap-4 h-screen">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Coming Soon...
                </h1>
                
                <p className="text-xl font-semibold text-white">
                    Stay tuned for updates! 🚀
                </p>
            </div>
        </FadeSection>
    );
};

export { ComingSoon };