import React from 'react';
import { motion } from 'framer-motion';

// IMPORT YOUR IMAGES
import project1 from '../assets/payzo-project.png';
import project2 from '../assets/nexusgloabal-project.png';
import project3 from '../assets/onepoint-project.png';

const projects = [
    {
        id: 1,
        title: "HRMS Platform",
        category: "Enterprise Software",
        description: "A comprehensive Human Resource Management System built for Interland. Features include payroll processing and attendance tracking.",
        tech: ["Java Spring Boot", "Angular", "PostgreSQL"],
        image: project1
    },
    {
        id: 2,
        title: "Corporate Static Site",
        category: "Web Development",
        description: "A high-performance corporate website designed to establish brand authority. Built with optimization and SEO at the forefront.",
        tech: ["HTML/CSS", "JavaScript", "Bootstrap"],
        image: project2
    },
    {
        id: 3,
        title: "E-Commerce Suite",
        category: "Personal Project",
        description: "A full-featured shopping platform. Includes cart management, payment gateway integration, and a custom admin dashboard.",
        tech: ["React", "Node.js", "MongoDB"],
        image: project3
    }
];

const Projects = () => {
    return (
        <section id="work" className="py-32 px-6 md:px-20 bg-midnight relative z-10">
            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER - Clean & Simple */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                    <div>
                        <span className="text-gold font-mono text-xs tracking-widest uppercase mb-2 block">My Work</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">
                            Selected <span className="text-white/40">Projects</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                        A collection of technical challenges turned into elegant solutions.
                        Focused on performance, scalability, and user experience.
                    </p>
                </div>

                {/* THE GRID - Standard 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group cursor-pointer"
                        >
                            {/* 1. IMAGE CONTAINER */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-900 mb-6">
                                {/* The Image */}
                                <img
                                    src={project.image.src}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />

                                {/* Hover Overlay (Subtle) */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* "View Project" Button (Only visible on hover) */}
                                <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="bg-white text-midnight p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* 2. TEXT CONTENT */}
                            <div className="flex flex-col gap-3">
                                {/* Top Row: Title & Category */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl text-white font-serif group-hover:text-gold transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-[10px] text-white/40 font-mono uppercase">
                                            {t} {i !== project.tech.length - 1 && "•"}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Projects;