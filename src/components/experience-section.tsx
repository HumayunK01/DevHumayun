import { motion } from "framer-motion";
import { Calendar, MapPin, Stethoscope, Palette, Brain } from "lucide-react";
import { SiReact, SiTypescript, SiVite, SiTailwindcss, SiFramer, SiPostgresql, SiPrisma, SiSolidity, SiEthereum, SiOpenai, SiShadcnui, SiNextdotjs, SiFirebase, SiIpfs, SiNodedotjs, SiAmazon, SiDocker, SiFigma, SiExpress, SiMongodb, SiHtml5, SiCss3, SiJavascript, SiPython } from "react-icons/si";
import { FaHardHat } from "react-icons/fa";
import { FaRobot, FaBolt } from "react-icons/fa6";

type Experience = {
    id: number;
    role: string;
    company: string;
    location: string;
    date: string;
    description: string[];
    skills: string[];
};

const experiences: Experience[] = [
    {
        id: 1,
        role: "Lead Web Developer",
        company: "EVJoints",
        location: "Mumbai, India",
        date: "Nov 2025 - Present",
        skills: ["React", "Node.js", "Express.js", "MongoDB", "TypeScript"],
        description: [
            "Spearheading the development of a comprehensive internal admin panel to streamline operational workflows.",
            "Collaborating on the complete UI/UX and functional redesign of the official website to enhance user engagement.",
            "Ensuring code quality through active participation in reviews and maintaining detailed project documentation."
        ],
    },
    {
        id: 2,
        role: "Trainee",
        company: "Hasbasoft Technology Pvt Ltd",
        location: "Mumbai, India",
        date: "Jul 2021 - Nov 2023",
        description: [
            "Developed responsive user interfaces using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility.",
            "Collaborated with senior developers to implement dynamic features using React.js and integrating backend APIs.",
            "Participated in agile development cycles, contributing to daily stand-ups and sprint planning sessions."
        ],
        skills: ["React", "Node.js", "JavaScript", "HTML5", "CSS3"]
    },
    {
        id: 3,
        role: "AI & ML Intern",
        company: "Ignitech Pvt Ltd",
        location: "Mumbai, India",
        date: "July 2022 - Aug 2022",
        description: [
            "Completed a comprehensive six-week training cum internship program focused on Artificial Intelligence and Machine Learning.",
            "Gained theoretical knowledge and hands-on practical exposure to core AI algorithms and ML models.",
            "Developed a foundational understanding of data processing, model training, and evaluation using Python."
        ],
        skills: ["Python", "Artificial Intelligence", "Machine Learning"]
    }
];

const getTechIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('react')) return <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />;
    if (t.includes('figma')) return <SiFigma className="w-3.5 h-3.5 text-[#F24E1E]" />;
    if (t.includes('node')) return <SiNodedotjs className="w-3.5 h-3.5 text-[#339933]" />;
    if (t.includes('express')) return <SiExpress className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('mongo')) return <SiMongodb className="w-3.5 h-3.5 text-[#47A248]" />;
    if (t.includes('html')) return <SiHtml5 className="w-3.5 h-3.5 text-[#E34F26]" />;
    if (t.includes('css')) return <SiCss3 className="w-3.5 h-3.5 text-[#1572B6]" />;
    if (t.includes('javascript')) return <SiJavascript className="w-3.5 h-3.5 text-[#F7DF1E]" />;
    if (t.includes('python')) return <SiPython className="w-3.5 h-3.5 text-[#3776AB]" />;
    if (t.includes('aws')) return <SiAmazon className="w-3.5 h-3.5 text-[#FF9900]" />;
    if (t.includes('docker')) return <SiDocker className="w-3.5 h-3.5 text-[#2496ED]" />;
    if (t.includes('type')) return <SiTypescript className="w-3.5 h-3.5 text-[#3178C6]" />;
    if (t.includes('vite')) return <SiVite className="w-3.5 h-3.5 text-[#646CFF]" />;
    if (t.includes('tailwind')) return <SiTailwindcss className="w-3.5 h-3.5 text-[#06B6D4]" />;
    if (t.includes('framer')) return <SiFramer className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('postgres')) return <SiPostgresql className="w-3.5 h-3.5 text-[#4169E1]" />;
    if (t.includes('prisma')) return <SiPrisma className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('solidity')) return <SiSolidity className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('web3')) return <SiEthereum className="w-3.5 h-3.5 text-foreground" />; // Using Ethereum icon as generic web3 or maintain consistency
    if (t.includes('ethereum')) return <SiEthereum className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('hardhat')) return <FaHardHat className="w-3.5 h-3.5 text-[#FFF100]" />;
    if (t.includes('medical')) return <Stethoscope className="w-3.5 h-3.5 text-red-500" />;
    if (t.includes('brand')) return <Palette className="w-3.5 h-3.5 text-pink-500" />;
    if (t.includes('artificial')) return <FaRobot className="w-3.5 h-3.5 text-cyan-500" />;
    if (t.includes('machine')) return <Brain className="w-3.5 h-3.5 text-purple-500" />;
    if (t.includes('openrouter')) return <SiOpenai className="w-3.5 h-3.5 text-green-500" />;
    if (t.includes('shadcn')) return <SiShadcnui className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('ai agent')) return <FaRobot className="w-3.5 h-3.5 text-orange-500" />;
    if (t.includes('neon')) return <FaBolt className="w-3.5 h-3.5 text-[#00E599]" />;
    if (t.includes('next.js')) return <SiNextdotjs className="w-3.5 h-3.5 text-foreground" />;
    if (t.includes('firebase')) return <SiFirebase className="w-3.5 h-3.5 text-[#FFCA28]" />;
    if (t.includes('ipfs')) return <SiIpfs className="w-3.5 h-3.5 text-[#65C2CB]" />;
    return null;
};

function ExperienceSection() {
    return (
        <section id="experience" className="relative py-10 md:py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute left-0 bottom-1/4 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary cursor-default"
                    >
                        Career Path
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                    >
                        My <span className="text-primary">Experience</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        A chronological overview of my professional journey, key projects, and the value I've delivered.
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2 ml-2 md:ml-0" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <TimelineItem key={exp.id} experience={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? "md:flex-row-reverse" : ""
                }`}
        >

            {/* Center Line Dot - Minimalist */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 ml-2 md:ml-0 mt-4 z-10" />

            {/* Date (Desktop) */}
            <div className={`hidden md:flex w-1/2 ${isEven ? "justify-start pl-12" : "justify-end pr-12"} items-start pt-4`}>
                <div className="flex items-center gap-2 text-primary font-medium bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    <Calendar className="w-4 h-4" />
                    {experience.date}
                </div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                <div className="relative p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-colors duration-300 group">
                    {/* Mobile Date */}
                    <div className="md:hidden flex items-center gap-2 text-primary font-medium text-sm mb-4 bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
                        <Calendar className="w-3 h-3" />
                        {experience.date}
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {experience.role}
                        </h3>
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <span className="font-medium text-foreground">{experience.company}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {experience.location}
                            </span>
                        </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                        {experience.description.map((desc, i) => (
                            <li key={i} className="text-zinc-400 text-sm leading-relaxed flex items-start gap-2">
                                <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                {desc}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {experience.skills.map((skill) => {
                            const icon = getTechIcon(skill);
                            return (
                                <span
                                    key={skill}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/50 border border-white/5 text-xs text-zinc-400 group-hover:text-foreground group-hover:border-white/20 transition-all hover:bg-zinc-800"
                                >
                                    {icon}
                                    {skill}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ExperienceSection;
