"use client"

import { ExpandableCardDemo } from "./Wlugintro";
import { useEffect, useState } from "react";
import { SignupFormDemo } from "./RegisterForm";

const Page2: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize state safely
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 700);
  }, []);

  // Update isMobile on resize
  useEffect(() => {
    if (!isMounted) return;

    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, [isMounted]);

  // Handle scroll events
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const page1Height = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / page1Height, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Prevent server-client mismatch
  if (!isMounted) return null;

  return (
    <div
      className="page h-[145vh] md:h-[175vh] bg-transparent z-50 flex items-center md:justify-center flex-col gap-[9vh] relative transition-all duration-300"
      style={{
        position: "relative",
        top: isMobile ? "0vh" : "0vh",
        width: "100%",
        transform: `translateY(${(1 - scrollProgress) * 50}px)`,
        pointerEvents: scrollProgress > 0.1 ? "auto" : "none",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-transparent z-0" />

      <div className="text flex items-center mt-10 justify-center flex-col md:gap-6 z-10">
        <h2 className="text-white font-bold text-2xl md:text-[6vh]">
          Member Board Drive 2
        </h2>
      </div>

      <div className="box flex flex-col md:flex-row gap-4 w-full md:w-[80vw] h-auto rounded-xl z-10">
        {/* Register Page Box */}
        {/* <div className="flex-1 flex justify-center items-center w-full md:w-[50%] bg-[#171413] rounded-xl mb-5 sm:mb-0 backdrop-blur-sm">
          <div className="w-full h-full">
            <div className=" bg-">
              <ExpandableCardDemo/>
            </div>
          </div>
        </div> */}
        <div className="flex-1 flex justify-center items-center w-full md:w-[50%] bg-transparent rounded-xl mb-5 sm:mb-0 backdrop-blur-sm">
          <div className="w-full h-full">
            <SignupFormDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;