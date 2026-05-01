export type SectionId =
    // GLOBAL
    | 'global.learnMoreMenu'
    | 'global.navbar'
    | 'global.footer'
    // HOME
    | 'hero'
    | 'mission'
    | 'horizontal-gallery'
    | 'work-grid'
    | 'brands'
    | 'newsletter'
    | 'home.heroIntro'
    | 'home.heroMediaStrip'
    | 'home.featuredSectorsCarousel'
    | 'home.manifestoBigType'
    | 'home.featuredWorkTeasers'
    | 'home.attentionManifesto'
    | 'home.clientLogoWall'
    | 'home.weHelpMarquee'
    | 'home.newsletterEtcetera'
    | 'home.editorialCards'
    | 'home.podcastBlock'
    // ABOUT

    | 'about.heroFounded'
    | 'about.introStoryAndStats'
    | 'about.partnerLogoWall'
    | 'about.capabilityBlocksCreate'
    | 'about.capabilityBlocksDesign'
    | 'about.capabilityBlocksShape'
    | 'about.capabilityBlocksAmplify'
    | 'about.awardsGrid'
    // WHAT WE DO
    | 'wwd.filterHeader'
    | 'wwd.resultsCount'
    | 'wwd.workResultsGrid'
    // WORK DETAIL
    | 'work.heroTitle'
    | 'work.tagChips'
    | 'work.featureImage'
    | 'work.bodyCopy'
    | 'work.relatedWork';

export type SectionConfig = {
    id: SectionId;
    enabled: boolean;
};

export const globalSections: Record<string, SectionConfig> = {
    navbar: { id: 'global.navbar', enabled: true },
    learnMoreMenu: { id: 'global.learnMoreMenu', enabled: true },
    footer: { id: 'global.footer', enabled: true }
};

export const pageSections: Record<string, SectionConfig> = {
    // NEW ONES
    'hero': { id: 'hero', enabled: true },
    'mission': { id: 'mission', enabled: true },
    'horizontal-gallery': { id: 'horizontal-gallery', enabled: true },
    'work-grid': { id: 'work-grid', enabled: true },
    'brands': { id: 'brands', enabled: true },
    'newsletter': { id: 'newsletter', enabled: true },

    // HOME PAGE SECTIONS
    'home.heroIntro': { id: 'home.heroIntro', enabled: true },
    'home.heroMediaStrip': { id: 'home.heroMediaStrip', enabled: true },
    'home.featuredSectorsCarousel': { id: 'home.featuredSectorsCarousel', enabled: true },
    'home.manifestoBigType': { id: 'home.manifestoBigType', enabled: true },
    'home.featuredWorkTeasers': { id: 'home.featuredWorkTeasers', enabled: true },
    'home.attentionManifesto': { id: 'home.attentionManifesto', enabled: true },
    'home.clientLogoWall': { id: 'home.clientLogoWall', enabled: true },
    'home.weHelpMarquee': { id: 'home.weHelpMarquee', enabled: true },
    'home.newsletterEtcetera': { id: 'home.newsletterEtcetera', enabled: true },
    'home.editorialCards': { id: 'home.editorialCards', enabled: true },
    'home.podcastBlock': { id: 'home.podcastBlock', enabled: true },

    // ABOUT PAGE SECTIONS
    'about.heroFounded': { id: 'about.heroFounded', enabled: true },
    'about.introStoryAndStats': { id: 'about.introStoryAndStats', enabled: true },
    'about.partnerLogoWall': { id: 'about.partnerLogoWall', enabled: true },
    'about.capabilityBlocksCreate': { id: 'about.capabilityBlocksCreate', enabled: true },
    'about.capabilityBlocksDesign': { id: 'about.capabilityBlocksDesign', enabled: true },
    'about.capabilityBlocksShape': { id: 'about.capabilityBlocksShape', enabled: true },
    'about.capabilityBlocksAmplify': { id: 'about.capabilityBlocksAmplify', enabled: true },
    'about.awardsGrid': { id: 'about.awardsGrid', enabled: true },

    // WHAT WE DO PAGE SECTIONS
    'wwd.filterHeader': { id: 'wwd.filterHeader', enabled: true },
    'wwd.resultsCount': { id: 'wwd.resultsCount', enabled: true },
    'wwd.workResultsGrid': { id: 'wwd.workResultsGrid', enabled: true },

    // WORK DETAIL PAGE SECTIONS
    'work.heroTitle': { id: 'work.heroTitle', enabled: true },
    'work.tagChips': { id: 'work.tagChips', enabled: true },
    'work.featureImage': { id: 'work.featureImage', enabled: true },
    'work.bodyCopy': { id: 'work.bodyCopy', enabled: true },
    // Related work is disabled by default per requirements
    'work.relatedWork': { id: 'work.relatedWork', enabled: false },
};

export function isSectionEnabled(id: SectionId | undefined): boolean {
    if (!id) return false;

    if (id.startsWith('global.')) {
        const globalKey = Object.keys(globalSections).find(k => globalSections[k].id === id);
        if (globalKey) return globalSections[globalKey].enabled;
    }

    return pageSections[id]?.enabled ?? false;
}
