"use client"
import BackgroundStars from "@/assets/stars.png";
import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import { Button } from "./ui/button";

export function HeroSection() {

    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [`start end`, 'end start']
    })
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

    return (
        <>
            <a href="https://www.wcewlug.org/" className="fixed right-5 top-3 z-[100]">
                <img className="w-[10vh] md:w-[18vh]" src="wlug.png" alt="WLUG Logo" />
            </a>
            <motion.section
                animate={{backgroundPositionX: BackgroundStars.width,}}
                transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                className={"h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"}
                style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}} ref={sectionRef}>
                <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]"} />
                {/* Planet Logic */}
                <div className={"absolute size-64 md:size-96 bg-purple-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,0.5),-20px_-20px_80px_rgb(255,255,255,0.1),0_0_50px_rgb(140,69,255)]"} />
                {/* Rings + Mini planets Logic */}
                <motion.div
                    style={{translateY: '-50%', translateX: '-50%',}}
                    animate={{rotate: '1turn'}}
                    transition={{duration: 60, repeat: Infinity, ease: 'linear'}}
                    className={"absolute size-[344px] md:size-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                    <div className={"absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"} />
                    <div className={"absolute size-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"} />
                    <div className={"absolute size-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"}>
                        <div className={"size-2 bg-white rounded-full"} />
                    </div>
                </motion.div>
                <motion.div
                    style={{translateY: '-50%', translateX: '-50%',}}
                    animate={{rotate: '-1turn'}}
                    transition={{duration: 60, repeat: Infinity, ease: 'linear'}}
                    className={"absolute size-[444px] md:size-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"} />
                <motion.div
                    style={{translateY: '-50%', translateX: '-50%',}}
                    animate={{rotate: '1turn'}}
                    transition={{duration: 90, repeat: Infinity, ease: 'linear'}}
                    className={"absolute size-[544px] md:size-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                    <div className={"absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"}/>
                    <div className={"absolute size-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2"}/>
                </motion.div>
                {/* Hero Section Content Logic */}
                <div className={"container relative mt-16"}>
                    <h1 className={"text-5xl md:text-[100px] md:leading-none font-semibold bg-white tracking-tighter bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,0.5))] bg-clip-text text-transparent text-center"}>Walchand Linux Users' Group</h1>
                    <p className={"text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-10 md:mt-5 text-center"}>Prepare to join a vibrant community of Linux enthusiasts and immerse yourself in the dynamic world of Open Source.</p>
                    <div className={"flex justify-center mt-10 md:mt-5"}>
                        <button className={"relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]"}>
                        <div className={"absolute inset-0 rounded-lg"}>
                            <div className={"absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]"}/>
                            <div className={"absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"}/>
                            <div className={"absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(140,69,255,0.7)_inset]"}/>
                        </div>
                        <span>{"Register Now"}</span>
                    </button>
                    </div>
                </div>
            </motion.section>
        </>
    )
}
