"use client";

import { useState, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error" | "disabled";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formspreeEndpoint, setFormspreeEndpoint] = useState<string | null>(null);

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (endpoint) {
      setFormspreeEndpoint(endpoint);
    } else {
      console.warn(
        "[ContactForm] NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set. " +
        "Form submissions are disabled. " +
        "Get your endpoint at https://formspree.io and add it to .env.local"
      );
      setStatus("disabled");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formspreeEndpoint) {
      setStatus("disabled");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isDisabled = status === "disabled" || status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={isDisabled}
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isDisabled}
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={isDisabled}
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          placeholder="How can I help you?"
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "disabled" && (
        <p className="text-center text-sm text-amber-600">
          Contact form is not configured. Please email me directly.
        </p>
      )}

      {status === "success" && (
        <p className="text-center text-sm text-green-600">
          Message sent successfully! I&apos;ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}
