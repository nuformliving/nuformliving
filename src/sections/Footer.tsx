import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = {
  work: [
    { name: 'Eastside Residence', href: '#work' },
    { name: 'Northlight Loft', href: '#work' },
    { name: 'Garden Lane Kitchen', href: '#work' },
    { name: 'Studio Atelier', href: '#work' },
    { name: 'Harbor View Apartment', href: '#work' },
    { name: 'Maple House', href: '#work' },
    { name: 'View all', href: '#work' },
  ],
  studio: [
    { name: 'About', href: '#studio' },
    { name: 'Services', href: '#studio' },
    { name: 'Process', href: '#studio' },
    { name: 'Contact', href: '#contact' },
  ],
  journal: [
    { name: 'Latest posts', href: '#journal' },
    { name: 'Design tips', href: '#journal' },
    { name: 'Before & After', href: '#journal' },
    { name: 'Browse all', href: '#journal' },
  ],
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="section-flowing bg-dark py-20 z-[90] relative"
    >
      <div ref={contentRef} className="content-wrapper will-change-transform">
        {/* Top Section - CTA */}
        <div className="mb-16 pb-16 border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="headline-lg text-white mb-2">
                Ready to transform <span className="text-accent">your space?</span>
              </h3>
              <p className="body-text text-white/60">
                Let's create something beautiful together.
              </p>
            </div>
            <a
              href={`https://wa.me/2347071906095?text=Hi! I'm interested in discussing my interior design project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-accent text-white px-8 py-4 font-medium text-sm inline-flex items-center gap-2 hover:bg-white hover:text-[#111216] transition-colors"
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          {/* Logo & Contact Info */}
          <div className="col-span-12 md:col-span-4">
            {/* Text Logo */}
            <div className="mb-6">
              <div className="font-heading font-bold text-2xl text-white">
                NÜFORM <span className="text-accent">LIVING</span>
              </div>
              <div className="text-white/60 text-xs tracking-[0.15em] mt-1">ENTERPRISE</div>
              <div className="text-accent/80 text-xs italic mt-1">Designing Comfort. Creating Style.</div>
            </div>
            <p className="body-text text-white/60 mb-6">
              Full-service interior design studio based in Lagos, Nigeria. Creating calm, considered spaces built to last.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:nuformlivingenterprise@gmail.com"
                className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                nuformlivingenterprise@gmail.com
              </a>
              <a
                href="tel:+2347071906095"
                className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +234 707 190 6095
              </a>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </span>
            </div>
          </div>

          {/* Work Links */}
          <div className="col-span-6 md:col-span-2">
            <span className="mono-label text-white/40 block mb-4">WORK</span>
            <ul className="space-y-2">
              {navLinks.work.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-sm inline-block text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Links */}
          <div className="col-span-6 md:col-span-2">
            <span className="mono-label text-white/40 block mb-4">STUDIO</span>
            <ul className="space-y-2">
              {navLinks.studio.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-sm inline-block text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Journal Links */}
          <div className="col-span-6 md:col-span-2">
            <span className="mono-label text-white/40 block mb-4">JOURNAL</span>
            <ul className="space-y-2">
              {navLinks.journal.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-sm inline-block text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-6 md:col-span-2">
            <span className="mono-label text-white/40 block mb-4">SOCIAL</span>
            <div className="space-y-3">
              <a
                href="https://instagram.com/nuformliving"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@nuformliving</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white/40 text-sm">
            © 2026 NÜFORM LIVING ENTERPRISE. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
