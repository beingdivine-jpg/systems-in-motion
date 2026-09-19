import { FileText, Presentation, TrendingUp } from "lucide-react";
import { Experience, ResearchProject } from "@/types";

export const experiences: Experience[] = [
    {
        company: "Ferrero Group",
        location: "Global Headquarters / Luxembourg",
        role: "Group IT Project Manager Assistant (Consultant)",
        period: "Sep 2025 – Present",
        description: "Global IT Asset Management project at headquarters — leading group-wide software installation analysis.",
        tags: ["Group ITAM", "SAM Analysis", "IT Project Management"],
        current: true,
        highlight: false,
    },
    {
        company: "Ferrero Group",
        location: "Luxembourg",
        role: "Software Asset Management Analyst",
        period: "Mar – Aug 2025",
        description: "Contract oversight and compliance management for Group IT.",
        tags: ["SAM", "Contracts", "Compliance"],
        current: false,
        highlight: false,
    },
    {
        company: "Olympic Broadcasting Services",
        location: "France",
        role: "Liaison Officer",
        period: "Jun – Sep 2024",
        description: "Coordinated broadcasting relations for 50+ international rights holders, including NBC, BBC, Eurosport and Viacom, at Roland Garros and Yves du Manoir during the Paris 2024 Olympics and Paralympics. Managed influencer relations and connected operations, media and technical teams.",
        tags: ["50+ Broadcasters", "2 Venues", "15+ Influencers"],
        current: false,
        highlight: true,
    },
];

export const researchProjects: ResearchProject[] = [
    {
        title: "Generative AI Ecosystem Analysis",
        subtitle: "Market Forecast / Patent Analysis",
        type: "Market_Intelligence",
        description: "Market analysis encompassing evaluation, growth assessment, and market forecasting, leveraging patents and scientific literature in the OpenAI and ChatGPT domain.",
        icon: <TrendingUp className="w-6 h-6 text-accent-enterprise" />,
        stats: ["Patent Analysis", "Growth Forecasting"],
        link: "https://www.canva.com/design/DAGc62IJD04/n8kS33XtuNfWOtO_mCejgw/edit?utm_content=DAGc62IJD04&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        delay: 200,
    },
    {
        title: "Beyond Consoles: Sony's Future in India's Mobile Gaming Frontier",
        subtitle: "Strategic Analysis / Corporate Strategy",
        type: "Market_Intelligence",
        description: "An analysis of the gaming industry, prospective market penetration and a competitive landscape diagnosis of Sony Corporation in India.",
        icon: <FileText className="w-6 h-6 text-accent-enterprise" />,
        stats: ["Market Strategy", "User Demographics"],
        link: "https://www.canva.com/design/DAG-Hvf0tag/XBPqNy2BEXfWnR7osyfoDg/edit?utm_content=DAG-Hvf0tag&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        cta: "Read Analysis",
        delay: 300,
    },
    {
        title: "Strategic ITAM: Mitigating Technical Debt",
        subtitle: "Strategic Framework / Corporate Governance",
        type: "Presentation_Deck",
        description: "How IT asset management and application portfolio reviews can help reduce technical debt. This presentation explores the responsible management of technology that draws me to ITAM.",
        icon: <Presentation className="w-6 h-6 text-accent-enterprise" />,
        stats: ["Strategic Roadmap", "Governance Model"],
        link: "https://www.canva.com/design/DAGlc6hZpYc/i-oW3Ao8Q5ICkV_6Y0j02Q/edit?utm_content=DAGlc6hZpYc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        delay: 400,
    },
];
