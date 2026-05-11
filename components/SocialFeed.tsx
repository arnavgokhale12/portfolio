"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw } from "lucide-react";

interface SocialPost {
  platform: "bluesky" | "x";
  content: string;
  date: string;
  link: string;
}

const fallbackPosts: SocialPost[] = [
  {
    platform: "bluesky",
    content:
      "Things I've rebuilt from scratch just to understand them: a neural net, key-value store, HTTP server, and React-like component system.",
    date: "2026-05-08T14:35:08.144565+00:00",
    link: "https://bsky.app/profile/arnavgo.bsky.social",
  },
  {
    platform: "bluesky",
    content:
      "Hot take: the best projects come from actually needing the thing you're building. Scratch your own itch.",
    date: "2026-05-07T14:55:38.599971+00:00",
    link: "https://bsky.app/profile/arnavgo.bsky.social",
  },
];

const platformConfig = {
  bluesky: {
    name: "Bluesky",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 568 501" fill="currentColor">
        <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 googl83.823C285.169 375.625 284 368.797 284 368.797C284 368.797 282.831 375.625 280.369 383.823C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z"/>
      </svg>
    ),
  },
  x: {
    name: "X",
    color: "text-gray-400",
    bgColor: "bg-gray-500/10",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
};

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>(fallbackPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/social/bluesky");
        if (!response.ok) return;
        const data = (await response.json()) as { posts?: SocialPost[] };
        if (isMounted && data.posts?.length) {
          setPosts(data.posts);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container-wide">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Social
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Recent Posts
            </h2>
          </div>
          <div className="flex gap-3">
            <a
              href="https://bsky.app/profile/arnavgo.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
            >
              {platformConfig.bluesky.icon}
              Bluesky
            </a>
            <button
              type="button"
              onClick={async () => {
                setIsLoading(true);
                try {
                  const response = await fetch("/api/social/bluesky", { cache: "no-store" });
                  const data = (await response.json()) as { posts?: SocialPost[] };
                  if (data.posts?.length) setPosts(data.posts);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-500/10 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-500/20 dark:text-gray-400"
              aria-label="Refresh recent Bluesky posts"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <a
              href="https://x.com/arnavgokhale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-500/10 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-500/20 dark:text-gray-400"
            >
              {platformConfig.x.icon}
              X
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post, index) => {
            const platform = platformConfig[post.platform];
            return (
              <motion.a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${platform.color}`}>
                    {platform.icon}
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {post.content}
                </p>
                <p className="mt-3 text-xs text-gray-500">{formatPostDate(post.date)}</p>
              </motion.a>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Posts automated with AI-powered content generation
        </p>
      </div>
    </section>
  );
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
