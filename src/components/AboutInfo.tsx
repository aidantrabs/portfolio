interface AboutInfoProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: any;
    title: string;
    description: string;
}

const AboutInfo: React.FC<AboutInfoProps> = ({ Icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center">
            <Icon size={35} className="mb-3"/>
            <h2 className="text-xl font-bold mb-2">{ title }</h2>
            <p>
                { description }
            </p>
        </div>
    );
};

export { AboutInfo };