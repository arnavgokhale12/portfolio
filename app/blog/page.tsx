import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog | Arnav Gokhale",
  description: "Thoughts on software engineering, ML, and building products.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="bg-gray-50 py-16 dark:bg-gray-950">
      <div className="container-wide">
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Blog
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Thoughts & Writing
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Notes on software engineering, machine learning, economics, and building products.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span>·</span>
                            <div className="flex gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-brand-600 dark:text-brand-400">
                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              Blog posts coming soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
