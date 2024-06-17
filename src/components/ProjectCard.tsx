import React from 'react';
import { FaGithub, FaFolderOpen, FaServer } from "react-icons/fa";
import { FadeSection } from '@components';

interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    ghlink: string;
    link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies, ghlink, link }) => {
    return (
        <FadeSection>
            <div className="backdrop-blur-sm bg-white bg-opacity-5 rounded-lg overflow-hidden shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-gray-100"> 
                <div className="p-6">
                    <div className="flex justify-between mb-4">
                        <FaFolderOpen className="h-6 w-6 text-white" />
                        
                        <div className="flex space-x-2">
                            <a href={ghlink} target="_blank" rel="noreferrer">
                                <FaGithub className="h-5 w-5 text-white" />
                            </a>
                            <a href={link} target="_blank" rel="noreferrer">
                                <FaServer className="h-5 w-5 text-white" />
                            </a>
                        </div>
                    </div>

                    <h3 className="text-lg leading-6 font-medium text-white py-6">
                        {title}
                    </h3>
                    <hr className="w-1/2 border-accent-element border-2 mb-2"/>
                    <p className="text-base text-gray-300 mb-4">
                        {description}
                    </p>
                </div>

                <div className="px-4 py-6 bg-opacity-20">
                    {technologies.map((tech, index) => (
                        <span 
                            key={index} 
                            className="inline-block bg-opacity-30 bg-accent-element backdrop-blur-md rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2"
                        >
                            { tech }
                        </span>
                    ))}
                </div>
            </div>
        </FadeSection>
    );
};

export { ProjectCard };