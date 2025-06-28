"use client";

import React, { useState, useEffect, useRef } from "react";
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
      className={`transition-all duration-500 ease-out ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      {...props}
    >
      {children}
    </Component>
  );
};

const Experience = () => {
  const { text } = useLanguage();

  return (
    <AnimatedSection
      id="experience"
      className="py-16 md:py-20 container mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">
          {text.experienceTitle}
        </h2>
        <p className="text-lg text-gray-400">{text.experienceSubtitle}</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="md:hidden relative space-y-8">
          {" "}
          <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-violet-600 to-cyan-400 transform -translate-x-1/2"></div>
          <div className="relative">
            {" "}
            <div className="absolute left-4 w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"></div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 ml-8">
              {" "}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-sm font-medium text-cyan-400">
                  {text.exp1Date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {text.exp1Title}
              </h3>
              <p className="text-gray-300">{text.exp1Desc}</p>
            </div>
          </div>
          <div className="relative">
            {" "}
            <div className="absolute left-4 w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"></div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 ml-8">
              {" "}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                <span className="text-sm font-medium text-violet-500">
                  {text.exp2Date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {text.exp2Title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{text.exp2Org}</p>
              <p className="text-gray-300">{text.exp2Desc}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-violet-600 to-cyan-400 transform -translate-x-1/2"></div>
          <div className="space-y-8">
            <div className="relative flex items-center justify-between">
              <div className="w-[45%]"></div>
              <div className="absolute left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transform -translate-x-1/2 z-10"></div>
              <div className="w-[45%] bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-sm font-medium text-cyan-400">
                    {text.exp1Date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {text.exp1Title}
                </h3>
                <p className="text-gray-300">{text.exp1Desc}</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between flex-row-reverse">
              <div className="w-[45%]"></div>
              <div className="absolute left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transform -translate-x-1/2 z-10"></div>
              <div className="w-[45%] bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                  <span className="text-sm font-medium text-violet-500">
                    {text.exp2Date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {text.exp2Title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{text.exp2Org}</p>
                <p className="text-gray-300">{text.exp2Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
