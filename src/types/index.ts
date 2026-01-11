import { ReactNode } from "react";

export interface Experience {
    company: string;
    location: string;
    role: string;
    period: string;
    description: string;
    tags: string[];
    current: boolean;
    highlight: boolean;
}

export interface ResearchProject {
    title: string;
    subtitle: string;
    type: string;
    description: string;
    icon?: ReactNode; // Optional because we might handle icons differently in data files
    stats: string[];
    link?: string;
    cta?: string;
    delay: number;
}

export interface Education {
    school: string;
    degree: string;
    year: string;
    note?: string;
}


export interface TimelineItem {
    year: string;
    title: string;
    subtitle: string;
    type: "work" | "education" | "achievement" | "startup";
}

export interface Project {
    title: string;
    description: string;
    category?: string; // Optional as not all projects might have it, or it might be mapped to description
    icon?: ReactNode;
    delay: number;
    gradient?: string;
    image?: string;
    link?: string;
    cta?: string;
}

export interface Venture {
    title: string;
    role: string;
    period: string;
    description: string;
    story?: string[];
    highlights: string[];
    icon: any; // Lucide icon component type
}

export interface Competition {
    title: string;
    result: string;
    location: string;
    year: string;
    image?: string;
    link?: string;
    slides?: string[];
    imageClass?: string;
}
