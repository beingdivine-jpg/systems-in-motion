import { Copy, Layout, Palette, Workflow } from "lucide-react";
import { Project } from "@/types";

export const projects: Project[] = [
    {
        title: "Finds Discount",
        category: "Strategic brand identity & market analysis framework.",
        description: "Strategic brand identity & market analysis framework.",
        icon: <Workflow className="w-6 h-6 text-accent-visual" />,
        delay: 200,
        gradient: "from-accent-visual/20 to-transparent",
        image: "/images/finds-discount.jpg",
        link: "https://www.canva.com/design/DAG-GvtziP4/BPo2a06knmHwQ9JiZtEbrw/edit?utm_content=DAG-GvtziP4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        cta: "View Presentation"
    },
    {
        title: "Focusrite",
        category: "Digital experience design for global audio products.",
        description: "Digital experience design for global audio products.",
        icon: <Palette className="w-6 h-6 text-accent-visual" />,
        delay: 300,
        gradient: "from-purple-500/20 to-transparent",
        image: "/images/focusrite.jpg",
        link: "https://www.canva.com/design/DAG-G-aqF3g/vHiGsXNjHwBNPPK3Q7KXwA/edit?utm_content=DAG-G-aqF3g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        cta: "View Case Study"
    },
    {
        title: "Russian-Ukrainian War",
        category: "Complex geopolitical data visualized through narrative structure.",
        description: "Complex geopolitical data visualized through narrative structure.",
        icon: <Copy className="w-6 h-6 text-accent-visual" />,
        delay: 400,
        gradient: "from-blue-500/20 to-transparent",
        image: "/images/geopolitics-case-study.jpg",
        link: "https://www.canva.com/design/DAG-G6pKjS0/4ZPbG8QRcPbclk2tbujFwQ/edit?utm_content=DAG-G6pKjS0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        cta: "View Analysis"
    },
    {
        title: "SparkleSweep",
        category: "Modern brand identity and responsive UI/UX design.",
        description: "Modern brand identity and responsive UI/UX design.",
        icon: <Layout className="w-6 h-6 text-accent-visual" />,
        delay: 500,
        gradient: "from-emerald-500/20 to-transparent",
        image: "/images/sparklesweep.jpg",
        link: "https://www.canva.com/design/DAGc63Bvjaw/8sjqM7csXni3JhGxhnZQuQ/edit?utm_content=DAGc63Bvjaw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        cta: "View Brand Kit"
    },
];
