const Footer: React.FC = () => {
    return (
        <div className="flex justify-center items-center flex-col gap-4">
            <p className="text-sm opacity-70 text-white">
                © 2024 Aidan Traboulay. All rights reserved.
            </p>
            
            <footer className="flex justify-center gap-8">
                <a className="text-sm underline-offset-2 opacity-70 hover:underline text-white" 
                    href="https://aidantraboulay.dev/Resume.pdf"
                    target="_blank"
                    rel="noreferrer">
                    Résumé
                </a>
                <a className="text-sm underline-offset-2 opacity-70 hover:underline text-white" 
                    href="mailto:aidantraboulay@protonmail.com">
                    Email
                </a>
            </footer>
        </div>
    );
};

export { Footer };
