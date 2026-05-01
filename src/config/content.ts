export type Sector = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export type WorkItem = {
    id: string;
    slug: string;
    title: string;
    client: string;
    industry: string;
    service: string;
    featuredImage: string;
    labels: string[];
    summary: string;
    content: string[];
    isComingSoon: boolean;
};

export type EditorialPost = {
    id: string;
    title: string;
    category: string;
    image: string;
    date: string;
    url: string;
};

// --- PLACEHOLDER DATA ---

export const sectors: Sector[] = [
    {
        id: '01',
        title: 'TECHNOLOGY',
        description: 'Empowering digital transformation',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '02',
        title: 'HEALTHCARE',
        description: 'Advancing human wellness',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
    },
    {
        id: '03',
        title: 'FINANCE',
        description: 'Reimagining global markets',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    }
];

export const workItems: WorkItem[] = [
    {
        id: 'work-1',
        slug: 'lumina-health',
        title: 'A new vision for digital healthcare',
        client: 'Lumina',
        industry: 'Healthcare',
        service: 'Brand Identity',
        featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
        labels: ['Brand Identity', 'Product Design', 'Web Development'],
        summary: 'Redefining the patient experience through intuitive design and accessible digital touchpoints.',
        content: [
            'Lumina approached us to completely overhaul their patient portal system.',
            'We focused on creating a frictionless experience that feels more like a modern consumer app than a medical utility.',
        ],
        isComingSoon: false,
    },
    {
        id: 'work-2',
        slug: 'strata-finance',
        title: 'Democratizing wealth management',
        client: 'Strata',
        industry: 'Finance',
        service: 'Product Design',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        labels: ['Strategy', 'Product Design'],
        summary: 'Making institutional-grade investment tools available to the everyday investor.',
        content: ['Full case study coming soon.'],
        isComingSoon: true,
    },
    {
        id: 'work-3',
        slug: 'aero-mobility',
        title: 'The future of urban transit',
        client: 'Aero',
        industry: 'Transportation',
        service: 'Digital Strategy',
        featuredImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
        labels: ['Digital Strategy', 'Mobile App'],
        summary: 'Connecting cities with sustainable, on-demand aerial transportation.',
        content: ['Full case study coming soon.'],
        isComingSoon: true,
    },
    {
        id: 'work-4',
        slug: 'nexus-robotics',
        title: 'Humanizing automation',
        client: 'Nexus',
        industry: 'Technology',
        service: 'Campaign',
        featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2098&auto=format&fit=crop',
        labels: ['Campaign', 'Web Development', '3D Motion'],
        summary: 'Changing the narrative around industrial automation through human-centric storytelling.',
        content: ['Full case study coming soon.'],
        isComingSoon: false,
    },
    {
        id: 'work-5',
        slug: 'echo-energy',
        title: 'Powering a sustainable grid',
        client: 'Echo',
        industry: 'Energy',
        service: 'Corporate Site',
        featuredImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop',
        labels: ['Web Development', 'Brand Strategy'],
        summary: 'A digital home for the leaders in renewable energy infrastructure.',
        content: ['Full case study coming soon.'],
        isComingSoon: false,
    },
    {
        id: 'work-6',
        slug: 'verve-media',
        title: 'Broadcasting the next generation',
        client: 'Verve',
        industry: 'Media',
        service: 'Brand Identity',
        featuredImage: 'https://images.unsplash.com/photo-1516280440502-861f1b2b8e3a?q=80&w=2070&auto=format&fit=crop',
        labels: ['Brand Identity', 'Motion Graphics'],
        summary: 'A dynamic visual system for a disruptive new media conglomerate.',
        content: ['Full case study coming soon.'],
        isComingSoon: true,
    },
    {
        id: 'work-7',
        slug: 'zenith-app',
        title: 'Mindfulness in motion',
        client: 'Zenith',
        industry: 'Wellness',
        service: 'Product Design',
        featuredImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop',
        labels: ['Product Design', 'Mobile App'],
        summary: 'A meditation app designed with frictionless onboarding and calm UI.',
        content: ['Full case study coming soon.'],
        isComingSoon: false,
    },
    {
        id: 'work-8',
        slug: 'alt-retail',
        title: 'The un-store experience',
        client: 'Alt',
        industry: 'Retail',
        service: 'Digital Strategy',
        featuredImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
        labels: ['E-commerce', 'Web Development'],
        summary: 'Reimagining luxury retail for a digital-native audience.',
        content: ['Full case study coming soon.'],
        isComingSoon: false,
    },
];

// Placeholder for 20 logos (using simple text/id references for now)
export const clientLogos = Array.from({ length: 20 }).map((_, i) => ({
    id: `logo-${i + 1}`,
    name: `Client ${i + 1}`,
    // In a real app, these would be SVGs or image paths
    placeholder: `LOGO ${i + 1}`
}));

export const editorialPosts: EditorialPost[] = [
    {
        id: 'post-1',
        title: 'On the convergence of physical and digital spaces',
        category: 'Insight',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        date: 'OCT 12, 2026',
        url: '#',
    },
    {
        id: 'post-2',
        title: 'Designing for attention in an era of infinite scroll',
        category: 'Opinion',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop',
        date: 'SEP 28, 2026',
        url: '#',
    },
    {
        id: 'post-3',
        title: 'Why premium brands are shifting toward quiet motion',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2059&auto=format&fit=crop',
        date: 'AUG 15, 2026',
        url: '#',
    }
];
