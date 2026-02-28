import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, MessageCircle, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
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
          end: '+=120%',
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
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(card,
        { x: '55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.08
      );

      const cardContent = card.querySelectorAll('.card-content');
      scrollTl.fromTo(cardContent,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.16
      );

      // EXIT (70%-100%) - Keep visible longer for last pinned scene
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bg,
        { scale: 1 },
        { scale: 1.04, ease: 'none' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pinned z-[80]"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/contact_moody_living.jpg"
        alt="Moody living room interior"
        className="bg-image will-change-transform"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="content-wrapper w-full">
          {/* Left Headline */}
          <div className="max-w-[46vw]" style={{ marginLeft: '2vw' }}>
            <h2
              ref={headlineRef}
              className="headline-lg text-white mb-8 will-change-transform"
            >
              <span className="word inline-block text-accent">READY</span>{' '}
              <span className="word inline-block">WHEN</span>
              <br />
              <span className="word inline-block">YOU</span>{' '}
              <span className="word inline-block">ARE.</span>
            </h2>
            <p className="body-text-lg text-white/80 max-w-md">
              Let's create something beautiful together. Reach out and let's discuss your vision.
            </p>
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
              <div className="text-[#6E727A] text-xs tracking-[0.15em]">ENTERPRISE</div>
            </div>
            
            <span className="mono-label text-[#6E727A] card-content block mb-4">START A PROJECT</span>
            <p className="body-text text-[#111216] card-content mb-6">
              Tell us what you're building. We'll respond within two business days.
            </p>
            
            {/* Contact Info */}
            <div className="card-content space-y-3 mb-6">
              <a
                href="tel:+2347071906095"
                className="flex items-center gap-3 text-[#111216] hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-[#6E727A] block">Call us</span>
                  <span className="font-medium">+234 707 190 6095</span>
                </div>
              </a>
              <a
                href="mailto:nuformlivingenterprise@gmail.com"
                className="flex items-center gap-3 text-[#111216] hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-[#6E727A] block">Email us</span>
                  <span className="font-medium text-sm">nuformlivingenterprise@gmail.com</span>
                </div>
              </a>
              <div className="flex items-center gap-3 text-[#111216]">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-[#6E727A] block">Location</span>
                  <span className="font-medium">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card-content flex gap-3 mb-6">
              <a
                href={`https://wa.me/2347071906095?text=Hi! I'm interested in discussing my interior design project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-pill bg-[#25D366] text-white px-4 py-3 font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/nuformliving"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-pill bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-3 font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>

            <p className="card-content text-xs text-[#6E727A] text-center">
              Available Monday - Saturday, 9 AM - 6 PM WAT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
