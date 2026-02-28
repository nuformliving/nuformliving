import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Hero from './sections/Hero';
import StudioSnapshot from './sections/StudioSnapshot';
import SelectedWork from './sections/SelectedWork';
import ProjectFeature from './sections/ProjectFeature';
import Services from './sections/Services';
import Process from './sections/Process';
import Journal from './sections/Journal';
import ContactCTA from './sections/ContactCTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st: ScrollTrigger) => st.vars.pin)
        .sort((a: ScrollTrigger, b: ScrollTrigger) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges: PinnedRange[] = pinned.map((st: ScrollTrigger) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r: PinnedRange) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest: number, r: PinnedRange) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st: ScrollTrigger) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <Hero />

        {/* Section 2: Studio Snapshot - pin: true */}
        <StudioSnapshot />

        {/* Section 3: Selected Work - pin: false (flowing) */}
        <div id="work">
          <SelectedWork />
        </div>

        {/* Section 4: Project Feature - pin: true */}
        <ProjectFeature />

        {/* Section 5: Services - pin: true */}
        <div id="studio">
          <Services />
        </div>

        {/* Section 6: Process - pin: true */}
        <Process />

        {/* Section 7: Journal - pin: true */}
        <div id="journal">
          <Journal />
        </div>

        {/* Section 8: Contact CTA - pin: true */}
        <div id="contact">
          <ContactCTA />
        </div>

        {/* Section 9: Footer - pin: false (flowing) */}
        <Footer />
      </main>

      {/* Chatbot Widget */}
      <Chatbot />
    </div>
  );
}

export default App;
