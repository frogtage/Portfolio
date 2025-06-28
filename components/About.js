"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const useIntersectionObserver = (options) => {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);
  useEffect(() => {
    if (elements.length > 0) {
      observer.current = new IntersectionObserver((ioEntries) => {
        setEntries(ioEntries);
      }, options);
      elements.forEach((element) => observer.current.observe(element));
    }
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [elements, options]);
  return [observer, setElements, entries];
};

const AnimatedSection = ({
  children,
  className,
  as: Component = "section",
  ...props
}) => {
  const [observer, setElements, entries] = useIntersectionObserver({
    threshold: 0.1,
  });
  const sectionRef = useRef(null);
  useEffect(() => {
    if (sectionRef.current) setElements([sectionRef.current]);
  }, [setElements]);
  const isVisible = entries.some((entry) => entry.isIntersecting);
  return (
    <Component
      ref={sectionRef}
      className={`scroll-animate ${className} ${isVisible ? "visible" : ""}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const About = () => {
  const { text } = useLanguage();

  return (
    <AnimatedSection id="about" className="py-20 md:py-24 container mx-auto px-4">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          {text.aboutTitle}
        </h2>
        <p className="text-lg gradient-text mt-2 font-medium">
          {text.aboutSubtitle}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-lg blur-md"></div>
            <Image
              src="/my_image.webp"
              alt="A photo of John Doe"
              width={320}
              height={320}
              className="relative rounded-lg w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>{text.aboutP1}</p>
          <p>{text.aboutP2}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
