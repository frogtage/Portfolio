"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  FaReact,
  FaPython,
  FaChartBar
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
} from "react-icons/si";

// Animation hook
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

const TechStack = () => {
  const { text } = useLanguage();

  const technologies = [
    {
      name: "React",
      icon: <FaReact className="w-5 h-5 text-[#61DAFB]" />,
      group: "frontend",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="w-5 h-5 text-white" />,
      group: "frontend",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="w-5 h-5 text-[#38B2AC]" />,
      group: "frontend",
    },
    {
      name: "Python",
      icon: <FaPython className="w-5 h-5 text-[#3776AB]" />,
      group: "python",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="w-5 h-5 text-[#336791]" />,
      group: "python",
    },
    {
      name: "Numpy",
      icon: <SiNumpy className="w-5 h-5 text-[#4D77CF]" />,
      group: "python",
    },
    {
      name: "Pandas",
      icon: <SiPandas className="w-5 h-5 text-[#150458]" />,
      group: "python",
    },
    {
      name: "Matplotlib",
      icon: <FaChartBar className="w-5 h-5 text-indigo-400" />,
      group: "python",
    },
    {
      name: "Scikit-learn",
      icon: <SiScikitlearn className="w-5 h-5 text-[#F7931E]" />,
      group: "python",
    },
  ];

  const groupColors = {
    frontend: "hover:border-blue-400",
    python: "hover:border-yellow-400",
  };

  return (
    <AnimatedSection
      id="technologies"
      className="py-12 md:py-16 container mx-auto px-4"
    >
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          {text.technologiesTitle || "My Tech Stack"}
        </h2>
        <p className="text-md text-gray-400 mt-1 font-medium">
          {text.technologiesSubtitle || "Tools & Technologies"}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className={`px-4 py-2 bg-gray-800/80 rounded-lg border border-gray-700
              transition-all duration-200 hover:bg-gray-700/90 hover:scale-105
              flex items-center gap-2 group ${groupColors[tech.group]}`}
            >
              <span className="group-hover:scale-110 transition-transform">
                {tech.icon}
              </span>
              <span className="text-sm text-white font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TechStack;
