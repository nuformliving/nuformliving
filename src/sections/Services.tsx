import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, X, Download, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Interior Design + Spatial Planning',
    description: 'Complete design solutions that transform your space into a harmonious, functional environment.',
    details: [
      'Space planning and layout optimization',
      '3D visualization and renderings',
      'Color palette development',
      'Material and finish selection',
      'Custom furniture design',
      'Project management from concept to completion'
    ],
    icon: 'design'
  },
  {
    id: 2,
    title: 'Materials + Finishes Selection',
    description: 'Curated selection of premium materials that bring your vision to life with quality and durability.',
    details: [
      'Flooring selection (hardwood, tile, carpet)',
      'Wall treatments and paint colors',
      'Countertop materials',
      'Cabinetry and millwork finishes',
      'Hardware and fixture selection',
      'Sustainable material options'
    ],
    icon: 'materials'
  },
  {
    id: 3,
    title: 'Furniture, Art + Styling',
    description: 'Thoughtful curation of pieces that reflect your personality and create a cohesive aesthetic.',
    details: [
      'Furniture sourcing and procurement',
      'Custom upholstery and drapery',
      'Artwork and accessory selection',
      'Styling and arrangement',
      'Vintage and antique sourcing',
      'Installation and placement'
    ],
    icon: 'styling'
  },
  {
    id: 4,
    title: 'Contractor Coordination',
    description: 'Seamless project execution through trusted partnerships with skilled tradespeople.',
    details: [
      'Vendor and contractor selection',
      'Quote comparison and negotiation',
      'Timeline management',
      'Quality control inspections',
      'Budget tracking and management',
      'Final walkthrough and punch list'
    ],
    icon: 'coordination'
  },
];

const processSteps = [
  { number: '01', title: 'Discover + Define', description: 'We learn about your lifestyle, preferences, and goals through in-depth consultations.' },
  { number: '02', title: 'Design + Refine', description: 'We develop concepts, present options, and perfect every detail together.' },
  { number: '03', title: 'Build Support', description: 'We coordinate with contractors and vendors to bring the design to life.' },
  { number: '04', title: 'Styling + Handover', description: 'We add the finishing touches and reveal your transformed space.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [showCapabilities, setShowCapabilities] = useState(false);

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

      scrollTl.fromTo(bg,
        { scale: 1.10, y: '8vh' },
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

      const listItems = card.querySelectorAll('.list-item');
      scrollTl.fromTo(listItems,
        { x: '6vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.14
      );

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
      id="studio"
      className="section-pinned z-50"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/services_living_shelves.jpg"
        alt="Living room with built-in shelving"
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
              <span className="word inline-block">DESIGN,</span>{' '}
              <span className="word inline-block text-accent">BUILD</span>
              <br />
              <span className="word inline-block">AND</span>{' '}
              <span className="word inline-block">EVERYTHING</span>{' '}
              <span className="word inline-block">BETWEEN.</span>
            </h2>
          </div>

          {/* Right Card */}
          <div
            ref={cardRef}
            className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[30vw] min-w-[320px] bg-white/95 backdrop-blur-sm card-rounded card-shadow p-8 will-change-transform"
          >
            <span className="mono-label text-[#6E727A] block mb-6">SERVICES</span>
            <ul className="space-y-4 mb-8">
              {services.map((service) => (
                <li 
                  key={service.id} 
                  className="list-item flex items-start gap-3 cursor-pointer group"
                  onClick={() => setSelectedService(service)}
                >
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="body-text text-[#111216] group-hover:text-accent transition-colors">{service.title}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowCapabilities(true)}
                className="inline-flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
              >
                <Download className="w-4 h-4" />
                Download capabilities
              </button>
              <a 
                href="#process" 
                className="inline-flex items-center gap-2 text-[#6E727A] font-medium text-sm hover:text-accent transition-colors"
              >
                See our process
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-[22px] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="mono-label text-accent block mb-2">SERVICE</span>
                  <h3 className="headline-md text-[#111216]">{selectedService.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 bg-[#F4F2EE] rounded-full flex items-center justify-center hover:bg-[#111216]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="body-text-lg text-[#111216] mb-6">
                {selectedService.description}
              </p>
              
              <h4 className="font-heading font-semibold text-[#111216] mb-4">What's Included</h4>
              <ul className="space-y-3 mb-8">
                {selectedService.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="body-text text-[#111216]">{detail}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/2347071906095?text=Hi! I'm interested in your ${encodeURIComponent(selectedService.title)} service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-accent text-white px-6 py-3 font-medium text-sm inline-flex items-center gap-2 hover:bg-[#111216] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Get a quote
                </a>
                <a
                  href="mailto:nuformlivingenterprise@gmail.com"
                  className="btn-pill border border-[#111216]/20 text-[#111216] px-6 py-3 font-medium text-sm inline-flex items-center gap-2 hover:bg-[#111216]/5 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Capabilities Modal */}
      {showCapabilities && (
        <div 
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCapabilities(false)}
        >
          <div 
            className="bg-white rounded-[22px] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="mono-label text-accent block mb-2">OUR PROCESS</span>
                  <h3 className="headline-lg text-[#111216]">How We Work</h3>
                </div>
                <button
                  onClick={() => setShowCapabilities(false)}
                  className="w-10 h-10 bg-[#F4F2EE] rounded-full flex items-center justify-center hover:bg-[#111216]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6 mb-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="mono-label text-accent">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-[#111216] mb-1">{step.title}</h4>
                      <p className="body-text text-[#6E727A]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#F4F2EE] rounded-xl p-6 mb-6">
                <h4 className="font-heading font-semibold text-[#111216] mb-4">All Services</h4>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm text-[#111216]">{service.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/2347071906095?text=Hi! I'd like to request a consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-accent text-white px-6 py-3 font-medium text-sm inline-flex items-center gap-2 hover:bg-[#111216] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Request consultation
                </a>
                <button
                  onClick={() => setShowCapabilities(false)}
                  className="btn-pill border border-[#111216]/20 text-[#111216] px-6 py-3 font-medium text-sm hover:bg-[#111216]/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
