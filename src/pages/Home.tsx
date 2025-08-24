"use client";
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
        <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Anonymous Chat</div>
        </div>
      ),
    },
    {
      title: "Real-time Matching",
      description:
        "Get instantly matched with people who share your interests. Our smart algorithm connects you with compatible strangers for meaningful conversations.",
      content: (
        <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Instant Matching</div>
        </div>
      ),
    },
    {
      title: "Safe & Secure",
      description:
        "Your privacy is our priority. All conversations are encrypted and no personal data is stored. Chat freely knowing your identity remains completely anonymous.",
      content: (
        <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Secure Platform</div>
        </div>
      ),
    },
    {
      title: "Global Community",
      description:
        "Join millions of users worldwide in creating meaningful connections. Break down barriers and discover different perspectives from people across the globe.",
      content: (
        <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Global Network</div>
        </div>
      ),
    },
  ];
 
  return (
    <div className="min-h-screen w-screen overflow-y-auto">
      {/* Hero Section */}
      <section className="h-screen w-full">
        <Vortex
          backgroundColor="#000000"
          particleCount={400}
          rangeY={400}
          baseHue={180}
          containerClassName="h-full w-full"
          className="flex flex-col items-center justify-center text-center h-full px-4"
        >
          <p className="text-neutral-200 text-base mb-10">
            Meet New people online
          </p>
          <TypewriterEffect
            words={words}
            className="text-4xl md:text-6xl font-bold"
          />
          <div className="mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center">
            <button
              className="w-40 h-10 rounded-xl bg-black border border-white text-white text-sm hover:bg-gray-900 transition-colors"
              onClick={() => navigate("/chat")}
            >
              Anon
            </button>
            <button
              className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm hover:bg-gray-100 transition-colors"
              onClick={() => navigate("/signup")}
            >
              Sign.in
            </button>
          </div>
        </Vortex>
      </section>
      
      {/* Sticky Scroll Section with Layout Fixes */}
      <section className="w-full">
        <div className="sticky-scroll-wrapper">
          <StickyScroll content={stickyContent} />
        </div>
      </section>
      
      {/* Add global styles to fix StickyScroll centering */}
      <style>{`
        .sticky-scroll-wrapper {
          --sticky-content-display: flex;
          --sticky-content-justify: space-between;
          --sticky-content-align: center;
          --sticky-content-gap: 4rem;
        }
        
        .sticky-scroll-wrapper .sticky-scroll-content,
        .sticky-scroll-wrapper [data-sticky-content],
        .sticky-scroll-wrapper .content-container {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 4rem !important;
          min-height: 100vh !important;
          padding: 2rem !important;
        }
        
        .sticky-scroll-wrapper .text-content,
        .sticky-scroll-wrapper .sticky-text,
        .sticky-scroll-wrapper [data-text-content] {
          flex: 1 !important;
          max-width: 50% !important;
          text-align: left !important;
          padding-right: 2rem !important;
        }
        
        .sticky-scroll-wrapper .visual-content,
        .sticky-scroll-wrapper .sticky-visual,
        .sticky-scroll-wrapper [data-visual-content] {
          flex: 1 !important;
          max-width: 50% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        .sticky-scroll-wrapper .content-item {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          width: 100% !important;
          min-height: 100vh !important;
        }
      `}</style>
    </div>
  );
}

export default Home;