
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ScrollContextType {
    scroll: any | null;
}

const ScrollContext = createContext<ScrollContextType>({ scroll: null });

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
    const [scroll, setScroll] = useState<any>(null);

    useEffect(() => {
        let locomotiveScroll: any;

        const initScroll = async () => {
            try {
                const LocomotiveScroll = (await import("locomotive-scroll")).default;
                locomotiveScroll = new LocomotiveScroll({
                    lenisOptions: {
                        lerp: 0.1,
                        duration: 1.2,
                        orientation: 'vertical',
                        gestureOrientation: 'vertical',
                        smoothWheel: true,
                        wheelMultiplier: 1,
                        touchMultiplier: 2,
                        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    }
                });
                setScroll(locomotiveScroll);
            } catch (error) {
                console.error("Failed to initialize smooth scroll", error);
            }
        };

        initScroll();

        return () => {
            if (locomotiveScroll) locomotiveScroll.destroy();
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ scroll }}>
            {children}
        </ScrollContext.Provider>
    );
};
