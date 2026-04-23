export const WORKEXPERIENCE = [
    {
        year:"Jan 2026 – Present",
        role:"Technology Analyst",
        company:"Morgan Stanley",
        description: [
            "Applied AI/ML Software Development"
        ],
        skills: [],
    },
    {
        year:"May 2025 – Aug 2025",
        role:"Technology Analyst (Full-Stack)",
        company:"Morgan Stanley",
        description: [
            "Implemented user analytics and responsive UI/UX for an investment dashboard with over 20k+ clients, with production features showcased at the NY Tech Expo.",
            "Engineered a high-performance real-time search functionality in Lit, integrating APIs, message buses, and debounce logic to support 15k+ global users.",
            "Delivered accessibility compliance and advanced analytics tracking, with accessibility features reaching 10% adoption in 2 months and analytics rolled out to clients within 6 weeks of release."
        ],
        skills: ["TypeScript", "Spring Boot", "Lit", "Angular", "Bootstrap", "Java", "Git", "Vim"],
    },
    {
        year:"Feb 2024 – Jul 2025",
        role:"Student Ambassador",
        company:"ShiftKey Labs",
        description: [
            <>Coordinated a year-long student startup program in collaboration with Volta (featured <a href="https://lnkd.in/eXynyGYn" target="_blank" rel="noopener noreferrer" className="no-underline text-fuchsia-400">here</a>), overseeing logistics, recruiting early-stage founders, running monthly industry and mentorship sessions, and producing the final demo showcase</>,
            "Organized hackathons, tech talks, and workshops in collaboration with the Faculty of Computer Science",
            "Hosted speaker series and technical workshops to foster community, highlight diverse voices in tech, and spark conversations around topics like UI/UX, data science, and fintech"
        ],
        skills: ["Program Development", "Event Coordination", "Resource Management", "Team Collaboration"],
    },
    {
        year:"June 2024 – Aug 2024",
        role:"Freelance Web Developer",
        company:"Preserving My Good Self",
        description: [
            "Developed a dynamic research portfolio website using ReactJS for front-end and Strapi CMS for content management.",
            "Collaborated with a UI/UX designer to optimize user experience, integrating feedback and responsive design principles to improve page load times.",
            "Ensured cross-browser compatibility and mobile responsiveness for a seamless user experience.",
            "Deployed the website on Render, automating the deployment pipeline and streamlining the domain connection process."
        ],
        skills: ["React.js", "CMS", "REST APIs", "HTML5", "CSS"],
    },
    {
        year:"May 2024 – Aug 2024",
        role:"Software Developer Intern",
        company:"Silver Arrow Logistics Solutions Pvt Ltd.",
        description: [
            "Developed a middleware API to enhance real-time data processing with RESTful APIs.",
            "Architected AWS infrastructure using EC2 instances for improved deployment efficiency.",
            "Implemented a data migration strategy to DynamoDB, ensuring data integrity with Drools rules."
        ],
        skills: ["AWS EC2","RESTful APIs","DynamoDB", "Postman", "Drools"],
    },
];

export const PROJECTS = [
    {
        id: 1,
        title: "HarmonyNet",
        desc: "An AI system that converts piano recordings into sheet music using a fine-tuned Transformer trained on the MAESTRO dataset.",
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