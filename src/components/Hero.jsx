import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform, useScroll } from 'framer-motion';
import profileImg from '../assets/Joel.png';

const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // --- FIX: SAFE WINDOW DIMENSIONS ---
    const isClient = typeof window !== "undefined";
    const winWidth = isClient ? window.innerWidth : 1920;
    const winHeight = isClient ? window.innerHeight : 1080;

    // --- MOUSE PARALLAX (DESKTOP) ---
    const backX = useTransform(cursorX, [0, winWidth], [-20, 20]);
    const backY = useTransform(cursorY, [0, winHeight], [-20, 20]);
    const frontX = useTransform(cursorX, [0, winWidth], [40, -40]);
    const frontY = useTransform(cursorY, [0, winHeight], [40, -40]);

    // --- SCROLL PARALLAX (MOBILE) ---
    const { scrollY } = useScroll();
    // As user scrolls 500px down, image moves 150px down. 
    // This makes it look like it's "staying behind" the text.
    const mobileParallaxY = useTransform(scrollY, [0, 500], [0, 300]);

    // Flashlight Mask Logic
    const textureMask = useMotionTemplate`radial-gradient(circle at ${cursorX}px ${cursorY}px, black 0%, transparent 250px)`;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <section className="min-h-[100dvh] w-full flex items-center justify-center px-6 md:px-20 relative overflow-hidden bg-midnight pt-24 pb-12 md:py-0">

            {/* --- MOBILE BACKGROUND IMAGE LAYER (With Scroll Parallax) --- */}
            <div className="absolute inset-0 z-0 md:hidden pointer-events-none overflow-hidden">
                <motion.img
                    style={{ y: mobileParallaxY }} // <--- THE PARALLAX MAGIC
                    src={profileImg.src}
                    alt="Joel Biju"
                    className="w-full h-[115%] object-cover opacity-50 grayscale sepia brightness-75 contrast-125 -mt-10"
                // Added h-[115%] and -mt-10 to give extra height for the movement without showing gaps
                />
                <div className="absolute inset-0 bg-gold/10 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-transparent" />
            </div>

            {/* Background Texture */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ maskImage: textureMask, WebkitMaskImage: textureMask }}
            >
                <motion.div
                    animate={{
                        backgroundPosition: ["0px 0px", "50px 50px"],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </motion.div>

            {/* Glow Blob */}
            <motion.div
                style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
                className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gold/10 blur-[80px] md:blur-[100px] z-0 mix-blend-screen"
            />

            <div className="z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:items-center relative">

                {/* LEFT COLUMN: Text Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="relative order-1 flex flex-col justify-center text-center md:text-left"
                >
                    <motion.p variants={item} className="text-gold font-sans tracking-[0.2em] text-xs md:text-sm mb-4 uppercase font-bold">
                        Design • Develop • Deliver
                    </motion.p>

                    <motion.h1 variants={item} className="font-serif text-4xl sm:text-5xl md:text-8xl font-bold leading-tight text-white mb-6">
                        Engineering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                            Elegance.
                        </span>
                    </motion.h1>

                    <motion.p variants={item} className="font-sans text-gray-300 md:text-gray-400 text-base md:text-xl max-w-xl leading-relaxed mb-8 md:mb-10 mx-auto md:mx-0">
                        I am <span className="text-white font-medium">Joel Biju</span>. Full Stack Developer dedicated to building polished digital experiences. I engineer scalable backends and intuitive, responsive sites for enterprise success.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a href="tel:+918330096633" className="md:hidden w-full sm:w-auto px-8 py-4 bg-gold text-midnight font-bold rounded-sm hover:bg-white transition-colors duration-300 text-center uppercase tracking-wider">
                            Call Now
                        </a>
                        <a href="#contact" className="hidden md:block w-full sm:w-auto px-8 py-4 bg-gold text-midnight font-bold rounded-sm hover:bg-white transition-colors duration-300 text-center uppercase tracking-wider">
                            Book Appointment
                        </a>
                        <a href="#work" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-sm hover:border-gold hover:text-gold transition-colors duration-300 text-center uppercase tracking-wider">
                            View Projects
                        </a>
                    </motion.div>
                </motion.div>

                {/* RIGHT COLUMN: Profile Image with Depth Effect (Desktop Only) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="hidden md:flex justify-end order-2 translate-y-12"
                >
                    <div className="relative w-full max-w-md aspect-[3/4] group flex justify-center">
                        <motion.h1 style={{ x: backX, y: backY }} className="absolute top-10 left-1/2 -translate-x-1/2 text-[180px] leading-none font-serif font-bold text-white/5 z-0 select-none whitespace-nowrap">BIJU</motion.h1>
                        <img src={profileImg.src} alt="Joel Biju" className="relative z-10 w-full h-full object-cover object-top grayscale sepia brightness-90 contrast-110 group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 transition-all duration-700 ease-out drop-shadow-2xl" />
                        <motion.div style={{ x: frontX, y: frontY }} className="absolute bottom-20 -left-12 z-20 flex flex-col gap-2">
                            <h2 className="text-6xl p-3 font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold drop-shadow-lg">JOEL</h2>
                            <div className="bg-midnight/80 backdrop-blur-md border border-gold/30 p-3 rounded-sm flex items-center gap-3 w-fit">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Java • React • Angular</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-sm tracking-widest uppercase pointer-events-none hidden md:block"
            >
                Scroll
            </motion.div>
        </section>
    );
};

export default Hero;