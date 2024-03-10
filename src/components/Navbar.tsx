import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { FaEnvelope, FaGithub, FaLinkedin, FaEdit } from "react-icons/fa"; 

const useScrollPosition = () => {
    const [scrollPos, setScrollPos] = useState(0);

    const handleScroll = () => {
        setScrollPos(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPos;
};

const Navbar: React.FC = () => {
    const scrollPos = useScrollPosition();

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrollPos > 0 ? 'bg-nav-bg shadow-lg' : 'bg-transparent'}`}>
            <div className="container flex items-center justify-between px-4 py-3 mx-auto">
                <div className="flex items-center justify-start">
                    <Link to="hero-section" smooth duration={500} className="text-2xl font-bold text-white">
                        Aidan Traboulay
                    </Link>

                    <div className="hidden lg:flex space-x-8 ml-10">
                        <Link to="about-section" smooth duration={500} offset={-100} className="text-white">
                            About
                        </Link>
                        <Link to="experience-section" smooth duration={500} offset={-100} className="text-white">
                            Experience
                        </Link>
                        <Link to="project-section" smooth duration={500} offset={-100} className="text-white">
                            Projects
                        </Link>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <a href="mailto:aidantraboulay@protonmail.com" className="text-white text-xl">
                        <FaEnvelope />
                    </a>
                    <a href="https://github.com/aidantrabs" className="text-white text-xl">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/aidan-traboulay" className="text-white text-xl">
                        <FaLinkedin />
                    </a>
                    <a href="/coming-soon" className="text-white text-xl">
                        <FaEdit />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export { Navbar };