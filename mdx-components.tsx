import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use default HTML elements with prose styling from globals.css
    ...components,
  };
}
