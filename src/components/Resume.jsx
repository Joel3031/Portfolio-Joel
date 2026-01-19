import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

// --- REUSABLE 3D TILT CARD (Desktop Only) ---
const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

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
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm relative overflow-hidden h-full group hover:border-gold/30 transition-colors shadow-2xl flex flex-col justify-between">
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
                <div className="relative z-10 translate-z-10 h-full">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

// --- SIMPLE CARD (Mobile Only) ---
// A lightweight container without 3D effects to save space and performance
const SimpleCard = ({ children, className = "" }) => (
    <div className={`bg-white/5 border border-white/10 p-5 rounded-lg ${className}`}>
        {children}
    </div>
);

const ResumeTabs = () => {
    const [activeTab, setActiveTab] = useState('experience');

    const tabs = [
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' }
    ];

    return (
        <section
            // Removed min-h-[80vh] to fix blank space issue
            className="py-20 md:py-32 px-4 md:px-20 bg-midnight relative z-10 h-auto overflow-hidden"
        >
            <div className="max-w-5xl mx-auto perspective-1000 relative z-10">

                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                        Career <span className="text-gold">Chronicle</span>
                    </h2>

                    {/* TABS */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-16 border-b border-white/10 pb-4 relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-xs md:text-sm uppercase tracking-[0.2em] font-mono pb-4 relative transition-colors duration-300 ${activeTab === tab.id ? 'text-gold' : 'text-gray-500 hover:text-white'}`}
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

                {/* CONTENT AREA */}
                {/* Removed min-h-[400px] to allow height to shrink-wrap content */}
                <div className="h-auto">
                    <AnimatePresence mode="wait">

                        {/* --- EXPERIENCE & EDUCATION --- */}
                        {(activeTab === 'experience' || activeTab === 'education') && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 gap-6 md:gap-8"
                            >
                                {resumeData[activeTab].map((item) => (
                                    // Use SimpleCard on Mobile (hidden md:block) for performance? 
                                    // Actually TiltCard handles children well, we just adjust padding in CSS.
                                    <TiltCard key={item.id} className="w-full">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                            <h3 className="text-xl md:text-2xl text-white font-serif">{item.role}</h3>
                                            <span className="text-gold font-mono text-[10px] md:text-xs uppercase tracking-wider border border-gold/20 px-2 py-1 rounded-sm w-fit">
                                                {item.period}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs md:text-sm font-mono mb-4 uppercase tracking-wide flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gold rounded-full"></span>
                                            {item.company}
                                        </p>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.tech.map((t, i) => (
                                                <span key={i} className="px-2 py-1 bg-black/30 text-[10px] text-gray-400 font-mono rounded-full border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </TiltCard>
                                ))}
                            </motion.div>
                        )}

                        {/* --- SKILLS SECTION (RE-ENGINEERED FOR MOBILE) --- */}
                        {activeTab === 'skills' && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                {/* MOBILE LAYOUT: Compact List (No Scroll, No Cards) */}
                                <div className="flex flex-col gap-6 md:hidden">
                                    {resumeData.skills.map((group) => (
                                        <div key={group.category} className="border-l-2 border-white/10 pl-4">
                                            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-3">
                                                {group.category}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-2 py-1 bg-white/5 text-gray-300 text-[11px] rounded border border-white/5"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* DESKTOP LAYOUT: 3D Grid (Original Design) */}
                                <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                                    {resumeData.skills.map((group, index) => (
                                        <TiltCard
                                            key={group.category}
                                            className={index === 2 ? "md:col-span-2" : ""}
                                        >
                                            <h3 className="text-gold text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">
                                                {group.category}
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {group.items.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1.5 bg-white/5 text-gray-200 text-sm rounded-lg border border-white/5 shadow-lg flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_rgba(74,222,128,0.5)]"></span>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </TiltCard>
                                    ))}
                                </div>
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