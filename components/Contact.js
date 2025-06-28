"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { text } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-20 container mx-auto px-4 max-w-4xl"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {text.contactTitle || "Get In Touch"}
        </h2>
        <p className="text-lg text-gray-400">
          {text.contactSubtitle ||
            "I'm open to new opportunities. Let's connect!"}
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 md:p-10">
        <form
          action="https://formsubmit.co/mo.dokhaei@gmail.com"
          method="POST"
          className="space-y-6"
        >
          {/* Hidden inputs for FormSubmit config */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              {text.yourName || "Your Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={text.namePlaceholder || "Enter your name"}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              {text.yourEmail || "Your Email"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={text.emailPlaceholder || "Enter your email"}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300"
            >
              {text.yourMessage || "Your Message"}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={text.messagePlaceholder || "Enter your message"}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            {text.sendMessage || "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
