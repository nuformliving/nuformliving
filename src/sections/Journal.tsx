import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, User, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    title: 'How to choose a sofa that lasts',
    excerpt: 'The secrets to investing in a piece that will stand the test of time and daily life.',
    image: '/images/article_sofa.jpg',
    author: 'NÜFORM Team',
    readTime: '5 min read',
    category: 'Furniture',
    content: `
      <p>A sofa is often the centerpiece of your living room—and one of the biggest investments you'll make for your home. Choosing the right one requires balancing aesthetics, comfort, and durability.</p>
      
      <h3>1. Consider Your Lifestyle</h3>
      <p>Do you have kids or pets? Opt for performance fabrics that resist stains and wear. Leather ages beautifully and is easy to clean, while tightly woven textiles hold up better over time.</p>
      
      <h3>2. Check the Frame</h3>
      <p>A quality sofa starts with a solid frame. Look for hardwood frames (kiln-dried oak, maple, or ash) joined with dowels, screws, or corner blocks—never staples or nails alone.</p>
      
      <h3>3. Test the Cushions</h3>
      <p>High-resilient foam wrapped in down or feather provides the best balance of support and comfort. Avoid cushions that feel too soft—they'll sag quickly.</p>
      
      <h3>4. Measure Twice</h3>
      <p>Before falling in love with a sofa, measure your space (and your doorways!). A beautiful piece that doesn't fit is no bargain at any price.</p>
    `
  },
  {
    id: 2,
    title: 'Lighting mistakes (and how to fix them)',
    excerpt: 'Transform your space with the right lighting strategy.',
    image: '/images/article_lighting.jpg',
    author: 'NÜFORM Team',
    readTime: '4 min read',
    category: 'Lighting',
    content: `
      <p>Lighting can make or break a room's ambiance. Yet it's often an afterthought in interior design. Here are the most common lighting mistakes we see—and how to correct them.</p>
      
      <h3>Mistake 1: Relying on a Single Light Source</h3>
      <p>One overhead fixture creates harsh shadows and flat lighting. The solution? Layer your lighting: ambient (general), task (reading, cooking), and accent (artwork, architectural features).</p>
      
      <h3>Mistake 2: Wrong Color Temperature</h3>
      <p>Warm light (2700K-3000K) creates cozy spaces; cool light (4000K+) is better for task-oriented areas like kitchens and offices. Mixing color temperatures in one room feels jarring.</p>
      
      <h3>Mistake 3: Ignoring Dimmers</h3>
      <p>Dimmers are the secret weapon of great lighting design. They allow you to adjust mood throughout the day and extend bulb life significantly.</p>
      
      <h3>Mistake 4: Forgetting About Natural Light</h3>
      <p>Work with your windows, not against them. Use sheer curtains for soft diffusion and position mirrors to bounce light deeper into the room.</p>
    `
  },
  {
    id: 3,
    title: 'A calm kitchen in 5 decisions',
    excerpt: 'Simple choices that create a serene cooking space.',
    image: '/images/article_kitchen.jpg',
    author: 'NÜFORM Team',
    readTime: '6 min read',
    category: 'Kitchen',
    content: `
      <p>The kitchen is the heart of the home—but it can also be a source of stress. These five decisions will help you create a kitchen that feels calm, organized, and genuinely enjoyable to use.</p>
      
      <h3>1. Choose a Limited Color Palette</h3>
      <p>Stick to 2-3 main colors. Neutral tones (whites, creams, soft grays) with natural wood accents create a timeless, peaceful foundation.</p>
      
      <h3>2. Prioritize Counter Space</h3>
      <p>Clear counters equal a clear mind. Designate specific storage for small appliances and keep only daily essentials visible.</p>
      
      <h3>3. Invest in Quality Hardware</h3>
      <p>Soft-close drawers and cabinets prevent slamming and create a sense of quality. Small details make a big difference in daily experience.</p>
      
      <h3>4. Plan Your Lighting</h3>
      <p>Under-cabinet lighting eliminates shadows on work surfaces. Pendant lights over islands add warmth and visual interest.</p>
      
      <h3>5. Hide the Clutter</h3>
      <p>Integrated appliances and built-in storage keep visual noise to a minimum. Everything should have a designated home.</p>
    `
  },
];

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

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

      const cardItems = cards.querySelectorAll('.article-card');
      cardItems.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="section-flowing bg-primary py-24 z-[70] relative"
    >
      <div className="content-wrapper">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <h2
            ref={headingRef}
            className="headline-lg text-[#111216] will-change-transform"
          >
            NOTES ON <span className="text-accent">LIVING WELL</span>
          </h2>
          <a 
            href="#all-articles" 
            className="hidden md:flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
          >
            Browse all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="article-card group cursor-pointer will-change-transform"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="card-rounded overflow-hidden mb-5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="mono-label text-accent">{article.category}</span>
                <span className="flex items-center gap-1 text-[#6E727A] text-xs">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="headline-md text-[#111216] group-hover:text-accent transition-colors mb-2">
                {article.title}
              </h3>
              <p className="body-text text-[#6E727A] mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[#111216] text-sm font-medium group-hover:text-accent transition-colors">
                <User className="w-4 h-4" />
                {article.author}
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Browse All Link */}
        <div className="md:hidden mt-8 text-center">
          <a 
            href="#all-articles" 
            className="inline-flex items-center gap-2 text-[#111216] font-medium text-sm link-underline hover:text-accent transition-colors"
          >
            Browse all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-[22px] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full aspect-[16/9] object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="mono-label text-accent">{selectedArticle.category}</span>
                <span className="flex items-center gap-1 text-[#6E727A] text-xs">
                  <Clock className="w-3 h-3" />
                  {selectedArticle.readTime}
                </span>
                <span className="flex items-center gap-1 text-[#6E727A] text-xs">
                  <User className="w-3 h-3" />
                  {selectedArticle.author}
                </span>
              </div>
              
              <h2 className="headline-lg text-[#111216] mb-6">
                {selectedArticle.title}
              </h2>
              
              <div 
                className="prose prose-lg max-w-none text-[#111216]"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              
              <div className="mt-8 pt-6 border-t border-[#111216]/10">
                <a
                  href={`https://wa.me/2347071906095?text=Hi! I read your article "${encodeURIComponent(selectedArticle.title)}" and would love to learn more.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-accent text-white px-6 py-3 font-medium text-sm inline-flex items-center gap-2 hover:bg-[#111216] transition-colors"
                >
                  Discuss this with us
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
