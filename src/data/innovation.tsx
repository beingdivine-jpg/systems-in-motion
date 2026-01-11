import { Gamepad2, Rocket, Users } from "lucide-react";
import { Competition } from "@/types";

export const ventures = [
    {
        title: "XentriX Esports",
        role: "Co-Founder",
        period: "2018 – 2023",
        description: "We started out in a small suburb, playing on low-end devices with nothing but passion. Opportunities were limited, so instead of waiting, we decided to create our own.",
        story: [
            "What began as a simple love for gaming slowly grew into something bigger. From the ground up, we created an esports organization that grew through grit, not privilege. We worked our way up—from local grounds to national stages—learning everything the hard way. Along the journey, we produced several Asia Top 10 players and even two Asia Rank #1 in PUBG Mobile (Season 14). We saw our players get sponsored and acquired, and watched talent grow beyond what we ever imagined.",
            "We also wanted to change who gets seen in esports. That led us to build one of South India’s earliest all-female professional PUBG Mobile squads, and later organise Starburst Women’s League, one of India’s first tournaments created exclusively for women.",
            "It was never just about winning games. It was about giving people the exposure and chances we never had."
        ],
        highlights: ["Asia #1 Rank", "5 Years", "Women's League"],
        icon: Gamepad2,
    },
    {
        title: "Finds",
        role: "Project Coordinator",
        period: "2024",
        description: "Coordinated a small cross-functional team to successfully develop a product (app) that directly contributed to a core operational pillar of a high-growth, Paris-based startup, Finds, delivered within an ambitious one-month deadline.",
        highlights: ["Product Launch", "Cross-functional Leadership", "Paris Startup"],
        icon: Rocket,
    },
    {
        title: "Under 25 Universe",
        role: "Event Coordinator",
        period: "2022 – 2023",
        description: "Contributed to a unique young team transforming youth culture into a student-powered leadership and learning ecosystem, helping build one of Asia’s largest youth festivals while actively involved in end-to-end event planning, coordination, and on-ground execution.",
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
