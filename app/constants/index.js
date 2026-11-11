export const WORKEXPERIENCE = [
    {
        year:"Sep 2026 – Present",
        role:"Product Engineer",
        company:"SnapTrade (YC W22)",
        description: [
            "Plaid for trading"
        ],
        skills: [],
    },
    {
        year:"Jan 2026 – Apr 2026",
        role:"Technology Analyst (AI Engineering)",
        company:"Morgan Stanley",
        description: [
            "Built an autonomous AI agent that automates enterprise document processing, reducing a 24-hour developer workflow to 35 minutes.",
            "Engineered a Spring-based intermediary service using an MQ broker to power an event-driven document processing pipeline."
        ],
        skills: ["Agentic AI Development", "Distributed Systems", "LLM Agents", "MCP", "System Design"],
    },
    {
        year:"Sep 2025 – Present",
        role:"Co-Founder",
        company:"W.A.T.T wire",
        description: [
            "Growing a women in tech community through a weekly article series and in-person events.",
            "Organized Tech Sync, our first in-person event bringing together 140+ founders and builders in Montreal."
        ],
        skills: ["Community Building", "Event Planning", "Operations"],
    },
    {
        year:"May 2025 – Aug 2025",
        role:"Technology Analyst (Full-Stack Engineering)",
        company:"Morgan Stanley",
        description: [
            "Implemented user analytics and responsive UI/UX for an investment dashboard serving 20k+ clients, with production features showcased at the NY Tech Expo.",
            "Built a real-time search feature in Lit wired into a global message bus for 15k+ users."
        ],
        skills: ["TypeScript", "Spring Boot", "Lit", "Angular", "Java"],
    },
    {
        year:"Feb 2024 – Jul 2025",
        role:"Student Ambassador",
        company:"ShiftKey Labs",
        description: [
            <>Led a year-long startup program with Volta for Atlantic Canada, supporting early-stage founders from recruitment to Demo Day (featured <a href="https://lnkd.in/eXynyGYn" target="_blank" rel="noopener noreferrer" className="no-underline text-accent">here</a>).</>,
            "Organized hackathons, tech talks, workshops, and all things student startup community."
        ],
        skills: ["Program Management", "Event Planning", "Resource Management", "Team Collaboration"],
    },
];

export const PROJECTS = [
    {
        id: 1,
        title: "HarmonyNet",
        desc: "A distributed AI system that converts piano recordings into sheet music using a fine-tuned Transformer trained on the MAESTRO dataset.",
        img: "/images/harmonynet_cover.png",
        iconLists: ["/python.svg", "/pytorch.svg", "/musescore.svg"],
        link: "https://harmonynet.vercel.app/",
    },
    {
        id: 2,
        title: "ContextMirror",
        desc: "An AI personal context engine that connects your calendar, messages, and health data to surface behavioral patterns and insights across your life.",
        img: "/images/contextmirror_cover.png",
        iconLists: ["/python.svg", "/react.svg", "/rest.svg"],
        link: "https://github.com/NishevithaV/ContextMirror",
    },
    {
        id: 3,
        title: "Fund Her Dream",
        desc: "A full-stack AI crowdfunding platform with LLM-generated pitch creation, Stripe payments, and real-time funding updates.",
        img: "/images/fundherdream_cover.png",
        iconLists: ["/lovable.svg", "/anthropic.svg", "/stripe.svg", "/googlegemini.svg"],
        link: "https://fund-her-dream.vercel.app/",
    },
    {
        id: 4,
        title: "QuickCash",
        desc: "A location-based Android marketplace connecting users with nearby taskers, featuring secure payments, real-time notifications, and a reputation system.",
        img: "/images/quickcash_cover.png",
        iconLists: ["/android.svg", "/firebase.svg", "/googlemaps.svg", "/paypal.svg"],
        link: "https://github.com/NishevithaV/Quick-Cash",
    },
    {
        id: 5,
        title: "Preserving My Good Self Blog",
        desc: "A client blog built with STRAPI for CMS and React.js, offering a seamless and dynamic content management experience.",
        img: "/images/pmgs-cover.png",
        iconLists: ["/react.svg", "/strapi.svg", "/css.svg","/rest.svg"],
        link: "https://www.preservingmygoodself.com/",
    },
    {
        id: 6,
        title: "StockSentry",
        desc: "A GitHub-based stock tracker using Alpha Vantage and Pushbullet APIs to send daily push notifications on equity performance.",
        img: "/images/stocksentry-cover.png",
        iconLists: ["/python.svg", "/git.svg", "/rest.svg", "/pushbullet.svg"],
        link: "https://github.com/NishevithaV/StockSentry",
    },
    {
        id: 7,
        title: "SummaryAI",
        desc: "An AI-powered SaaS app for generating text summaries, featuring a responsive design, Redux state management, and efficient API integration.",
        img: "/images/summaryai-cover.png",
        iconLists: ["/react.svg", "/css.svg", "/rest.svg", "/redux.svg"],
        link: "https://summaryai-app.netlify.app/",
    },
    {
        id: 8,
        title: "Amazon API Scraper",
        desc: "A lightweight Node.js and Express API that uses ScraperAPI to fetch Amazon product data, reviews, offers, and search results.",
        img: "/images/amazon_logo.png",
        iconLists: ["/nodejs-icon.svg", "/git.svg", "/rest.svg"],
        link: "https://github.com/NishevithaV/Amazon-API-Scraper",
    },
];

export const ARTICLES = [
    {
        id: 1,
        title: "Building an AI System for Piano Transcription",
        type: "Deep Dive",
        desc: "A technical deep dive into HarmonyNet, covering how I built an AI pipeline that converts raw piano recordings into readable sheet music.",
        img: "/images/article_images/harmonynet_article.webp",
        link: "https://medium.com/@nishevitha.v/building-an-ai-system-for-piano-transcription-b9e20d7490a8",
    },
];

export const TALKS = [
    {
        id: 1,
        title: "Women in Tech Day: Cybersecurity Workshop",
        type: "Workshop",
        desc: "Hosted a workshop for high school students exploring cryptography, Caesar cipher, phishing attacks, and synthetic AI images, to show young women a place in tech.",
        img: "/images/talks_images/cybersec_workshop.jpeg",
        link: "https://www.linkedin.com/posts/nishevitha-venkatesh_i-had-the-opportunity-to-host-a-workshop-activity-7263306622230224898-_M4-?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADVOMaMB41YPUsTNXkbPu0HTKxZ3ty1AXME",
    },
    {
        id: 2,
        title: "Intro to Python for NeuroTech",
        type: "Workshop",
        desc: "Led an Intro to Python workshop for SURGE Innovation, introducing curious minds to the intersection of neuroscience and code for the first time.",
        img: "/images/talks_images/python_workshop.jpeg",
        link: "https://www.linkedin.com/posts/nishevitha-venkatesh_wrapped-up-an-amazing-intro-to-python-for-ugcPost-7317727112897990657-lirg?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADVOMaMB41YPUsTNXkbPu0HTKxZ3ty1AXME",
    },
    {
        id: 3,
        title: "Networking Fireside Chat",
        type: "Panel",
        desc: "Joined a fireside chat on the power of networking, sharing real stories and practical tips on building meaningful connections in tech.",
        img: "/images/talks_images/networking_panel.jpeg",
        link: "https://www.linkedin.com/posts/the-wisteria-project_womenintech-mentorship-computerscience-activity-7362228469247721473-wKQN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADVOMaMB41YPUsTNXkbPu0HTKxZ3ty1AXME",
    },
    {
        id: 4,
        title: "DevOpsDays Halifax",
        type: "Conference Talk",
        desc: "Spoke at DevOpsDays Halifax on how early-career developers think about DevOps, and why the environment around the tools matters just as much as the tools themselves for growth and impact.",
        img: "/images/talks_images/devops.jpeg",
        link: "https://www.linkedin.com/posts/nishevitha-venkatesh_devops-engineeringculture-ugcPost-7367742528403456000-KVVg?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADVOMaMB41YPUsTNXkbPu0HTKxZ3ty1AXME",
    },
    {
        id: 5,
        title: "Tech Talk Atlantic: Crypto, Blockchain & AI",
        type: "Conference Talk",
        desc: "Unpacked how crypto, blockchain and AI are evolving in 2025, from Bitcoin fundamentals and decentralized trust to stablecoins, tokenization, and the crossover between AI and decentralized compute.",
        img: "/images/talks_images/techtalkatlantic.jpeg",
        link: "https://www.linkedin.com/posts/nishevitha-venkatesh_techtalk-emergingtech-share-7403074252503158784-0RvN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADVOMaMB41YPUsTNXkbPu0HTKxZ3ty1AXME",
    },
];