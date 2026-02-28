import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const meta = metaRef.current;
    const card = cardRef.current;

    if (!section || !bg || !headline || !meta || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(bg,
        { scale: 1.12, x: '-6vw' },
        { scale: 1.00, x: 0, ease: 'none' },
        0
      );

      const headlineWords = headline.querySelectorAll('.word');
      scrollTl.fromTo(headlineWords,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(meta,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.12
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

      // SETTLE (30%-70%): Hold

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

      scrollTl.fromTo(meta,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.78
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
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/project_eastside_living.jpg"
        alt="Eastside Residence living room"
        className="bg-image will-change-transform"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="content-wrapper w-full">
          {/* Left Headline */}
          <div className="max-w-[44vw]" style={{ marginLeft: '2vw' }}>
            <h2
              ref={headlineRef}
              className="headline-lg text-white mb-8 will-change-transform"
            >
              <span className="word inline-block text-accent">EASTSIDE</span>
              <br />
              <span className="word inline-block">RESIDENCE.</span>
            </h2>
          </div>

          {/* Bottom Meta */}
          <div
            ref={metaRef}
            className="absolute bottom-[10vh] left-[8vw] flex gap-12 will-change-transform"
          >
            <div>
              <span className="mono-label text-white/60 block mb-1">LOCATION</span>
              <span className="body-text-lg text-white">AUSTIN, TX</span>
            </div>
            <div>
              <span className="mono-label text-white/60 block mb-1">YEAR</span>
              <span className="body-text-lg text-white">2024</span>
            </div>
          </div>

          {/* Right Card */}
          <div
            ref={cardRef}
            className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[30vw] min-w-[320px] bg-white/95 backdrop-blur-sm card-rounded card-shadow p-8 will-change-transform"
          >
            <span className="mono-label text-[#6E727A] card-content block mb-4">CONCEPT</span>
            <p className="body-text text-[#111216] card-content mb-6">
              We opened the plan, added hidden storage, and let the light do the decorating. The result feels bigger without adding square footage.
            </p>
            <a
              href="#project"
              className="card-content inline-flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
            >
              See the full tour
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
