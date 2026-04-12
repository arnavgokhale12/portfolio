"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  Home,
  FolderKanban,
  User,
  FileText,
  Mail,
  Moon,
  Sun,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Menu"
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/4 w-full max-w-lg -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500 dark:border-gray-700 dark:text-white"
        />

        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="mb-2">
            <Command.Item
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Home className="h-4 w-4" />
              Home
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/projects"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/about"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <User className="h-4 w-4" />
              About
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/resume"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <FileText className="h-4 w-4" />
              Resume
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <MessageSquare className="h-4 w-4" />
              Blog
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/contact"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Theme" className="mb-2">
            <Command.Item
              onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              Toggle theme
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Links" className="mb-2">
            <Command.Item
              onSelect={() => runCommand(() => window.open("https://github.com/arnavgokhale12", "_blank"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              GitHub
              <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => window.open("https://linkedin.com/in/arnavgokhale", "_blank"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
              <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
          <p className="text-xs text-gray-500">
            Press <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs dark:bg-gray-800">Esc</kbd> to close
          </p>
        </div>
      </div>
    </Command.Dialog>
  );
}
