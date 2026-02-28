import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const micro = microRef.current;
    const logo = logoRef.current;

    if (!section || !bg || !headline || !subhead || !cta || !micro || !logo) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in
      loadTl.fromTo(bg,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Logo fade in
      loadTl.fromTo(logo,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.8'
      );

      // Headline words stagger
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
        '-=0.4'
      );

      // Subheadline + CTAs
      loadTl.fromTo([subhead, cta],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      // Micro label
      loadTl.fromTo(micro,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([bg, headline, subhead, cta, micro, logo], { opacity: 1, x: 0, y: 0 });
            gsap.set(bg, { scale: 1 });
          }
        }
      });

      // EXIT (70%-100%)
      scrollTl.fromTo(logo,
        { y: 0, opacity: 1 },
        { y: -20, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([subhead, cta],
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(micro,
        { y: 0, opacity: 1 },
        { y: 20, opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/hero_living_room.jpg"
        alt="Modern living room interior"
        className="bg-image will-change-transform"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-[1]" />

      {/* Logo - Top Center - Text Based for instant loading */}
      <div 
        ref={logoRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20 will-change-transform text-center"
      >
        <div className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight">
          NÜFORM <span className="text-accent">LIVING</span>
        </div>
        <div className="text-white/80 text-xs tracking-[0.2em] mt-1">ENTERPRISE</div>
        <div className="text-accent/90 text-xs italic mt-1">Designing Comfort. Creating Style.</div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="content-wrapper">
          <div className="max-w-[52vw]" style={{ marginLeft: '2vw' }}>
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="headline-xl text-white mb-6 will-change-transform"
            >
              <span className="word inline-block">QUIETLY</span>{' '}
              <span className="word inline-block text-accent">BOLD</span>
              <br />
              <span className="word inline-block">INTERIORS.</span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadRef}
              className="body-text-lg text-white/90 mb-8 max-w-md will-change-transform"
            >
              Full-service design for homes and boutique spaces—calm, considered, and built to last. 
              Designing Comfort. Creating Style.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 will-change-transform">
              <button 
                onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-pill bg-white text-[#111216] px-6 py-3 font-medium text-sm flex items-center gap-2 hover:bg-accent transition-colors duration-300"
              >
                View selected work
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/2347071906095?text=Hi! I'm interested in discussing my interior design project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-[#25D366] text-white px-6 py-3 font-medium text-sm flex items-center gap-2 hover:bg-[#128C7E] transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <a
                href="https://instagram.com/nuformliving"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @nuformliving
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom micro label */}
      <span
        ref={microRef}
        className="mono-label text-white/60 absolute bottom-24 left-[8vw] z-10 will-change-transform"
      >
        Scroll to explore
      </span>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm z-10">
        <div className="content-wrapper py-4">
          <div className="flex justify-center md:justify-start gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <span className="headline-md text-white block">12+</span>
              <span className="mono-label text-white/60">YEARS EXPERIENCE</span>
            </div>
            <div className="text-center md:text-left">
              <span className="headline-md text-white block">180+</span>
              <span className="mono-label text-white/60">PROJECTS COMPLETED</span>
            </div>
            <div className="text-center md:text-left hidden sm:block">
              <span className="headline-md text-white block">100%</span>
              <span className="mono-label text-white/60">CLIENT SATISFACTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
