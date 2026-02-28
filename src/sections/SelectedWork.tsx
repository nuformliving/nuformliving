import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Calendar, X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: 'Eastside Residence',
    tags: ['Residential', 'Renovation'],
    description: 'A calm rebuild with room to breathe.',
    image: '/images/project_thumb_eastside.jpg',
    fullImage: '/images/project_eastside_living.jpg',
    location: 'Lekki, Lagos',
    year: '2024',
    size: '3,200 sq ft',
    duration: '6 months',
    details: 'We opened the plan, added hidden storage, and let the light do the decorating. The result feels bigger without adding square footage.',
    features: [
      'Open-concept living area',
      'Custom built-in shelving',
      'Hidden storage solutions',
      'Natural light optimization',
      'Warm wood accents throughout'
    ]
  },
  {
    id: 2,
    name: 'Northlight Loft',
    tags: ['Residential', 'Conversion'],
    description: 'Industrial shell turned soft sanctuary.',
    image: '/images/project_northlight_loft.jpg',
    fullImage: '/images/project_northlight_loft.jpg',
    location: 'Ikoyi, Lagos',
    year: '2024',
    size: '1,800 sq ft',
    duration: '4 months',
    details: 'Transforming a raw industrial space into a warm, livable home while preserving its architectural character.',
    features: [
      'Exposed brick preservation',
      'Industrial-style windows',
      'Warm neutral palette',
      'Custom lighting design',
      'Open bedroom concept'
    ]
  },
  {
    id: 3,
    name: 'Garden Lane Kitchen',
    tags: ['Kitchen', 'Small Space'],
    description: 'Small footprint, big function.',
    image: '/images/project_garden_kitchen.jpg',
    fullImage: '/images/project_garden_kitchen.jpg',
    location: 'Victoria Island, Lagos',
    year: '2023',
    size: '180 sq ft',
    duration: '8 weeks',
    details: 'Maximizing every inch of a compact kitchen with clever storage solutions and a cohesive material palette.',
    features: [
      'Pull-out pantry system',
      'Integrated appliances',
      'Quartz countertops',
      'Under-cabinet lighting',
      'Space-saving island'
    ]
  },
  {
    id: 4,
    name: 'Studio Atelier',
    tags: ['Commercial', 'Workspace'],
    description: 'A creative workspace with quiet discipline.',
    image: '/images/project_studio_atelier.jpg',
    fullImage: '/images/project_studio_atelier_wide.jpg',
    location: 'Abuja, FCT',
    year: '2024',
    size: '1,200 sq ft',
    duration: '3 months',
    details: 'Designing a creative studio that inspires productivity while maintaining a calm, focused atmosphere.',
    features: [
      'Natural light optimization',
      'Custom storage wall',
      'Minimalist workstations',
      'Meeting nook',
      'Biophilic design elements'
    ]
  },
  {
    id: 5,
    name: 'Harbor View Apartment',
    tags: ['Residential', 'Coastal'],
    description: 'Coastal restraint in the city.',
    image: '/images/project_harbor_view.jpg',
    fullImage: '/images/project_harbor_view_wide.jpg',
    location: 'Port Harcourt, Rivers',
    year: '2023',
    size: '2,400 sq ft',
    duration: '5 months',
    details: 'Bringing coastal calm to an urban apartment with water views, using a restrained palette of blues and neutrals.',
    features: [
      'Water-view living room',
      'Coastal color palette',
      'Natural fiber textures',
      'Indoor-outdoor flow',
      'Custom window treatments'
    ]
  },
  {
    id: 6,
    name: 'Maple House',
    tags: ['Residential', 'Family'],
    description: 'Warm materials, clean lines, family-proof.',
    image: '/images/project_maple_house.jpg',
    fullImage: '/images/project_maple_house_wide.jpg',
    location: 'Ikeja, Lagos',
    year: '2024',
    size: '3,800 sq ft',
    duration: '8 months',
    details: 'Creating a family home that balances sophisticated design with practical, kid-friendly durability.',
    features: [
      'Durable performance fabrics',
      'Open family room',
      'Kid-friendly design',
      'Warm wood floors',
      'Ample toy storage'
    ]
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const list = listRef.current;

    if (!section || !heading || !list) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      const items = list.querySelectorAll('.project-item');
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { x: '-10vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveProject(index),
          onEnterBack: () => setActiveProject(index),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-flowing bg-primary py-24 z-30 relative"
    >
      <div className="content-wrapper">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="headline-lg text-[#111216] mb-16 will-change-transform"
        >
          SELECTED <span className="text-accent">WORK</span>
        </h2>

        <div className="flex gap-12">
          {/* Project List */}
          <div ref={listRef} className="flex-1 max-w-[55%]">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-item group border-b border-[#111216]/10 py-8 cursor-pointer will-change-transform"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="headline-md text-[#111216] group-hover:text-accent transition-colors duration-300 mb-2">
                      {project.name}
                    </h3>
                    <div className="flex gap-3 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono-label text-[#6E727A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="body-text text-[#6E727A] mb-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[#6E727A]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#6E727A] group-hover:text-accent group-hover:translate-x-2 transition-all duration-300 mt-2" />
                </div>
              </div>
            ))}
            
            {/* View All Link */}
            <div className="pt-8">
              <a 
                href="#all-projects" 
                className="inline-flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
              >
                View all projects
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sticky Thumbnail Card */}
          <div className="w-[40%] sticky top-[18vh] h-fit will-change-transform hidden md:block">
            <div 
              className="card-rounded overflow-hidden card-shadow bg-white cursor-pointer group"
              onClick={() => setSelectedProject(projects[activeProject])}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {projects.map((project, index) => (
                  <img
                    key={project.id}
                    src={project.image}
                    alt={project.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${
                      activeProject === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Click to view project</span>
                </div>
              </div>
              <div className="p-6">
                <span className="mono-label text-[#6E727A] block mb-2">
                  FEATURED PROJECT
                </span>
                <h4 className="headline-md text-[#111216] mb-2">
                  {projects[activeProject].name}
                </h4>
                <p className="body-text text-[#6E727A] mb-3">
                  {projects[activeProject].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-[#6E727A]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {projects[activeProject].location}
                  </span>
                  <span>{projects[activeProject].year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-[22px] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative">
              <img
                src={selectedProject.fullImage}
                alt={selectedProject.name}
                className="w-full aspect-[16/9] object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-3 mb-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="mono-label text-white/80">{tag}</span>
                  ))}
                </div>
                <h2 className="headline-lg text-white">{selectedProject.name}</h2>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8">
              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#111216]/10">
                <div>
                  <span className="mono-label text-[#6E727A] block mb-1">LOCATION</span>
                  <span className="body-text-lg text-[#111216] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {selectedProject.location}
                  </span>
                </div>
                <div>
                  <span className="mono-label text-[#6E727A] block mb-1">YEAR</span>
                  <span className="body-text-lg text-[#111216] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    {selectedProject.year}
                  </span>
                </div>
                <div>
                  <span className="mono-label text-[#6E727A] block mb-1">SIZE</span>
                  <span className="body-text-lg text-[#111216]">{selectedProject.size}</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h3 className="headline-md text-[#111216] mb-4">About the Project</h3>
                <p className="body-text-lg text-[#111216]">{selectedProject.details}</p>
              </div>
              
              {/* Features */}
              <div className="mb-8">
                <h3 className="headline-md text-[#111216] mb-4">Key Features</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="body-text text-[#111216]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA */}
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/2347071906095?text=Hi! I'm interested in learning more about the ${encodeURIComponent(selectedProject.name)} project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-accent text-white px-6 py-3 font-medium text-sm inline-flex items-center gap-2 hover:bg-[#111216] transition-colors"
                >
                  Inquire about this project
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
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
