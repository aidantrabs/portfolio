import React, { useState, useEffect } from 'react';
import { FadeSection } from '@components';
import { GoPerson } from "react-icons/go";

interface ExperienceDetail {
    title: string;
    date: string;
    details: string[];
}

interface ExperienceData {
    [key: string]: ExperienceDetail; 
}
  
const experienceData: ExperienceData = {
    Wilfrid00Laurier00University: {
        title: 'Research Assistant @ Wilfrid Laurier University',
        date: 'November 2023 - PRESENT',
        details: [
            'Collaborated closely with a professor and two peers on a government-commissioned project, aiming to enhance air quality analysis across Ontario for the National Pollutant Release Inventory (NPRI).',
            'Integrated multiple data sources including OpenAQ API, Google Earth Engine, and Sentinel satellite imagery to create a comprehensive dataset for model training and analysis.',
            'Utilized Geopandas for geospatial data manipulation and conducted exploratory data analysis to inform model development and ensure accurate environmental trend representation.',
            'Enhanced predictive accuracy by incorporating remote sensing data, addressing gaps in ground-level monitoring networks across targeted regions.',
            'Conducted a detailed comparative study, demonstrating the ensemble model\'s efficacy in predicting pollutant distribution versus traditional NPRI methods.',
        ]
    },

    Laurier00Computing00Society: {
        title: 'Vice President of Development & Technology @ Laurier Computing Society',
        date: 'January 2022 - PRESENT',
        details: [
            'Oversaw an agile development team comprising 11 diverse members, orchestrating numerous events and initiatives that engaged and benefited over 4000 students, enhancing the educational and community experience within the student body.',
            'Directed three successful iterations of the PODS Program, a semester-long initiative that provided structured mentorship and resources for 25 students across 5 teams, empowering them to conceptualize, develop, and launch impactful projects using agile practices and contemporary technologies.',
            'Led the complete lifecycle of a month-long hackathon event, from strategic planning to execution, providing mentorship to over 400 participants and fostering a collaborative environment in alliance with the Computer Science and Data Science clubs at the University of Waterloo.',
            'Strategically coordinated and led review sessions for various computer science courses, enhancing academic support and fostering a culture of peer-assisted learning among the student community.',
            'Managed a dedicated web development team in deploying React, Mantine, and TypeScript to build and refine a robust website, centralizing event communications and fostering an interactive community platform.',            
            'Orchestrated a competitive programming event reminiscent of LeetCode challenges, managing a team to design and implement a range of problems that honed students\' coding skills and algorithmic thinking.',
        ]
    },

    HawkHacks: {
        title: 'Vice President of Engineering @ HawkHacks',
        date: 'September 2022 - PRESENT',
        details: [
            'Managed an agile development team of over 15 members, successfully orchestrating a hackathon that attracted over 750 participants in its first year.',
            'Developed an official Major League Hacking approved website for the hackathon using React.js and Firebase, doubling interest in the event.',
            'Created a user-friendly portal for participants to sign up, log in, and access relevant information about their application and continuous updates during the event days.',
            'Integrated the participant portal with Apple Wallet and Google Wallet apps, enhancing the convenience and accessibility for attendees.',
            'Leveraged React.js and Firebase to build a highly effective website for the hackathon, contributing to its official approval by Major League Hacking and a significant increase in interest.',
        ],
    },

    Guardian00Group: {
        title: 'Analyst Programmer @ Guardian Group',
        date: 'May 2021 - August 2021',
        details: [
            'Implemented reCAPTCHA in React.js forms using hooks, significantly reducing bot spam by 95% and enhancing site security.',
            'Led the integration of reCAPTCHA, leveraging React.js hooks to effectively combat bot spam and improve security measures.',
            'Utilized Azure DevOps boards for task and issue tracking, adopting Agile and Scrum methodologies to boost team collaboration and workflow efficiency.',
            'Facilitated the adoption of Agile and Scrum methodologies through Azure DevOps, leading to improved team collaboration and streamlined workflows.',
            'Achieved a substantial reduction in bot spam and enhanced site security by leading the implementation of reCAPTCHA in React.js forms.',
        ],
    },

    WiPay00Caribbean: {
        title: 'Software Engineer @ WiPay Caribbean',
        date: 'Februrary 2020 - May 2020',
        details: [
            'Developed an experimental Android application for the WiPay platform, resulting in a 75% increase in platform interest.',
            'Redesigned and refactored the internal admin panel codebase using Laravel, MySQL, and Apache, significantly enhancing usability.',
            'Enhanced the performance and security of a Laravel-based RESTful API for credit card payment processing, leading to improved user experience and transaction efficiency.',
            'Improved the functionality and security of the WiPay platform\'s Android application, attracting more users and increasing overall interest in the platform.',
            'ptimized a Laravel-based RESTful API for credit card payments, achieving better performance and security, which in turn enhanced user experience and transaction efficiency.',
        ],
    },
};

const ExperienceSection: React.FC = () => {
    const [selectedExperience, setSelectedExperience] = useState(Object.keys(experienceData)[0]);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(false);
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 10); 
        return () => clearTimeout(timer);
    }, [selectedExperience]);
    
    const selectedExperienceData = experienceData[selectedExperience];

    if (!selectedExperienceData) {
        console.error(`Selected experience '${selectedExperience}' is not defined in the data.`);
        return null; 
    }

    return (
        <FadeSection>
            <section id="experience-section" className="p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="relative flex text-3xl lg:text-4xl font-bold leading-none text-white mb-6">
                        <GoPerson size={35} className="mr-3"/> Experience
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                        <div className="flex flex-col lg:col-span-1 space-y-2">
                            {Object.keys(experienceData).map((companyKey) => (
                                <button
                                    key={companyKey}
                                    onClick={() => setSelectedExperience(companyKey)}
                                    className={`backdrop-blur-sm bg-white bg-opacity-5 py-2 px-4 text-left w-full text-white transition duration-150 ease-in-out ${
                                        selectedExperience === companyKey
                                            ? 'border border-gray-100 shadow-lg rounded-lg'
                                            : 'hover:border hover:border-gray-100 hover:shadow-md rounded-lg'
                                    }`}
                                >
                                    {companyKey.replace(/00/g, ' ')}
                                </button>
                            ))}
                        </div>

                        <div className={`lg:col-span-3 p-1`}>
                            <div className="space-y-4 text-white">
                                <h3 className="text-2xl font-bold">
                                    {experienceData[selectedExperience].title}
                                </h3>
                                <p className="">
                                    {experienceData[selectedExperience].date}
                                </p>
                                {experienceData[selectedExperience].details.map((detail, index) => (
                                    <div key={index} className={`flex items-center ${animate ? 'fade-in-right' : ''}`}>
                                        <span className="text-white">‣</span>
                                        <p className="ml-2">{detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FadeSection>
    );
};

export { ExperienceSection };