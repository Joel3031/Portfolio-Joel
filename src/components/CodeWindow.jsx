import React from 'react';
import { motion } from 'framer-motion';

const CodeWindow = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            // Floating animation
            whileHover={{ scale: 1.02 }}
            className="hidden md:block w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
            {/* Window Controls (Traffic Lights) */}
            <div className="flex gap-2 px-5 py-4 border-b border-white/5 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-relaxed text-gray-400">
                <p>
                    <span className="text-purple-400">class</span> <span className="text-yellow-400">JoelBiju</span> <span className="text-purple-400">extends</span> <span className="text-yellow-400">Developer</span> <span className="text-white">{'{'}</span>
                </p>

                <div className="pl-6 my-2 space-y-1">
                    <p>
                        <span className="text-blue-400">const</span> stack <span className="text-white">=</span> [
                    </p>
                    <p className="pl-4">
                        "<span className="text-green-400">Java Spring Boot</span>",
                    </p>
                    <p className="pl-4">
                        "<span className="text-green-400">React.js</span>",
                    </p>
                    <p className="pl-4">
                        "<span className="text-green-400">Next.js</span>"
                    </p>
                    <p className="text-white">];</p>
                </div>

                <p className="mt-4">
                    <span className="text-purple-400">function</span> <span className="text-blue-400">deploy</span>() <span className="text-white">{'{'}</span>
                </p>
                <p className="pl-6 text-gray-600 italic">// Crafting digital experiences</p>
                <p className="pl-6">
                    <span className="text-orange-400">return</span> <span className="text-green-400">"Excellence"</span>;
                </p>
                <p className="text-white">{'}'}</p>
                <p className="text-white">{'}'}</p>
            </div>

            {/* Glowing Bottom Border */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
        </motion.div>
    );
};

export default CodeWindow;