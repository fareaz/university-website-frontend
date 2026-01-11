"use client";
import HeroSection from "@/components/home/HeroSection";
import LatestNotice from "@/components/home/LatestNotice";
import StatsSection from "@/components/home/StatsSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import CoreValues from "@/components/about/CoreValues";

export default function Home() {
    return (
        <div >        
            <HeroSection />
            <LatestNotice />
            <StatsSection />
            <DepartmentsSection />
            <CoreValues />
        </div>
    );
}