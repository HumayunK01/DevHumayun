
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Hello", "Hola", "Bonjour", "Ciao", "Namaste", "Assalamualaikum"];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Disable body scroll when preloader is active
        document.body.style.overflow = "hidden";

        // Cycle through words
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === words.length - 1) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1000); // Wait a bit after final word
                    return prev;
                }
                return prev + 1;
            });
        }, 250); // Speed of word switching

        return () => {
            clearInterval(interval);
            document.body.style.overflow = ""; // Re-enable scroll
        };
    }, [onComplete]);

    const slideUp = {
        initial: { y: 0 },
        exit: {
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
            {/* Main Content */}
            <motion.div
                className="relative z-10 flex items-center justify-center text-3xl sm:text-4xl md:text-6xl font-bold font-serif text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
                <span className="flex items-center gap-2 md:gap-3">
                    {words[index]}
                </span>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
