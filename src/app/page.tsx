"use client";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { RegistrationClosed } from "@/components/RegistrationClosed";

// Dynamically import components with SSR disabled

const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
  </div>
);

const HeroSection = dynamic(
  () => import("@/components/hero-section").then((mod) => mod.HeroSection),
  { 
    ssr: true,
    // loading: () => <Loader />
  }
);

const Page2 = dynamic(
  () => import("@/components/page2"),
  { 
    ssr: true,
    // loading: () => <Loader />
  }
);

const Footer = dynamic(
  () => import("@/components/Footer"),
  { 
    ssr: true,
    loading: () => <Loader />
  }
);


export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        {isClient && (
          <>
            <div id="home">
              <HeroSection />
            </div>
            <div id="register">
              {/* <Page2 /> */}
              <RegistrationClosed/>
            </div>
            <Footer/>
          </>
        )}
      </Suspense>
    </main>
  );
}
