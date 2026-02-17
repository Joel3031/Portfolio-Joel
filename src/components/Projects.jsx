import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, wrap } from 'framer-motion';

// IMPORT YOUR IMAGES
import project1 from '../assets/payzo-project.png';
import nexusgloabal from '../assets/nexusgloabal-project.png';
import nexusgloabal01 from '../assets/nexusgloabal-project01.png';
import nexusgloabal02 from '../assets/nexusgloabal-project02.png';
import onepoint from '../assets/onepoint-project.png';
import onepoint01 from '../assets/onepoint-project01.png';
import onepoint02 from '../assets/onepoint-project02.png';
import sandbox from '../assets/sandbox-project.png';
import sandbox01 from '../assets/sandbox-project01.png';
import sandbox02 from '../assets/sandbox-project02.png';
import tradex from '../assets/TradeX-project.png';
import tradex01 from '../assets/TradeX-project01.png';
import tradex02 from '../assets/TradeX-project02.png';

const projects = [
    {
        id: 1,
        title: "Payzo HR",
        category: "HRMS Platform",
        description: "A comprehensive Human Resource Management System built for Interland. Features include payroll processing, attendance tracking, and employee self-service portals.",
        tech: ["Java Spring Boot", "Angular", "PostgreSQL"],
        images: [project1],
        link: "https://payzohr.com/landing"
    },
    {
        id: 2,
        title: "Nexus Global",
        category: "Corporate Site",
        description: "A high-performance corporate website designed to establish brand authority. Built with optimization and SEO at the forefront.",
        tech: ["React", "Tailwind CSS", "Lovable.ai"],
        images: [nexusgloabal, nexusgloabal01, nexusgloabal02],
        link: "https://nexusglobal.sa/"
    },
    {
        id: 3,
        title: "Onepoint Store",
        category: "E-Commerce",
        description: "A full-featured shopping platform. Includes cart management, payment gateway integration, and a custom admin dashboard.",
        tech: ["React", "Node.js", "PostgreSQL"],
        images: [onepoint, onepoint01, onepoint02],
        link: "https://onepointstore.vercel.app/login"
    },
    {
        id: 4,
        title: "PSH Sandbox",
        category: "Development Sandbox",
        description: "An online portal for developers to test API integrations and sandboxed environments for safe experimentation.",
        tech: ["Angular", "Springboot", "PostgreSQL"],
        images: [sandbox, sandbox01, sandbox02],
        link: "http://81.208.162.99/sandbox/developerPortal"
    },
    {
        id: 5,
        title: "TradeX",
        category: "Trading Journal",
        description: "A personal trading journal application that allows traders to log their trades, analyze performance, and track progress over time.",
        tech: ["React", "Next.js", "PostgreSQL"],
        images: [tradex, tradex01, tradex02],
        link: "https://trade-x-trade.vercel.app/login"
    }
];

// --- VARIANTS FOR SLIDE ANIMATION ---
const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const LaptopFrame = ({ children }) => (
    <div className="group relative">
        {/* LAPTOP LID */}
        <div className="relative mx-auto bg-gray-900 rounded-t-xl border-[4px] border-gray-800 shadow-2xl overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full z-20 pointer-events-none"></div>
            <div className="bg-black rounded-lg overflow-hidden relative">
                {children}
            </div>
        </div>
        {/* LAPTOP BASE */}
        <div className="relative mx-auto bg-gray-900 h-4 md:h-5 rounded-b-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 w-[102%] -ml-[1%] flex items-center justify-center">
            <div className="w-16 md:w-24 h-1 bg-gray-800 rounded-full opacity-50"></div>
        </div>
    </div>
);

// --- CAROUSEL COMPONENT ---
const ProjectCard = ({ project }) => {
    const [[page, direction], setPage] = useState([0, 0]);

    // We wrap the index so it loops infinitely
    const imageIndex = wrap(0, project.images.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    // AUTO-PLAY LOGIC
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000); // UPDATED: Increased to 5000ms (5 seconds) for slower pace

        return () => clearInterval(timer);
    }, [page]);

    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer block"
        >
            <LaptopFrame>
                <div className="relative aspect-[1897/926] w-full bg-neutral-900 overflow-hidden touch-pan-y">

                    {/* CAROUSEL IMAGES */}
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={page}
                            src={project.images[imageIndex].src}
                            alt={project.title}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            // UPDATED TRANSITION SETTINGS
                            transition={{
                                x: { type: "spring", stiffness: 150, damping: 25 }, // Lower stiffness = Slower movement
                                opacity: { duration: 0.5 } // Longer fade duration
                            }}
                            className="absolute inset-0 h-full w-full object-cover"
                            draggable="false"

                            // SWIPE LOGIC
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </AnimatePresence>

                    {/* OVERLAYS */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                    {/* PAGINATION DOTS */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                        {project.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm ${idx === imageIndex ? 'bg-gold w-3' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>

                </div>
            </LaptopFrame>

            {/* TEXT CONTENT */}
            <div className="flex flex-col gap-3 mt-8 px-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl md:text-2xl text-white font-serif group-hover:text-gold transition-colors duration-300">
                        {project.title}
                    </h3>
                    <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm">
                        {project.category}
                    </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] text-white/40 font-mono uppercase">
                            {t} {i !== project.tech.length - 1 && "•"}
                        </span>
                    ))}
                </div>
            </div>
        </motion.a>
    );
};

const Projects = () => {
    return (
        <section id="work" className="py-20 md:py-32 px-6 md:px-20 bg-midnight relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* SECTION HEADER */}
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                    <div>
                        <span className="text-gold font-mono text-xs tracking-widest uppercase mb-2 block">My Work</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-white">
                            Selected <span className="text-white/40">Projects</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                        A collection of technical challenges turned into elegant solutions.
                        Focused on performance, scalability, and user experience.
                    </p>
                </div>

                {/* PROJECT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-24">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;