import { AboutSection, ExperienceSection, Footer, HeroSection, ProjectSection } from "@components";

const Landing = () => {
    return (
        <div className="relative z-20 h-auto overflow-x-hidden">
            <div className="relative h-auto w-full">
                <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-16 overflow-hidden p-8 leading-relaxed max-md:mt-16 md:p-16">
                    <div className="flex flex-col gap-12">
                        <HeroSection />
                        <p className="max-w-full overflow-hidden whitespace-nowrap text-accent-element">
                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                        </p>
                        <AboutSection />
                        <p className="max-w-full overflow-hidden whitespace-nowrap text-accent-element">
                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                        </p>
                        <ExperienceSection />
                        <p className="max-w-full overflow-hidden whitespace-nowrap text-accent-element">
                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                        </p>
                        <ProjectSection />
                        <p className="max-w-full overflow-hidden whitespace-nowrap text-accent-element">
                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                        </p>
                        <div className="spacer" style={{ height: "2vh" }} />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Landing };