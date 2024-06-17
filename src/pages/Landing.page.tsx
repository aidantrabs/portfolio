import { Navbar, Divider, AboutSection, ExperienceSection, Footer, HeroSection, ProjectSection, ScrollButton } from "@components";

const Landing = () => {
    return (
        <div className="relative z-20 h-auto overflow-x-hidden">
            <div className="relative h-auto w-full">
                <div className="dot-grid"></div>
                <Navbar />
                <div className="relative mx-auto flex max-w-full flex-col gap-16 overflow-hidden p-8 leading-relaxed max-md:mt-16 md:p-16">
                    <div className="flex flex-col gap-12">
                        <HeroSection />
                        <Divider />
                        <AboutSection />
                        <Divider />
                        <ExperienceSection />
                        <Divider />
                        <ProjectSection />
                        <Divider />
                        <div className="spacer" style={{ height: "2vh" }} />
                        <Footer />
                        <ScrollButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Landing };