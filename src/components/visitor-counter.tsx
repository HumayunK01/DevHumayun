import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { incrementVisitorCount, getVisitorCount } from "@/lib/supabase";

// Global flag to ensure we only increment once per page load
let hasIncrementedThisSession = false;

interface VisitorCounterProps {
    isScrolled?: boolean;
}

export function VisitorCounter({ isScrolled = false }: VisitorCounterProps) {
    const [visitorCount, setVisitorCount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updateVisitorCount = async () => {
            try {
                // Check if we've already counted this session (global check)
                const sessionCounted = sessionStorage.getItem('visitor-counted');

                if (!sessionCounted && !hasIncrementedThisSession) {
                    // Set the flag immediately to prevent race conditions
                    hasIncrementedThisSession = true;
                    sessionStorage.setItem('visitor-counted', 'true');

                    // Increment the count for new visitors
                    const count = await incrementVisitorCount();

                    if (count !== null) {
                        setVisitorCount(count);
                    } else {
                        // Fallback to localStorage if Supabase fails
                        const localCount = localStorage.getItem('visitor-count') || '0';
                        const newCount = parseInt(localCount) + 1;
                        localStorage.setItem('visitor-count', newCount.toString());
                        setVisitorCount(newCount);
                    }
                } else {
                    // Just get the current count without incrementing
                    const count = await getVisitorCount();

                    if (count !== null) {
                        setVisitorCount(count);
                    } else {
                        // Fallback to localStorage
                        const localCount = localStorage.getItem('visitor-count') || '0';
                        setVisitorCount(parseInt(localCount));
                    }
                }
            } catch (error) {
                console.error('Error updating visitor count:', error);
                // Fallback to localStorage
                const localCount = localStorage.getItem('visitor-count') || '0';
                setVisitorCount(parseInt(localCount));
            } finally {
                setIsLoading(false);
            }
        };

        updateVisitorCount();
    }, []);

    if (isLoading) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-primary/20">
                <Eye className="h-3.5 w-3.5 text-primary animate-pulse" />
                {!isScrolled && (
                    <span className="text-xs font-medium text-muted-foreground">
                        Visitors:
                    </span>
                )}
                <span className="text-xs font-bold text-foreground tabular-nums">
                    ---
                </span>
            </div>
        );
    }

    if (visitorCount === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow"
        >
            <Eye className="h-3.5 w-3.5 text-primary" />
            {!isScrolled && (
                <span className="text-xs font-medium text-muted-foreground">
                    Visitors:
                </span>
            )}
            <motion.span
                key={visitorCount}
                initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                transition={{ duration: 0.3 }}
                className="text-xs font-bold tabular-nums"
            >
                {visitorCount}
            </motion.span>
        </motion.div>
    );
}
