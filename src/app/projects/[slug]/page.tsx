'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { urlFor } from '@/sanity/lib/image';
import Navigation from '@/components/global/Navigation';
import Footer from '@/components/home/Footer';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [project, setProject] = useState<any>(null);
  const [otherProjects, setOtherProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Use server-side API route to bypass Sanity CORS restrictions in production
        const res = await fetch(`/api/project/${slug}`)
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        const { project: projectData, otherProjects: others } = await res.json()
        setProject(projectData);
        setOtherProjects(others || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);


  // Client-side only shuffle to avoid hydration mismatch
  const [shuffledProjects, setShuffledProjects] = useState<any[]>([]);
  useEffect(() => {
    if (otherProjects.length > 0) {
      const shuffled = [...otherProjects].sort(() => 0.5 - Math.random());
      setShuffledProjects(shuffled.slice(0, 2));
    }
  }, [otherProjects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center opacity-20">
          <h1 className="text-xl font-serif italic animate-pulse">Loading Studio Content...</h1>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4 font-serif italic">Project not found</h1>
          <button onClick={() => router.push('/')} className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <main className="relative w-full bg-black min-h-screen text-[#FAF4FF]">
        {/* Micro-Progress Indicator */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100]"
          style={{ scaleX }}
        />
        
        {/* Global Noise Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[99]"
          style={{
            backgroundImage: `url("/assets/noise bg.png")`,
            backgroundRepeat: 'repeat',
          }}
        />

        <Navigation stage="ready" />

        <div className="px-4 md:px-10 pt-[60px] pb-0">
          
          {/* Back Button */}
          {/* <button 
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 text-sm font-sans mb-10 opacity-60 hover:opacity-100 transition-all duration-300"
          >
            <div className="p-2 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft size={14} />
            </div>
            <span className="tracking-wide">Back to Home</span>
          </button> */}

          {/* Hero Content Section */}
          <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center mt-10">
            
            {/* Branding - Clean & Floating */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto flex items-center justify-center overflow-hidden">
                {project.icon ? (
                  <Image 
                    src={urlFor(project.icon).url()} 
                    alt={project.title} 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="w-12 h-12 bg-white/5 rounded-full" />
                )}
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[56px] font-serif italic leading-[1.2] tracking-tight mb-8 max-w-[600px] whitespace-pre-line"
            >
              {project.headline || project.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[17px] leading-[1.5] opacity-60 max-w-[580px] font-sans text-center whitespace-pre-line"
            >
              {project.heroDescription}
            </motion.p>
          </div>
        </div>

          {/* Primary Hero Visual - TRUE Edge-to-Edge Breakout */}
        {(project.heroVisual || project.discoveryVisual || project.icon) && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-full h-screen bg-transparent overflow-hidden group relative flex items-center justify-center mt-[120px]"
          >
            {project.heroVisual?.video?.asset?.url ? (
              <video 
                src={project.heroVisual.video.asset.url} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-contain"
              />
            ) : (project.heroVisual?.image && (project.heroVisual.image.url || project.heroVisual.image.asset || project.heroVisual.image._ref)) ? (
              <img 
                src={project.heroVisual.image.url || urlFor(project.heroVisual.image).url()} 
                alt="" 
                className="w-full h-full object-contain block"
              />
            ) : (project.discoveryVisual?.image && (project.discoveryVisual.image.url || project.discoveryVisual.image.asset || project.discoveryVisual.image._ref)) ? (
              <img 
                src={project.discoveryVisual.image.url || urlFor(project.discoveryVisual.image).url()} 
                alt="" 
                className="w-full h-full object-contain block"
              />
            ) : (project.discoveryVisual && (project.discoveryVisual.url || project.discoveryVisual.asset || project.discoveryVisual._ref)) ? (
              <img 
                src={project.discoveryVisual.url || urlFor(project.discoveryVisual).url()} 
                alt="" 
                className="w-full h-full object-contain block"
              />
            ) : project.icon && (
              <div className="w-full h-full flex items-center justify-center p-20 opacity-20 grayscale">
                <Image 
                  src={urlFor(project.icon).url()} 
                  alt="" 
                  width={200}
                  height={200}
                  className="w-40 h-40 object-contain"
                />
              </div>
            )}
          </motion.div>
        )}

        <div className="px-4 md:px-10 pb-0">
          {/* Case Study Narrative */}
          <div className="flex flex-col items-center">
            {project.caseStudy?.map((section: any) => (
              <section 
                key={section._key} 
                className="w-full flex flex-col items-center pt-[120px]"
              >
                {section.sectionTitle && (
                  <div className="w-full max-w-[668px] mx-auto mb-[120px]">
                     <h2 className="text-[40px] font-serif italic leading-tight text-center opacity-30">
                        {section.sectionTitle}
                      </h2>
                  </div>
                )}

                <div className="w-full flex flex-col items-center"> 
                  {section.blocks?.map((block: any, bIdx: number) => {
                    const spacingClass = bIdx === 0 ? '' : 'mt-[120px]';

                    return (
                      <div 
                        key={block._key} 
                        className={`w-full flex flex-col items-center ${spacingClass}`}
                      >
                      
                      {/* Text Block */}
                      {block._type === 'textBlock' && (
                        <div className="w-full max-w-[668px] mx-auto">
                          {block.title && (
                            <h2 className="text-[40px] font-serif italic mb-10 leading-tight whitespace-pre-line">
                              {block.title}
                            </h2>
                          )}
                          <div className="space-y-8">
                            {block.content?.map((p: string, i: number) => (
                              <p key={i} className="text-[17px] leading-[1.6] opacity-60 font-sans">
                                {p}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grid Block */}
                      {block._type === 'gridBlock' && (
                        <div className="w-full max-w-screen-xl mx-auto flex flex-row items-center justify-center gap-[24px] flex-wrap md:flex-nowrap">
                          {block.gridItems?.map((item: any) => (
                            <div 
                              key={item._key}
                              className="overflow-hidden group relative flex items-center justify-center bg-transparent shrink-0 rounded-none"
                              style={{ height: item.height || 720, width: 'auto', aspectRatio: '9/19.5' }}
                            >
                              {item.video?.asset?.url ? (
                                <video 
                                  src={item.video.asset.url} 
                                  autoPlay 
                                  loop 
                                  muted 
                                  playsInline 
                                  className="h-full w-auto object-contain"
                                />
                               ) : (item.image && item.image.asset) && (
                                <div className="relative h-full w-full flex items-center justify-center">
                                  <img 
                                    src={item.image.url || urlFor(item.image).url()} 
                                    alt="" 
                                    className="h-full w-auto object-contain block"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Visual Block */}
                      {block._type === 'visualBlock' && (
                        <div 
                          className="overflow-hidden group relative mx-auto w-full max-w-[898px] flex items-center justify-center bg-transparent rounded-none"
                          style={{ height: block.height || 850, maxHeight: '85vh' }}
                        >
                          {block.video?.asset?.url ? (
                            <video 
                              src={block.video.asset.url} 
                              autoPlay 
                              loop 
                              muted 
                              playsInline 
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (block.image && (block.image.url || block.image.asset || block.image._ref)) ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img 
                                src={block.image.url || urlFor(block.image).url()} 
                                alt="" 
                                className="w-full h-full object-contain block"
                              />
                            </div>
                          ) : null}
                        </div>
                      )}

                      {/* Metrics Block */}
                      {block._type === 'metricsBlock' && (
                        <div className="w-full max-w-[668px] mx-auto">
                          <div className="bg-[#0A0A0A] border border-white/[0.08] p-4 rounded-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                              {block.metrics?.map((metric: any) => (
                                <div key={metric._key} className="flex flex-col gap-6">
                                  <div className="min-h-[32px] flex items-end">
                                    <div className="text-[28px] font-serif text-white leading-none">
                                      {metric.value}
                                    </div>
                                  </div>
                                  <p className="text-[15px] leading-[1.5] opacity-50 font-sans">
                                    {metric.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Insights Block */}
                      {block._type === 'insightsBlock' && (
                        <div className="w-full max-w-[668px] mx-auto">
                          <div className="grid grid-cols-1 gap-12">
                            {block.insights?.map((insight: any) => (
                              <div key={insight._key} className="flex flex-col gap-4">
                                <h4 className="text-[24px] font-serif italic text-white/90">
                                  {insight.title}
                                </h4>
                                <p className="text-[17px] leading-[1.6] opacity-60 font-sans">
                                  {insight.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* List Block */}
                      {block._type === 'listBlock' && (
                        <div className="w-full max-w-[668px] mx-auto">
                          <ul className="space-y-6">
                            {block.listItems?.map((item: string, i: number) => (
                              <li key={i} className="flex gap-4 items-start">
                                <span className="text-white/20 mt-2">—</span>
                                <p className="text-[17px] leading-[1.6] opacity-60 font-sans">
                                  {item}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  );})}
                </div>
              </section>
            ))}
          </div>

          {/* Final Large Visual - Edge-to-Edge Breakout */}
          {project.discoveryVisual && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-[120px] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[1080px] bg-transparent overflow-hidden group flex items-center justify-center rounded-none"
            >
              {project.discoveryVisual.video?.asset?.url ? (
                <video 
                  src={project.discoveryVisual.video.asset.url} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
              ) : (project.discoveryVisual.image && project.discoveryVisual.image.asset) && (
                <img 
                  src={project.discoveryVisual.image.url || urlFor(project.discoveryVisual.image).url()} 
                  alt="" 
                  className="w-full h-full object-cover block"
                />
              )}
            </motion.div>
          )}

          {/* Dynamic Other Projects Section */}
          {shuffledProjects.length > 0 && (
            <section className="pt-[120px] w-full max-w-[898px] mx-auto px-4 md:px-10 pb-20">
              <h2 className="text-[40px] font-serif italic text-center mb-16">Other Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {shuffledProjects.map((other) => (
                  <button 
                    key={other.slug}
                    onClick={() => router.push(`/projects/${other.slug}`)}
                    className="group bg-[#0A0A0A] border border-white/[0.08] p-4 text-left transition-all duration-500 hover:bg-[#111] overflow-hidden flex flex-col gap-10 rounded-none"
                  >
                    <div className="w-full aspect-[4/3] bg-black/40 rounded-none overflow-hidden relative flex items-center justify-center">
                      {other.heroVisual?.video?.asset?.url ? (
                        <video 
                          src={other.heroVisual.video.asset.url} 
                          autoPlay loop muted playsInline 
                          className={`w-full h-full object-contain block ${other.layout === 'mobile' ? 'object-top' : 'object-center'}`}
                        />
                      ) : other.heroVisual?.image ? (
                        <img 
                          src={other.heroVisual.image.url || urlFor(other.heroVisual.image).url()} 
                          alt="" 
                          className={`w-full h-full object-contain block ${other.layout === 'mobile' ? 'object-top' : 'object-center'}`} 
                        />
                      ) : other.discoveryVisual?.video?.asset?.url ? (
                        <video 
                          src={other.discoveryVisual.video.asset.url} 
                          autoPlay loop muted playsInline 
                          className={`w-full h-full object-contain block ${other.layout === 'mobile' ? 'object-top' : 'object-center'}`}
                        />
                      ) : other.discoveryVisual?.image ? (
                        <img 
                          src={other.discoveryVisual.image.url || urlFor(other.discoveryVisual.image).url()} 
                          alt="" 
                          className={`w-full h-full object-contain block ${other.layout === 'mobile' ? 'object-top' : 'object-center'}`} 
                        />
                      ) : other.icon ? (
                        <img src={urlFor(other.icon).url()} alt="" className="w-10 h-10 opacity-20 grayscale block object-contain" />
                      ) : (
                        <div className="w-10 h-10 bg-white/5 rounded-none" />
                      )}
                    </div>
 
                    <div className="space-y-6">
                      <h3 className="text-[32px] font-serif italic text-white leading-tight">
                        {other.title.split(' - ')[0]}
                      </h3>
                      <p className="text-[13px] leading-[1.4] opacity-50 font-sans line-clamp-2">
                        {other.heroDescription}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

        </div>

        <Footer />
      </main>
    </ReactLenis>
  );
}
