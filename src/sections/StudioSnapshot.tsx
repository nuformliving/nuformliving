import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Users, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StudioSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const stats = statsRef.current;
    const card = cardRef.current;

    if (!section || !bg || !headline || !stats || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(bg,
        { scale: 1.10, y: '10vh' },
        { scale: 1.00, y: 0, ease: 'none' },
        0
      );

      const headlineWords = headline.querySelectorAll('.word');
      scrollTl.fromTo(headlineWords,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      const statItems = stats.querySelectorAll('.stat-item');
      scrollTl.fromTo(statItems,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.10
      );

      scrollTl.fromTo(card,
        { x: '55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.08
      );

      const cardContent = card.querySelectorAll('.card-content');
      scrollTl.fromTo(cardContent,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.16
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(statItems,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-4vh', ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/studio_hallway.jpg"
        alt="Minimal hallway interior"
        className="bg-image will-change-transform"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="content-wrapper w-full">
          {/* Left Headline */}
          <div className="max-w-[46vw]" style={{ marginLeft: '2vw' }}>
            <h2
              ref={headlineRef}
              className="headline-lg text-white mb-8 will-change-transform"
            >
              <span className="word inline-block">A</span>{' '}
              <span className="word inline-block text-accent">SMALL</span>{' '}
              <span className="word inline-block">STUDIO</span>
              <br />
              <span className="word inline-block">WITH</span>{' '}
              <span className="word inline-block">BIG</span>{' '}
              <span className="word inline-block">RANGE.</span>
            </h2>
          </div>

          {/* Stats Row */}
          <div
            ref={statsRef}
            className="absolute bottom-[10vh] left-[8vw] flex gap-12 will-change-transform"
          >
            <div className="stat-item flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <span className="mono-label text-white/60 block mb-1">EXPERIENCE</span>
                <span className="headline-md text-white">12+ YEARS</span>
              </div>
            </div>
            <div className="stat-item flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <span className="mono-label text-white/60 block mb-1">COMPLETED</span>
                <span className="headline-md text-white">180+ PROJECTS</span>
              </div>
            </div>
            <div className="stat-item flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <span className="mono-label text-white/60 block mb-1">AVAILABILITY</span>
                <span className="headline-md text-white">REMOTE FRIENDLY</span>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div
            ref={cardRef}
            className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[30vw] min-w-[320px] bg-white/95 backdrop-blur-sm card-rounded card-shadow p-8 will-change-transform"
          >
            {/* Text Logo */}
            <div className="mb-4 card-content">
              <div className="font-heading font-bold text-lg text-[#111216]">
                NÜFORM <span className="text-accent">LIVING</span>
              </div>
              <div className="text-[#6E727A] text-xs tracking-[0.15em] mt-0.5">ENTERPRISE</div>
            </div>
            
            <span className="mono-label text-[#6E727A] card-content block mb-4">ABOUT US</span>
            <p className="body-text text-[#111216] card-content mb-6">
              We design homes that feel open, light, and lived-in—then we help you build them without the chaos. Our philosophy is simple: <strong>Designing Comfort. Creating Style.</strong>
            </p>
            <p className="body-text text-[#6E727A] card-content mb-6">
              Based in Lagos, Nigeria, we serve clients across the country and beyond. From concept to completion, we handle every detail so you can enjoy the transformation journey.
            </p>
            <button 
              onClick={() => document.querySelector('#studio')?.scrollIntoView({ behavior: 'smooth' })}
              className="card-content inline-flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
            >
              Explore our services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
