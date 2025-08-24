import React from "react";
import { TypewriterEffect } from "../components/ui/typewriter";
import { Vortex } from "../components/ui/Vortex";
import { useNavigate } from "react-router-dom";
import { StickyScroll } from "../components/ui/stickyscroll";

function Home() {
  const navigate = useNavigate();
  
  const words = [
    { text: "Meet" },
    { text: "New" },
    { text: "People" },
    { text: "Online" },
    { text: "Incognito.h", className: "text-blue-500 dark:text-blue-900" },
  ];
  
  const stickyContent = [
    {
      title: "Anonymous Conversations",
      description:
        "Connect with strangers from around the world without revealing your identity. Experience genuine conversations without the pressure of social profiles or judgments.",
      content: (
        <div className="w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white rounded-lg shadow-lg">
          <div className="text-lg sm:text-xl font-semibold px-4 text-center">Anonymous Chat</div>
        </div>
      ),
    },
    {
      title: "Real-time Matching",
      description:
        "Get instantly matched with people who share your interests. Our smart algorithm connects you with compatible strangers for meaningful conversations.",
      content: (
        <div className="w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
          <div className="text-lg sm:text-xl font-semibold px-4 text-center">Instant Matching</div>
        </div>
      ),
    },
    {
      title: "Safe & Secure",
      description:
        "Your privacy is our priority. All conversations are encrypted and no personal data is stored. Chat freely knowing your identity remains completely anonymous.",
      content: (
        <div className="w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg shadow-lg">
          <div className="text-lg sm:text-xl font-semibold px-4 text-center">Secure Platform</div>
        </div>
      ),
    },
    {
      title: "Global Community",
      description:
        "Join millions of users worldwide in creating meaningful connections. Break down barriers and discover different perspectives from people across the globe.",
      content: (
        <div className="w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg">
          <div className="text-lg sm:text-xl font-semibold px-4 text-center">Global Network</div>
        </div>
      ),
    },
  ];
 
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-white dark:bg-black">
      {/* Hero Section - Mobile Optimized */}
      <section className="h-screen w-full relative -mb-1">
        <Vortex
          backgroundColor="#000000"
          particleCount={200}
          rangeY={300}
          baseHue={180}
          containerClassName="h-full w-full"
          className="flex flex-col items-center justify-center text-center h-full px-4 sm:px-6 lg:px-8"
        >
          <p className="text-neutral-200 text-sm sm:text-base mb-6 sm:mb-10 max-w-xs sm:max-w-none">
            Meet New people online
          </p>
          <div className="w-full max-w-4xl">
            <TypewriterEffect
              words={words}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold"
            />
          </div>
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-4 justify-center w-full max-w-sm sm:max-w-none">
            <button
              className="w-full sm:w-40 h-12 sm:h-10 rounded-xl bg-black border border-white text-white text-sm font-medium hover:bg-gray-900 active:bg-gray-800 transition-colors touch-manipulation"
              onClick={() => navigate("/chat")}
            >
              Anon
            </button>
            <button
              className="w-full sm:w-40 h-12 sm:h-10 rounded-xl bg-white text-black border border-black text-sm font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
              onClick={() => navigate("/signup")}
            >
              Sign.in
            </button>
          </div>
        </Vortex>
      </section>
      
      {/* Sticky Scroll Section - Mobile Responsive */}
      <section className="w-full bg-white dark:bg-black">
        <div className="sticky-scroll-wrapper">
          <StickyScroll content={stickyContent} />
        </div>
      </section>
      
      {/* Mobile-First Responsive Styles */}
      <style>{`
        /* Mobile-first approach */
        .sticky-scroll-wrapper {
          width: 100%;
          overflow-x: hidden;
          background: white;
        }
        
        @media (prefers-color-scheme: dark) {
          .sticky-scroll-wrapper {
            background: black;
          }
        }
        
        /* Mobile styles (default) */
        .sticky-scroll-wrapper .sticky-scroll-content,
        .sticky-scroll-wrapper [data-sticky-content],
        .sticky-scroll-wrapper .content-container {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 2rem !important;
          min-height: 100vh !important;
          padding: 1.5rem 1rem !important;
        }
        
        .sticky-scroll-wrapper .text-content,
        .sticky-scroll-wrapper .sticky-text,
        .sticky-scroll-wrapper [data-text-content] {
          width: 100% !important;
          max-width: none !important;
          text-align: center !important;
          padding: 0 !important;
          margin-bottom: 1rem !important;
        }
        
        .sticky-scroll-wrapper .visual-content,
        .sticky-scroll-wrapper .sticky-visual,
        .sticky-scroll-wrapper [data-visual-content] {
          width: 100% !important;
          max-width: none !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        .sticky-scroll-wrapper .content-item {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          min-height: 100vh !important;
          text-align: center !important;
          background: white !important;
        }
        
        /* Title and description responsive sizing */
        .sticky-scroll-wrapper h3,
        .sticky-scroll-wrapper .title {
          font-size: 1.5rem !important;
          line-height: 1.3 !important;
          margin-bottom: 1rem !important;
          padding: 0 0.5rem !important;
        }
        
        .sticky-scroll-wrapper p,
        .sticky-scroll-wrapper .description {
          font-size: 0.9rem !important;
          line-height: 1.5 !important;
          padding: 0 0.5rem !important;
          max-width: 90% !important;
        }
        
        /* Tablet styles */
        @media (min-width: 640px) {
          .sticky-scroll-wrapper .sticky-scroll-content,
          .sticky-scroll-wrapper [data-sticky-content],
          .sticky-scroll-wrapper .content-container {
            gap: 3rem !important;
            padding: 2rem 1.5rem !important;
          }
          
          .sticky-scroll-wrapper .text-content,
          .sticky-scroll-wrapper .sticky-text,
          .sticky-scroll-wrapper [data-text-content] {
            text-align: left !important;
            margin-bottom: 1.5rem !important;
          }
          
          .sticky-scroll-wrapper h3,
          .sticky-scroll-wrapper .title {
            font-size: 1.75rem !important;
            text-align: left !important;
            padding: 0 !important;
          }
          
          .sticky-scroll-wrapper p,
          .sticky-scroll-wrapper .description {
            font-size: 1rem !important;
            text-align: left !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
        
        /* Desktop styles */
        @media (min-width: 1024px) {
          .sticky-scroll-wrapper .sticky-scroll-content,
          .sticky-scroll-wrapper [data-sticky-content],
          .sticky-scroll-wrapper .content-container {
            flex-direction: row !important;
            justify-content: space-between !important;
            gap: 4rem !important;
            padding: 2rem !important;
          }
          
          .sticky-scroll-wrapper .text-content,
          .sticky-scroll-wrapper .sticky-text,
          .sticky-scroll-wrapper [data-text-content] {
            flex: 1 !important;
            max-width: 50% !important;
            text-align: left !important;
            padding-right: 2rem !important;
            margin-bottom: 0 !important;
          }
          
          .sticky-scroll-wrapper .visual-content,
          .sticky-scroll-wrapper .sticky-visual,
          .sticky-scroll-wrapper [data-visual-content] {
            flex: 1 !important;
            max-width: 50% !important;
          }
          
          .sticky-scroll-wrapper .content-item {
            flex-direction: row !important;
            text-align: left !important;
          }
          
          .sticky-scroll-wrapper h3,
          .sticky-scroll-wrapper .title {
            font-size: 2rem !important;
          }
          
          .sticky-scroll-wrapper p,
          .sticky-scroll-wrapper .description {
            font-size: 1.1rem !important;
          }
        }
        
        /* Touch optimization */
        @media (hover: none) and (pointer: coarse) {
          .sticky-scroll-wrapper button {
            min-height: 44px !important;
            min-width: 44px !important;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .sticky-scroll-wrapper * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .content-item {
            background: black !important;
          }
          
          .sticky-scroll-wrapper {
            background: black;
          }
        }
        
        /* Explicit dark mode classes */
        .dark .content-item {
          background: black !important;
        }
        
        .dark .sticky-scroll-wrapper {
          background: black;
        }
      `}</style>
    </div>
  );
}

export default Home;