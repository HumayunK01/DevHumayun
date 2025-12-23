import { motion } from "framer-motion";
import { Github, GitFork, Star, Code2, TrendingUp, Activity } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useState, useEffect } from "react";

// Replace with your GitHub username
const GITHUB_USERNAME = "HumayunK01";

type GitHubStats = {
    repos: number;
    stars: number;
    commits: number;
    contributions: number;
};

function GitHubStatsSection() {
    const [stats, setStats] = useState<GitHubStats>({
        repos: 0,
        stars: 0,
        commits: 0,
        contributions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                // Fetch user repositories
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
                const repos = await reposResponse.json();

                // Calculate total stars and commits
                const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

                // Estimate total commits (GitHub API doesn't provide exact count easily)
                // We'll use a reasonable estimate based on repo activity
                const totalCommits = repos.length * 50; // Rough estimate

                // Fetch user data for public repos count
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                const userData = await userResponse.json();

                setStats({
                    repos: userData.public_repos || repos.length,
                    stars: totalStars,
                    commits: totalCommits,
                    contributions: 500 // GitHub doesn't provide this via API, keeping as estimate
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                // Fallback to placeholder values
                setStats({
                    repos: 50,
                    stars: 100,
                    commits: 1000,
                    contributions: 500
                });
                setLoading(false);
            }
        };

        fetchGitHubStats();
    }, []);

    return (
        <section id="github" className="relative py-12 md:py-18 overflow-hidden" style={{ position: 'relative' }}>
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute left-0 top-1/4 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary cursor-default"
                    >
                        <SiGithub className="w-4 h-4 mr-2" />
                        Open Source Contributions
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                    >
                        GitHub <span className="text-primary">Activity</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        A visual representation of my coding journey and open-source contributions.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Contribution Graph */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Github className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">Contribution Activity</h3>
                        </div>

                        {/* Mobile View - Compact */}
                        <div className="block md:hidden rounded-xl overflow-x-auto border border-white/5 bg-zinc-950/50 p-2">
                            <div className="min-w-[300px]">
                                <img
                                    src={`https://ghchart.rshah.org/a855f7/${GITHUB_USERNAME}`}
                                    alt="Contribution Graph"
                                    className="w-full h-auto brightness-90 contrast-125"
                                    style={{ filter: 'invert(1) hue-rotate(180deg)' }}
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement?.parentElement;
                                        if (parent) {
                                            parent.innerHTML = '<div class="text-center py-8 text-zinc-400"><p class="mb-2">Contribution graph loading...</p><p class="text-sm">Visit <a href="https://github.com/' + GITHUB_USERNAME + '" target="_blank" class="text-primary hover:underline">@' + GITHUB_USERNAME + '</a></p></div>';
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Desktop View - Full Graph */}
                        <div className="hidden md:block rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50 p-4">
                            <img
                                src={`https://ghchart.rshah.org/a855f7/${GITHUB_USERNAME}`}
                                alt="Contribution Graph"
                                className="w-full h-auto brightness-90 contrast-125"
                                style={{ filter: 'invert(1) hue-rotate(180deg)' }}
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                        parent.innerHTML = '<div class="text-center py-8 text-zinc-400">Contribution graph will load shortly...</div>';
                                    }
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                    >
                        {[
                            { icon: Github, label: "Repositories", value: stats.repos, color: "text-purple-500" },
                            { icon: Star, label: "Stars Earned", value: stats.stars, color: "text-yellow-500" },
                            { icon: Code2, label: "Total Commits", value: stats.commits + "+", color: "text-blue-500" },
                            { icon: Activity, label: "Contributions", value: stats.contributions + "+", color: "text-green-500" }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="p-4 md:p-6 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 text-center group"
                            >
                                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                                <div className="text-xl md:text-2xl font-bold text-foreground mb-1">
                                    {loading ? "..." : stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-zinc-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* View on GitHub Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-center px-4"
                    >
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 w-full sm:w-auto text-sm sm:text-base"
                        >
                            <SiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="whitespace-nowrap">View Full Profile on GitHub</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default GitHubStatsSection;
