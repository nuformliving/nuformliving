import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: '01', title: 'Discover + define' },
  { number: '02', title: 'Design + refine' },
  { number: '03', title: 'Build support' },
  { number: '04', title: 'Styling + handover' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !bg || !headline || !card) return;

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
        { scale: 1.10, x: '6vw' },
        { scale: 1.00, x: 0, ease: 'none' },
        0
      );

      const headlineWords = headline.querySelectorAll('.word');
      scrollTl.fromTo(headlineWords,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(card,
        { x: '55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.08
      );

      const stepItems = card.querySelectorAll('.step-item');
      scrollTl.fromTo(stepItems,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.14
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
      className="section-pinned z-[60]"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/process_kitchen.jpg"
        alt="Modern kitchen interior"
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
              <span className="word inline-block">A</span>{' '}
              <span className="word inline-block text-accent">CLEAR</span>{' '}
              <span className="word inline-block">PROCESS.</span>
              <br />
              <span className="word inline-block">NO</span>{' '}
              <span className="word inline-block">GUESSWORK.</span>
            </h2>
          </div>

          {/* Right Card */}
          <div
            ref={cardRef}
            className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[30vw] min-w-[320px] bg-white/95 backdrop-blur-sm card-rounded card-shadow p-8 will-change-transform"
          >
            <span className="mono-label text-[#6E727A] block mb-6">HOW WE WORK</span>
            <div className="space-y-5 mb-8">
              {steps.map((step, index) => (
                <div key={index} className="step-item flex items-center gap-4">
                  <span className="mono-label text-accent">{step.number}</span>
                  <span className="body-text text-[#111216]">{step.title}</span>
                </div>
              ))}
            </div>
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
            >
              See a typical timeline
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
