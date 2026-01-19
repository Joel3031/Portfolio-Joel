import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// --- DUMMY CODE TEXT FOR BACKGROUND ---
// A mix of Java and React code to match your profile
const codeString = `
@Component
public class Developer implements FullStack {
    @Autowired
    private Skills skills;
    
    public void createMagic() {
        while(alive) {
            code();
            coffee();
            deploy();
        }
    }
}

// React Component
const Portfolio = () => {
    const [dream, setDream] = useState("Big");
    useEffect(() => {
        optimize(everything);
    }, []);
    return <Future />;
}

/* System Architecture */
docker run -d -p 8080:80 portfolio-app
git commit -m "Fixed the bug that wasn't a bug"
npm install universe
`.repeat(10); // Repeated to fill the screen

const resumeData = {
    experience: [
        {
            id: 1,
            role: "Software Developer",
            company: "Interland Technologies",
            period: "Aug 2023 - Present",
            description: "Full Stack Engineer dedicated to optimizing the entire web stack. From designing secure RESTful APIs to building modular React/Angular components, I focus on reducing bottlenecks.",
            tech: ["Java", "Angular", "React", "Spring Boot", "Docker", "CI/CD"]
        }
    ],
    education: [
        {
            id: 1,
            role: "B.Tech in Computer Science",
            company: "Sahrdaya College of Eng.",
            period: "2019 - 2023",
            description: "Graduated from APJ Abdul Kalam Technological University (KTU). Built a strong foundation in algorithms and system design.",
            tech: ["Computer Science", "Engineering"]
        },
        {
            id: 2,
            role: "High School (ISC)",
            company: "Christ Vidyanikethan",
            period: "Completed 2019",
            description: "Completed higher secondary education with a focus on Computer Science and Mathematics.",
            tech: ["Science", "Maths"]
        }
    ],
    skills: [
        {
            category: "Backend Arsenal",
            items: ["Java", "Spring Boot", "Next JS", "RESTful APIs", "Maven", "PostgreSQL", "Microservices"]
        },
        {
            category: "Frontend Magic",
            items: ["React", "Angular", "Astro", "JavaScript", "HTML5", "Tailwind CSS", "Figma"]
        },
        {
            category: "DevOps & Tools",
            items: ["Docker", "Git", "Jenkins", "CI/CD", "AWS Basics"]
        }
    ]
};

// --- REUSABLE 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const sheenY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm relative overflow-hidden h-full group hover:border-gold/30 transition-colors shadow-2xl">
                <motion.div
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%)",
                        left: sheenX,
                        top: sheenY,
                        x: "-50%",
                        y: "-50%"
                    }}
                    className="absolute w-[200%] h-[200%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                />
                <div className="relative z-10 translate-z-10">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

const ResumeTabs = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const tabs = [
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' }
    ];

    // --- MOUSE TRACKING FOR FLASHLIGHT EFFECT ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="py-32 px-6 md:px-20 bg-midnight relative z-10 min-h-[80vh] overflow-hidden group"
            onMouseMove={handleMouseMove}
        >

            {/* --- FLASHLIGHT CODE BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    className="w-full h-full text-[10px] md:text-xs font-mono text-gold/10 whitespace-pre-wrap break-all leading-relaxed opacity-50 select-none p-10"
                    style={{
                        // This creates the "hole" in the darkness
                        maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                        WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    }}
                >
                    {codeString}
                </motion.div>
            </div>


            <div className="max-w-5xl mx-auto perspective-1000 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
                        Career <span className="text-gold">Chronicle</span>
                    </h2>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-b border-white/10 pb-4 relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm uppercase tracking-[0.2em] font-mono pb-4 relative transition-colors duration-300 ${activeTab === tab.id ? 'text-gold' : 'text-gray-500 hover:text-white'}`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold shadow-[0_0_10px_#D4AF37]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {(activeTab === 'experience' || activeTab === 'education') && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, rotateX: -10, y: 50 }}
                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                exit={{ opacity: 0, rotateX: 10, y: -50 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 gap-8"
                            >
                                {resumeData[activeTab].map((item) => (
                                    <TiltCard key={item.id} className="w-full">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                            <h3 className="text-2xl text-white font-serif">{item.role}</h3>
                                            <span className="text-gold font-mono text-xs uppercase tracking-wider border border-gold/20 px-2 py-1 rounded-sm">
                                                {item.period}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm font-mono mb-4 uppercase tracking-wide flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gold rounded-full"></span>
                                            {item.company}
                                        </p>
                                        <p className="text-gray-300 leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1 bg-black/30 text-[10px] text-gray-400 font-mono rounded-full border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </TiltCard>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'skills' && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {resumeData.skills.map((group, index) => (
                                    <TiltCard key={group.category} className={index === 2 ? "md:col-span-2" : ""}>
                                        <h3 className="text-gold text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">
                                            {group.category}
                                        </h3>

                                        <div className="flex flex-wrap gap-3">
                                            {group.items.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-4 py-2 bg-white/5 text-gray-200 text-sm rounded-lg border border-white/5 shadow-lg flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_rgba(74,222,128,0.5)]"></span>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </TiltCard>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .translate-z-10 { transform: translateZ(20px); }
            `}</style>
        </section>
    );
};

export default ResumeTabs;