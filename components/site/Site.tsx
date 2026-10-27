"use client";

import { useCallback, useState } from "react";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ExperienceCanvas from "@/components/three/ExperienceCanvas";
import SceneActs from "@/components/three/SceneActs";
import Preloader from "@/components/site/Preloader";
import Navigation from "@/components/site/Navigation";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Artist from "@/components/site/Artist";
import Sound from "@/components/site/Sound";
import Signal from "@/components/site/Signal";
import Archive from "@/components/site/Archive";
import Live from "@/components/site/Live";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Reveals from "@/components/site/Reveals";

export default function Site() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <SmoothScrollProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Preloader onComplete={onReady} />
      <ExperienceCanvas />
      <SceneActs ready={ready} />
      <Reveals ready={ready} />

      <div className="page">
        <Navigation />
        <main id="main">
          <Hero ready={ready} />
          <Marquee />
          <Artist />
          <Sound />
          <Signal />
          <Archive />
          <Live />
          <Contact />
        </main>
        <Footer />
      </div>

      <div className="grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />
    </SmoothScrollProvider>
  );
}
