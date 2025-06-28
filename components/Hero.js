'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Icons = {
  GitHub: () => <svg className="w-full h-full" fill="currentColor" role="img" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.305 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  LinkedIn: () => <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
};

const useIntersectionObserver = (options) => {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);
  useEffect(() => {
    if (elements.length > 0) {
      observer.current = new IntersectionObserver((ioEntries) => { setEntries(ioEntries) }, options);
      elements.forEach(element => observer.current.observe(element));
    }
    return () => { if (observer.current) observer.current.disconnect() };
  }, [elements, options]);
  return [observer, setElements, entries];
};

const AnimatedSection = ({ children, className, as: Component = 'section', ...props }) => {
  const [observer, setElements, entries] = useIntersectionObserver({ threshold: 0.1 });
  const sectionRef = useRef(null);
  useEffect(() => { if (sectionRef.current) setElements([sectionRef.current]) }, [setElements]);
  const isVisible = entries.some(entry => entry.isIntersecting);
  return <Component ref={sectionRef} className={`scroll-animate ${className} ${isVisible ? 'visible' : ''}`} {...props}>{children}</Component>;
};

const StarlightCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };
    class Star {
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.radius = Math.random() * 1.5 + 0.5; this.alpha = Math.random(); this.fadingSpeed = Math.random() * 0.01 + 0.005; this.fadingIn = true; }
      update() { if (this.fadingIn) { this.alpha += this.fadingSpeed; if (this.alpha >= 1) { this.alpha = 1; this.fadingIn = false; } } else { this.alpha -= this.fadingSpeed; if (this.alpha <= 0) { this.alpha = 0; this.fadingIn = true; this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; } } }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; ctx.fill(); }
    }
    function initStars() { stars = []; const starCount = (canvas.width * canvas.height) / 8000; for (let i = 0; i < starCount; i++) { stars.push(new Star()); } }
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); stars.forEach(star => { star.update(); star.draw(); }); animationFrameId = requestAnimationFrame(animate); }
    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
    return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} id="starlight-canvas" className="absolute top-0 left-0 w-full h-full z-[-1]"></canvas>;
};

const Hero = () => {
  const { text } = useLanguage();

  return (
    <AnimatedSection id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <StarlightCanvas />

      <div className="z-10 flex flex-col items-center px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: text.heroGreeting }}
        />

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {text.heroDescription}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="#projects" className="gradient-button text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/50 w-full sm:w-auto">
            {text.heroButton}
          </a>
          <div className="flex justify-center items-center space-x-6">
            <a href="https://github.com/frogtage" target="_blank" rel="noopener noreferrer" className="text-white w-8 h-8 hover:text-cyan-400 transition-transform duration-300 hover:scale-125">
              <Icons.GitHub />
            </a>
            <a href="https://linkedin.com/in/mohammad-hossein-926b0435a" target="_blank" rel="noopener noreferrer" className="text-white w-8 h-8 hover:text-violet-400 transition-transform duration-300 hover:scale-125">
              <Icons.LinkedIn />
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Hero;
