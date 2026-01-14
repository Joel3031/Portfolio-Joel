import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const resumeData = {
    experience: [
        {
            id: 1,
            role: "Software Developer",
            company: "Interland Technologies",
            period: "Aug 2023 - Present",
            description: "Specializing in backend development using Java and Spring Boot. Designing scalable, high-performance applications and integrating RESTful APIs.",
            tech: ["Java", "Spring Boot", "Docker", "CI/CD", "Agile"]
        }
    ],
    education: [
        {
            id: 1,
            role: "B.Tech in Computer Science",
            company: "Sahrdaya College of Engineering",
            period: "2019 - 2023",
            description: "Graduated from APJ Abdul Kalam Technological University (KTU). Built a strong foundation in algorithms, data structures, and system design.",
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
            category: "Backend",
            items: ["Java", "Spring Boot", "RESTful APIs", "Maven", "PostgreSQL", "Microservices"]
        },
        {
            category: "Frontend",
            items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Figma"]
        },
        {
            category: "DevOps & Tools",
            items: ["Docker", "Git", "Jenkins", "CI/CD", "Linux", "AWS Basics"]
        }
    ]
};

const ResumeTabs = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const tabs = [
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' }
    ];

    return (
        <section className="py-32 px-6 md:px-20 bg-midnight relative z-10 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Career <span className="text-gold">Chronicle</span></h2>

                    {/* TABS NAVIGATION */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-b border-white/10 pb-4 relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm uppercase tracking-[0.2em] font-mono pb-4 relative transition-colors duration-300 ${activeTab === tab.id ? 'text-gold' : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {tab.label}

                                {/* Sliding Underline */}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">

                        {/* EXPERIENCE & EDUCATION VIEW */}
                        {(activeTab === 'experience' || activeTab === 'education') && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-12"
                            >
                                {resumeData[activeTab].map((item) => (
                                    <div key={item.id} className="group relative border-l-2 border-white/10 pl-8 md:pl-12 hover:border-gold transition-colors duration-500">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                            <h3 className="text-2xl text-white font-serif">{item.role}</h3>
                                            <span className="text-gold font-mono text-xs uppercase tracking-wider">{item.period}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm font-mono mb-6 uppercase tracking-wide">{item.company}</p>
                                        <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">{item.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.tech.map(t => (
                                                <span key={t} className="px-3 py-1 bg-white/5 text-[10px] text-gray-400 rounded-sm border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* SKILLS VIEW (Different Layout) */}
                        {activeTab === 'skills' && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {resumeData.skills.map((group) => (
                                    <div key={group.category} className="bg-white/5 p-8 border border-white/5 hover:border-gold/30 transition-colors rounded-sm">
                                        <h3 className="text-gold text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">
                                            {group.category}
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {group.items.map(skill => (
                                                <span key={skill} className="text-gray-300 text-sm flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default ResumeTabs;