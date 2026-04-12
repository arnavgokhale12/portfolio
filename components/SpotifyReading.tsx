"use client";

import { motion } from "framer-motion";
import { BookOpen, Music, ExternalLink } from "lucide-react";

interface Book {
  title: string;
  author: string;
  link?: string;
}

interface SpotifyTrack {
  name: string;
  artist: string;
}

const currentlyReading: Book[] = [
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    link: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    link: "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer",
  },
];

const recentTracks: SpotifyTrack[] = [
  { name: "Blinding Lights", artist: "The Weeknd" },
  { name: "Starboy", artist: "The Weeknd" },
  { name: "Levitating", artist: "Dua Lipa" },
];

export function SpotifyReading() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-950">
      <div className="container-wide">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Currently Reading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Currently Reading
              </h3>
            </div>
            <div className="space-y-4">
              {currentlyReading.map((book) => (
                <div key={book.title} className="group">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <p className="font-medium text-gray-800 group-hover:text-brand-600 dark:text-gray-200 dark:group-hover:text-brand-400">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {book.author}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spotify / Music */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-4 flex items-center gap-2">
              <Music className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recently Played
              </h3>
            </div>
            <div className="space-y-3">
              {recentTracks.map((track, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {track.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {track.artist}
                    </p>
                  </div>
                  <div className="flex h-4 items-end gap-0.5">
                    {[1, 2, 3].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-1 rounded-full bg-green-500"
                        animate={{
                          height: [8, 16, 8],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: bar * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Open Spotify
              <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
