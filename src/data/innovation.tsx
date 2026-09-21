import { Gamepad2, Lightbulb, Rocket, ShieldCheck, Users } from "lucide-react";
import type { BuilderInitiative, Competition, Venture } from "@/types";

export const recentProjects: Venture[] = [
    {
        title: "ClinTrial",
        period: "8–9 July 2026 · Paris",
        description: "At the RAISE Summit hackathon, our five-person team built ClinTrial: an AI agent that checks clinical-trial invoices against protocols, contracts, budgets and payment history.",
        outcome: "1st place · Vultr Track",
        prizePool: { value: "€100K+", event: "RAISE Hackathon", href: "https://www.raisesummit.com/post/world-largest-ai-hackathon-startup-competition-raise-summit-2026" },
        highlights: ["RAISE 2026", "AI Invoice Review"],
        links: [{ label: "Watch the demo", href: "https://www.youtube.com/watch?v=ZG7tVEBMd9s" }],
        icon: ShieldCheck,
    },
    {
        title: "Loki Intelligence",
        period: "June 2026 · Amsterdam",
        description: "At MEGATHON, our four-person team built an AI security-testing agent that assessed 30 system architectures and produced 100+ verified findings in 48 hours.",
        outcome: "Two 1st places · One 2nd place",
        prizePool: { value: "€100K+", event: "MEGATHON", href: "https://hackathon.fndr.studio/" },
        note: "I later stepped away because of other commitments.",
        story: [
            "We placed first in Build with Devin (Cognition), first in Prompt to Paid (Base44), and second in the Startup Track (Mollie, Visa and Peak).",
            "The team has since continued as Loki Intelligence B.V., with paying clients and a place in the Base44 Accelerator Program."
        ],
        highlights: ["MEGATHON", "One Build"],
        links: [{ label: "Visit Loki Intelligence", href: "https://loki-intelligence.com" }],
        icon: Lightbulb,
    },
];

export const recentResults: Competition[] = [
    {
        title: "DeBond",
        result: "AI Café Luxembourg · Top 8 Finalist",
        location: "Cercle Cité, Luxembourg",
        year: "May 2026",
        description: "Amrit Gill and I co-developed a concept for an AI co-pilot that turns battery-passport data into dismantling and recovery plans. I led the framing, safety architecture and pitch. The design uses safety rules to validate plans and requires expert approval before execution. It began at the World Engineering Day WFEO Hackathon and reached the AI Café finals. DeBond remains a concept.",
        links: [{ label: "Read the concept", href: "https://drive.google.com/file/d/1WOqdXxZBJbWw9xhkq-nXENqe0zAz5fij/view" }],
    },
    {
        title: "Beyond the List",
        result: "BärnHäckt · PostFinance Challenge",
        location: "Bern, Switzerland",
        year: "21–23 August 2026",
        description: "Our team built an AI early-warning layer for PostFinance business banking, using everyday SME transactions to highlight financial risks and explain possible next steps. I contributed to problem framing and product work. We didn’t win the challenge, but PostFinance has since asked us to develop the idea further.",
        links: [{ label: "About BärnHäckt", href: "https://bernhackt.ch" }],
    },
];

export const builderInitiatives: BuilderInitiative[] = [
    {
        title: "ForgeLUX",
        role: "Building",
        statement: "Giving Luxembourg’s builder culture a place to grow.",
        description: "Hackathons across Europe showed me what happens when people have a place to build together. I wanted more of that momentum in Luxembourg, so I brought together a founding team, including students from the University of Luxembourg. Together, we’re building ForgeLUX: a community where ideas can become projects, collaborations and new ventures.",
        details: "We’re in discussions with startups, educational institutions and other organisations in Luxembourg as we prepare our first buildathon. The aim is to give people regular opportunities to meet, build and keep going together.",
        links: [{ label: "Explore ForgeLUX", href: "https://forgelux.lovable.app" }],
        ribbon: [
            { value: "Formed", label: "Founding team" },
            { value: "Underway", label: "Partner talks" },
            { value: "Planning", label: "Our first buildathon" },
        ],
        ribbonContext: "Taking shape in Luxembourg",
    },
    {
        title: "Lovable",
        role: "Luxembourg City Lead",
        period: "Sep 2026 – Present",
        statement: "Helping people ship the idea they’ve been sitting on.",
        description: "Lovable lets people build working software by describing what they want to create. That opens the door to students, founders and people who have never written code. I want more people in Luxembourg to experience that first moment of turning an idea into something they can actually use.",
        details: "As Luxembourg City Lead, I’m working towards meetups, hands-on workshops and collaborations with local communities to help people build and share their first projects.",
        closing: "Part of the Lovable Ambassador programme.",
        links: [{ label: "Build with Lovable", href: "https://lovable.dev" }],
        ribbon: [
            { value: "60M", label: "Projects built" },
            { value: "1.2M", label: "New projects / week" },
        ],
        ribbonContext: "On Lovable, worldwide · September 2026",
        source: { label: "Platform figures", href: "https://lovable.dev" },
    },
    {
        title: "Tectonic",
        role: "Hackathon Support Lead",
        period: "Aug 2026 – Present",
        statement: "Seven cities. One shared drive to build.",
        description: "I’m a Hackathon Support Lead with Tectonic, helping deliver its ambition for Belgium’s biggest hackathon. The 2026 event is set to bring 700+ builders together across seven cities, working on real business challenges from KBC and SD Worx.",
        details: "The first round takes place on 30 September. The top 32 teams advance to the final in Ghent on 20 October, with a €10,000 main prize for the winning team.",
        links: [{ label: "Explore the hackathon", href: "https://www.tectonicconf.eu/hackathon" }],
        ribbon: [
            { value: "700+", label: "Builders expected" },
            { value: "7", label: "Belgian cities" },
            { value: "€10K", label: "Main prize" },
        ],
        ribbonContext: "Tectonic Hackathon · 2026 edition",
        source: { label: "Event details", href: "https://www.tectonicconf.eu/hackathon" },
    },
];

export const ventures: Venture[] = [
    {
        title: "XentriX Esports",
        role: "Co-Founder",
        period: "2018 – 2023",
        description: "We started out in a small suburb, playing on low-end devices with nothing but passion. Opportunities were limited, so instead of waiting, we decided to create our own.",
        story: [
            "XentriX grew from a small group of players on low-end devices into an esports organisation. Together, we helped players develop, find sponsorship and move on to other teams.",
            "Players in our organisation reached Asia’s top 10, including two who ranked #1 in PUBG Mobile Season 14.",
            "We also built an all-female professional PUBG Mobile squad in South India and organised Starburst Women’s League, a tournament for women. We wanted more players to have the opportunity to compete and be seen.",
            "For me, it was about giving other players the exposure and chances we had struggled to find ourselves."
        ],
        highlights: ["Player Development", "5 Years", "Women's League"],
        icon: Gamepad2,
    },
    {
        title: "Finds",
        role: "Project Coordinator",
        period: "2024",
        description: "I coordinated a small team working on a dynamic-pricing concept for surplus fashion inventory at Finds. We explored how pricing could help the business sell stock that might otherwise remain unsold.",
        highlights: ["Dynamic Pricing", "Surplus Inventory", "Team Coordination"],
        icon: Rocket,
    },
    {
        title: "Under 25 Universe",
        role: "Intern (Hustler)",
        period: "Nov 2022 – Mar 2023",
        description: "As part of the Under 25 team, I helped plan and coordinate the youth festival and supported on-ground execution.",
        highlights: ["35,000+ Attendees", "3-Day Festival"],
        icon: Users,
    },
];

export const competitions: Competition[] = [
    {
        title: "European Hackathon",
        result: "3rd Place",
        location: "French Ministry",
        year: "2024",
        image: "/images/european-hackathon.jpg",
        imageClass: "object-top",
    },
    {
        title: "Haining Innovation Competition",
        result: "National Finals",
        location: "China",
        year: "2024",
        image: "/images/haining-competition.jpg",
        link: "https://www.canva.com/design/DAGIZcLIxvM/2SaHMHPt63lFqTBlf8SeEQ/edit?utm_content=DAGIZcLIxvM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
        title: "L'Oreal Brandstorm 2025",
        result: "France 2025",
        location: "France",
        year: "2025",
        // Using slides array for multiple images
        slides: [
            "/images/loreal-1.jpg",
            "/images/loreal-2.jpg",
            "/images/loreal-3.jpg"
        ]
    },
    {
        title: "European Hackathon 2025",
        result: "Project at MINISTRY",
        location: "Uni gustave Eiffel, AIFT France",
        year: "2025",
        image: "/images/hackathon-2025.jpg",
    }
];
