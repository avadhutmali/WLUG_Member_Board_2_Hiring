"use client";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import components with SSR disabled
const HeroSection = dynamic(
  () =>
    import("@/components/hero-section").then((mod) => mod.HeroSection),
  { 
    ssr: false,
    loading: () => <p>Loading hero section...</p>
  }
);

const Page2 = dynamic(
  () => import("@/components/page2"),
  { 
    ssr: false,
    loading: () => <p>Loading section...</p>
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
            <HeroSection />
            <Page2 />
          </>
        )}
      </Suspense>
    </main>
  );
}
