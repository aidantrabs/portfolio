interface AboutInfoProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: any;
    title: string;
    description: string;
}

const AboutInfo: React.FC<AboutInfoProps> = ({ Icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center border backdrop-blur-sm bg-white bg-opacity-5 border-white p-6 rounded-lg transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105">
            <Icon size={35} className="mb-3"/>
            <h2 className="text-xl font-bold mb-2">{ title }</h2>
            <hr className="w-1/2 border-accent-element border-2 mb-2"/>
            <p>
                { description }
            </p>
        </div>
    );
};

export { AboutInfo };