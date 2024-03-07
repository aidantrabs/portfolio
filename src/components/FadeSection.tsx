import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type FadeSectionProps = {
    children: ReactNode;
}

const FadeSection: React.FC<FadeSectionProps> = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-in-out transform ${ inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            { children }
        </div>
    );
};

export { FadeSection };