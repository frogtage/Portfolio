"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

const Projects = () => {
  const { text } = useLanguage();
  const projects = [
    {
      title: text.projectsWordPressTitle || "SilisPaytakht.ir",
      subtitle: text.projectsWordPressSubtitle || "Business WordPress Website",
      description:
        text.projectsWordPressDesc ||
        "Developed a complete, responsive website for a local business, customizing themes and plugins.",
      linkText: text.viewLiveSite || "View Live Site",
      link: "https://silispaytakht.ir/",
      tags: ["WordPress", "PHP", "CSS"],
      image: "/Wordpress.jpg",
    },
    {
      title: text.projectsPythonTitle || "Python Scripts",
      subtitle: text.projectsPythonSubtitle || "Data Scraping & Analysis",
      description:
        text.projectsPythonDesc ||
        "Python scripts using Requests, Beautiful Soup, and Pandas to scrape web data and perform analysis.",
      linkText: text.viewOnGithub || "View on GitHub",
      link: "https://github.com/frogtage?tab=repositories",
      tags: ["Python", "Pandas", "Beautiful Soup"],
      image: "/programming.jpg",
    },
    {
      title: text.projectsPortfolioTitle || "Personal Portfolio",
      subtitle: text.projectsPortfolioSubtitle || "The very site you're on!",
      description:
        text.projectsPortfolioDesc ||
        "Built with modern CSS and interactive JavaScript for a unique feel.",
      linkText: text.viewOnGithub || "View on Vercel",
      link: "https://ml-project-website-eight.vercel.app/",
      tags: ["Next.js", "Tailwind", "React"],
      image: "/ml-project.jpg",
    },
  ];

  return (
    <section id="projects" className="py-16 container mx-auto px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">
          {text.projectsTitle || "Featured Projects"}
        </h2>
        <p className="text-gray-400">
          {text.projectsSubtitle || "A Selection of My Work"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden
            transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
          >
            <div className="h-48 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority={index < 3}
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-gray-300 font-medium mb-3">{project.subtitle}</p>

              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={project.link}
                className="inline-block px-5 py-2 rounded-md text-sm font-medium
                bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                {project.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
