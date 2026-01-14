import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 md:px-20 bg-midnight relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50"></div>

            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-serif text-white mb-8"
                >
                    Let's create <br />
                    <span className="text-gray-500 italic">something timeless.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
                >
                    Whether you have a specific project in mind or just want to discuss the latest in React and Java architecture, my inbox is open.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {/* Email Button */}
                    <a
                        href="mailto:joelbiju3@gmail.com"
                        className="group relative px-8 py-4 bg-white text-midnight font-bold overflow-hidden"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Send an Email</span>
                        <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                    </a>

                    {/* LinkedIn Button */}
                    <a
                        href="https://www.linkedin.com/in/joel-biju"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors underline decoration-1 underline-offset-4"
                    >
                        Connect on LinkedIn
                    </a>
                </div>

                <footer className="mt-32 text-gray-700 text-xs uppercase tracking-widest">
                    © {new Date().getFullYear()} Joel Biju. Crafted with Astro & React.
                </footer>
            </div>
        </section>
    );
};

export default Contact;