export interface Project {
  slug: string;
  title: string;
  headline?: string;
  description: string;
  caseStudyHref: string;
  liveSiteHref: string;
  type: 'mobile' | 'web';
  icon?: string;
  caseStudy?: {
    sections: {
      id: string;
      blocks: {
        type: 'text' | 'visual' | 'insights' | 'list' | 'grid' | 'metrics';
        title?: string;
        content?: string | string[];
        listItems?: string[];
        insights?: { title: string; text: string }[];
        metrics?: { label: string; value: string; description: string }[];
        visualSize?: { width: number; height: number };
        gridItems?: { width: number; height: number }[];
      }[];
    }[];
  };
}

export const projects: Project[] = [
  { 
    slug: "ping", 
    title: "Ping - Formerly Gamic", 
    description: "Ping is a complete reinvention of social interaction in Web3, offering a secure and decentralized alternative for communities to connect, trade, and grow together.", 
    headline: "Designing a Web3 Social and Finance Hub",
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile",
    icon: "/assets/ping-logo.png",
    caseStudy: {
      sections: [
        {
          id: "rethinking",
          blocks: [
            {
              type: 'text',
              title: "Rethinking Social in Web3",
              content: [
                "Most Web3 products felt like mazes—wallets, chats, DeFi dashboards — scattered across platforms, clunky to use, and intimidating for new adopters. When I joined Gamic HQ, the challenge was simple to state but complex to solve: create a single platform where social connection and decentralized finance could co-exist naturally.",
                "Our audience wasn't just crypto-natives. It was Web2 users curious about Web3, creators building communities, and everyday people looking for a place to connect and grow. They didn't want another Discord clone or a DeFi tool dressed up as 'community.' They wanted clarity, safety, and reward for their time."
              ]
            }
          ]
        },
        {
          id: "groundwork",
          blocks: [
            {
              type: 'text',
              title: "Groundwork: Listening Before Building",
              content: "Through dozens of interviews with creators, community managers, and curious Web2 users, a clear pattern emerged: the promise of Web3 was inspiring, but the path to it was exhausting."
            },
            {
              type: 'insights',
              insights: [
                { title: "Onboarding was a cliff, not a bridge.", text: "For most newcomers, connecting a wallet at signup felt like being asked to hand over your house keys to a stranger. Trust evaporated before the journey even began." },
                { title: "Communities lived in fragments.", text: "Discord for chatter, Telegram for updates, Google Sheets for tracking tokens, and five different wallets for transactions. Building belonging meant juggling apps." },
                { title: "Motivation slipped away.", text: "Without rewards or recognition, communities were like campfires that burned bright and died fast. Engagement was fragile, always one distraction away from collapse." },
                { title: "The language itself was hostile.", text: "Staking, gas fees, bridging—terms that made seasoned crypto users nod but left Web2 newcomers feeling alienated, embarrassed, or simply excluded." }
              ]
            },
            {
              type: 'text',
              content: [
                "What we uncovered wasn't just usability issues—it was a trust deficit. People wanted to be part of Web3, but they needed a space that felt safe, intuitive, and rewarding from the very first click.",
                "This became our design mandate: reduce friction, restore trust, and weave social and finance into one seamless flow."
              ]
            }
          ]
        },
        {
          id: "visual-1",
          blocks: [
            {
              type: 'visual',
              visualSize: { width: 1130, height: 800 }
            }
          ]
        },
        {
          id: "foundations",
          blocks: [
            {
              type: 'text',
              title: "Building the Foundations:\nDesign System & Flows",
              content: [
                "To scale, I built a modular design system using Reyna UI as a foundation — ensuring that every component, from buttons to dashboards, stayed consistent across complex user journeys.",
                "Prototyping became our testing ground. Each iteration revealed new truths:"
              ]
            },
            {
              type: 'list',
              listItems: [
                "Onboarding needed multiple entry paths (email, social logins, custodial wallets) before users felt safe enough to integrate fully.",
                "Communities thrived when creation was fast and playful — token airdrops in chat turned contributors into collaborators.",
                "Navigation had to feel like a social app first, finance app second — conversations, not charts, anchored the experience."
              ]
            },
            {
              type: 'visual',
              visualSize: { width: 1130, height: 800 }
            }
          ]
        },
        {
          id: "complexity",
          blocks: [
            {
              type: 'text',
              title: "Breaking Complexity Into Experiences",
              content: [
                "Designing Gamic wasn't about adding features; it was about taming chaos. Each decision had to turn friction into flow, confusion into clarity, and hesitation into trust.",
                "What followed was a series of intentional choices — moments where we reimagined what a Web3 product could feel like. Not tools stitched together, but experiences that worked in harmony."
              ]
            },
            {
              type: 'visual',
              visualSize: { width: 1130, height: 800 }
            }
          ]
        },
        {
          id: "onboarding",
          blocks: [
            {
              type: 'text',
              title: "Onboarding Without Friction",
              content: [
                "Complexity shouldn't be the entry price for Web3. We reconstructed the flow to accommodate multiple entry points — allowing users to sign up with social logins or email, with custodial wallets bridging the gap until they were ready for full decentralization.",
                "The result was an experience that felt like their favorite Web2 apps but with the hidden power of Web3."
              ]
            },
            {
              type: 'grid',
              gridItems: [
                { width: 550, height: 800 },
                { width: 550, height: 800 }
              ]
            },
            {
              type: 'visual',
              visualSize: { width: 1130, height: 800 }
            }
          ]
        },
        {
          id: "conversations",
          blocks: [
            {
              type: 'text',
              title: "Conversations That Travel With You",
              content: [
                "Messaging is the core experience — but in Gamic, chat is more than talk. It's where you trade, tip, and govern. We reimagined the system to be social-first, ensuring that finance tools never disrupted the natural flow of conversation.",
                "The interface was built to be context-aware, making Gamic feel like the home base for your digital life."
              ]
            },
            {
              type: 'grid',
              gridItems: [
                { width: 550, height: 800 },
                { width: 550, height: 800 }
              ]
            },
            {
              type: 'visual',
              visualSize: { width: 1130, height: 800 }
            }
          ]
        },
        {
          id: "wallet",
          blocks: [
            {
              type: 'text',
              title: "A Wallet That Doesn't Intimidate",
              content: "Crypto wallets are often static and intimidating. We designed Gamic's wallet to feel familiar and approachable while still powerful."
            },
            {
              type: 'list',
              listItems: [
                "Fund with fiat or crypto",
                "Swap, bridge, or off-ramp directly",
                "Share addresses and track balances without friction"
              ]
            },
            {
              type: 'text',
              content: "Instead of hiding finance behind jargon, we wove it into everyday actions. Sending tokens could feel as natural as sending a message."
            },
            {
              type: 'grid',
              gridItems: [
                { width: 550, height: 800 },
                { width: 550, height: 800 }
              ]
            },
            {
              type: 'visual',
              visualSize: { width: 1130, height: 800 }
            }
          ]
        },
        {
          id: "metrics",
          blocks: [
            {
              type: 'text',
              title: "Key Metrics"
            },
            {
              type: 'metrics',
              metrics: [
                { label: "Adoption", value: "300,000+", description: "Users onboarded within the first three days of launch, showing massive early adoption." },
                { label: "Efficiency", value: "40%", description: "Reduction in onboarding drop-off after introducing flexible signup methods." },
                { label: "Engagement", value: "65%", description: "Increase in active conversations after unifying decentralized chat and communities." },
                { label: "Growth", value: "2.5x", description: "Growth in community participation driven by tokens, NFT rewards, and incentives." },
                { label: "Confidence", value: "$1.8M", description: "Secured in funding through Binance Labs incubation, validating product market confidence." },
                { label: "Recognition", value: "Industry Recognition", description: "Gamic earned the Best Web3 App in Nigeria (2023) and recognized as the only African product incubated by Binance Labs in 2023." }
              ]
            }
          ]
        }
      ]
    }
  },
  { 
    slug: "torq", 
    title: "Torq", 
    description: "We are defining the strategy for Addmind’s new Dubai Harbour F&B precinct and building the place.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "web" 
  },
  { 
    slug: "breedjr", 
    title: "Breedjr", 
    description: "A dedicated platform for livestock management and agricultural innovation.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "web" 
  },
  { 
    slug: "isang", 
    title: "Isang", 
    description: "A premium hospitality and lifestyle experience designed for the modern traveler.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "web" 
  },
  { 
    slug: "masomo-ai", 
    title: "Masomo AI", 
    description: "Revolutionizing education through personalized AI-driven learning journeys.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "lecoindine", 
    title: "Lécoindine", 
    description: "Curated dining experiences and culinary storytelling for the refined palate.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "siroma", 
    title: "Siroma", 
    description: "Innovative workspace solutions for the next generation of creative teams.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "lstnr", 
    title: "Lstnr", 
    description: "An immersive audio platform for discovering and sharing unique soundscapes.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "plugin", 
    title: "Plugin", 
    description: "The essential bridge between digital tools and creative workflows.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "esbabi", 
    title: "'esbabi", 
    description: "A heritage-focused brand identity project celebrating traditional craftsmanship.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "pumpy-family", 
    title: "Pumpy Family", 
    description: "Building a vibrant community around shared values and collective growth.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "web" 
  },
  { 
    slug: "baird", 
    title: "Baird", 
    description: "Sophisticated financial management tools for established institutions.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
  { 
    slug: "your-work-buddy", 
    title: "Your Work Buddy", 
    description: "A dedicated companion for professional productivity and focus management.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "web" 
  },
  { 
    slug: "send-me", 
    title: "Send Me", 
    description: "Redefining logistics and personal delivery services with absolute precision.", 
    caseStudyHref: "#", 
    liveSiteHref: "#", 
    type: "mobile" 
  },
];
