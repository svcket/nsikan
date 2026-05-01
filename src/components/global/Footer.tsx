import Link from 'next/link';
import { SectionWrapper } from '@/components/SectionWrapper';

export function Footer() {
    return (
        <SectionWrapper id="global.footer" as="footer" className="bg-foreground text-background pt-32 pb-12 mt-24 rounded-t-3xl overflow-hidden relative">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
                    <div className="max-w-4xl">
                        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-8" data-cursor-hover>
                            READY TO <br /> TALK?
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                        <Link
                            href="mailto:hello@weareexample.com"
                            className="text-2xl md:text-4xl font-serif border-b-2 border-background hover:opacity-70 transition-opacity pb-2"
                            data-cursor-hover
                        >
                            hello@weareexample.com
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-t border-muted/20 pt-16">
                    <div>
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-widest mb-6">Explore</h3>
                        <ul className="space-y-3 font-semibold text-lg">
                            <li><Link href="/" className="hover:text-muted transition-colors" data-cursor-hover>Home</Link></li>
                            <li><Link href="/work" className="hover:text-muted transition-colors" data-cursor-hover>Our Work</Link></li>
                            <li><Link href="/about" className="hover:text-muted transition-colors" data-cursor-hover>About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-widest mb-6">Socials</h3>
                        <ul className="space-y-3 font-semibold text-lg">
                            <li><a href="#" className="hover:text-muted transition-colors" data-cursor-hover>Instagram</a></li>
                            <li><a href="#" className="hover:text-muted transition-colors" data-cursor-hover>LinkedIn</a></li>
                            <li><a href="#" className="hover:text-muted transition-colors" data-cursor-hover>Twitter</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 flex flex-col items-start md:items-end text-left md:text-right">
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-widest mb-6">Offices</h3>
                        <div className="flex gap-12">
                            <div>
                                <p className="font-semibold text-lg mb-1">London</p>
                                <p className="text-muted-foreground text-sm">123 Example Street<br />EC1A 1BB</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg mb-1">New York</p>
                                <p className="text-muted-foreground text-sm">456 Example Ave<br />NY 10001</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} EXAMPLE AGENCY.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-background transition-colors" data-cursor-hover>Privacy</Link>
                        <Link href="#" className="hover:text-background transition-colors" data-cursor-hover>Terms</Link>
                        <Link href="#" className="hover:text-background transition-colors" data-cursor-hover>Credits</Link>
                    </div>
                </div>
            </div>

            {/* Background massive text layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-background/5 pointer-events-none select-none whitespace-nowrap">
                EXAMPLE
            </div>
        </SectionWrapper>
    );
}
