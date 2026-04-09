import { Metadata } from "next";
import { ContactForm } from "@/components";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Open to new opportunities and collaborations.`,
};

export default function ContactPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Header */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="container-wide py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
              Contact
            </p>
            <h1 className="mb-4 text-4xl font-bold text-gray-100 md:text-5xl">
              Let&apos;s connect
            </h1>
            <p className="text-xl text-gray-400">
              I&apos;m always open to discussing new opportunities, interesting
              projects, or collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-gray-900 p-6 md:p-8 border border-gray-800">
                <h2 className="mb-6 text-xl font-bold text-gray-100">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Direct Contact */}
              <div className="rounded-2xl bg-gray-900 p-6 border border-gray-800">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-800"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900/40 text-brand-400">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-100">Email</div>
                      <div className="text-sm text-gray-400">{siteConfig.email}</div>
                    </div>
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-800"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/40 text-blue-400">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-100">LinkedIn</div>
                      <div className="text-sm text-gray-400">Connect with me</div>
                    </div>
                  </a>

                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-800"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-gray-300">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-100">GitHub</div>
                      <div className="text-sm text-gray-400">Check out my code</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold">Response Time</h3>
                <p className="text-sm text-brand-100">
                  I typically respond within 1-2 business days. For urgent matters,
                  LinkedIn messages tend to get a faster response.
                </p>
              </div>

              {/* Currently */}
              <div className="rounded-2xl bg-gray-900 p-6 border border-gray-800">
                <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Currently Open To
                </h3>
                <ul className="space-y-2">
                  {[
                    "Data science internships",
                    "Research collaborations",
                    "Full-time opportunities (2026)",
                    "Interesting side projects",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
