import React from 'react';
import { motion } from 'framer-motion';

// IMPORT YOUR IMAGES
import project1 from '../assets/payzo-project.png';
import project2 from '../assets/nexusgloabal-project.png';
import project3 from '../assets/onepoint-project.png';
import project4 from '../assets/sandbox-project.png';

const projects = [
    {
        id: 1,
        title: "Payzo HR",
        category: "HRMS Platform",
        description: "A comprehensive Human Resource Management System built for Interland. Features include payroll processing, attendance tracking, and employee self-service portals.",
        tech: ["Java Spring Boot", "Angular", "PostgreSQL"],
        image: project1,
        link: "https://payzohr.com/landing"
    },
    {
        id: 2,
        title: "Nexus Global",
        category: "Corporate Site",
        description: "A high-performance corporate website designed to establish brand authority. Built with optimization and SEO at the forefront.",
        tech: ["React", "Tailwind CSS", "Lovable.ai"],
        image: project2,
        link: "https://nexusglobal.sa/"
    },
    {
        id: 3,
        title: "Onepoint Store",
        category: "E-Commerce",
        description: "A full-featured shopping platform. Includes cart management, payment gateway integration, and a custom admin dashboard.",
        tech: ["React", "Node.js", "PostgreSQL"],
        image: project3,
        link: "https://onepointstore.vercel.app/login"
    },
    {
        id: 4,
        title: "PSH Sandbox",
        category: "Development Sandbox",
        description: "An online portal for developers to test API integrations and sandboxed environments for safe experimentation.",
        tech: ["Angular", "Springboot", "PostgreSQL"],
        image: project4,
        link: "http://81.208.162.99/sandbox/developerPortal"
    }
];

const LaptopFrame = ({ children }) => (
    <div className="group relative">
        {/* LAPTOP LID (The Screen Bezel) */}
        {/* We use fit-content so it wraps perfectly around your specific aspect ratio */}
        <div className="relative mx-auto bg-gray-900 rounded-t-xl border-[4px] border-gray-800 shadow-2xl overflow-hidden">

            {/* Webcam Dot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full z-20 pointer-events-none"></div>

            {/* The Screen Content (Your Image) */}
            <div className="bg-black rounded-lg overflow-hidden relative">
                {children}
            </div>
        </div>

        {/* LAPTOP BASE (Keyboard Area) */}
        <div className="relative mx-auto bg-gray-900 h-4 md:h-5 rounded-b-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 w-[102%] -ml-[1%] flex items-center justify-center">
            {/* Trackpad notch */}
            <div className="w-16 md:w-24 h-1 bg-gray-800 rounded-full opacity-50"></div>
        </div>
    </div>
);

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

                {/* THE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-24">
                    {projects.map((project) => (
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group cursor-pointer block"
                        >
                            {/* --- THE LAPTOP MOCKUP --- */}
                            <LaptopFrame>
                                {/* THE SCREEN CONTENT */}
                                <div className="relative aspect-[1897/926] w-full bg-neutral-900 group-hover:brightness-110 transition-all duration-500">
                                    <img
                                        src={project.image.src}
                                        alt={project.title}
                                        className="h-full w-full object-cover" // object-cover here ensures no black bars, fitting the custom ratio perfectly
                                    />

                                    {/* Screen Glare/Reflection Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Hover Overlay with Icon */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </LaptopFrame>

                            {/* TEXT CONTENT (Below Laptop) */}
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
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Projects;