"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconMessageCircle,
  IconUsers,
  IconSettings,
  IconPlus,
  IconTrash,
  IconEdit,
  IconSearch,
  IconHash,
  IconClock,
  IconMessage,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

// =======================
// TYPES
// =======================
type Thread = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  lastActivity: Date;
  messageCount: number;
  participants: string[];
  isActive: boolean;
  tags: string[];
};

// =======================
// MAIN THREADS PAGE
// =======================
export default function Thread() {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "archived">("all");

  // Sample threads data
  useEffect(() => {
    const sampleThreads: Thread[] = [
      {
        id: "1",
        title: "Web Development Discussion",
        description: "Discussing latest trends in web development, React, and Next.js frameworks.",
        createdAt: new Date("2024-08-20"),
        lastActivity: new Date("2024-08-25"),
        messageCount: 47,
        participants: ["alice", "bob", "charlie"],
        isActive: true,
        tags: ["web-dev", "react", "javascript"]
      },
      {
        id: "2", 
        title: "Design System Planning",
        description: "Planning and discussing the implementation of our new design system.",
        createdAt: new Date("2024-08-18"),
        lastActivity: new Date("2024-08-24"),
        messageCount: 23,
        participants: ["diana", "eve", "frank"],
        isActive: true,
        tags: ["design", "ui-ux", "planning"]
      },
      {
        id: "3",
        title: "Project Alpha Updates",
        description: "Weekly updates and progress reports for Project Alpha milestone.",
        createdAt: new Date("2024-08-15"),
        lastActivity: new Date("2024-08-22"),
        messageCount: 15,
        participants: ["grace", "henry"],
        isActive: false,
        tags: ["project", "updates", "milestone"]
      },
      {
        id: "4",
        title: "Tech Stack Migration",
        description: "Discussing the migration from legacy systems to modern tech stack.",
        createdAt: new Date("2024-08-10"),
        lastActivity: new Date("2024-08-23"),
        messageCount: 89,
        participants: ["ian", "jack", "kelly", "liam"],
        isActive: true,
        tags: ["migration", "tech-stack", "legacy"]
      }
    ];
    setThreads(sampleThreads);
  }, []);

  const sidebarLinks = [
    {
      label: "Chats",
      href: "#",
      icon: (
        <IconMessageCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Groups",
      href: "#",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "active" && thread.isActive) ||
                         (selectedFilter === "archived" && !thread.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const createNewThread = () => {
    const newThread: Thread = {
      id: Date.now().toString(),
      title: "New Thread",
      description: "Click to edit description...",
      createdAt: new Date(),
      lastActivity: new Date(),
      messageCount: 0,
      participants: ["me"],
      isActive: true,
      tags: ["new"]
    };
    setThreads([newThread, ...threads]);
  };

  const deleteThread = (id: string) => {
    setThreads(threads.filter(thread => thread.id !== id));
  };

  const toggleThreadStatus = (id: string) => {
    setThreads(threads.map(thread => 
      thread.id === id ? { ...thread, isActive: !thread.isActive } : thread
    ));
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-900">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {sidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {open && (
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-2">
                <div className="p-2 pb-1 text-xs opacity-60 tracking-wide text-neutral-600 dark:text-neutral-400">
                  Quick Stats
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Total Threads:</span>
                    <span className="font-semibold">{threads.length}</span>
                  </div>
                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Active:</span>
                    <span className="font-semibold text-green-600">{threads.filter(t => t.isActive).length}</span>
                  </div>
                  <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                    <span>Archived:</span>
                    <span className="font-semibold text-orange-600">{threads.filter(t => !t.isActive).length}</span>
                  </div>
                </div>
              </div>
            )}
            <div>
              <SidebarLink
                link={{
                  label: "Anonymous",
                  href: "#",
                  icon: (
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=anon"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Threads Management UI */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-neutral-900">
        {/* Header */}
        <header className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Discussion Threads
            </h1>
            <button
              onClick={createNewThread}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <IconPlus className="h-4 w-4" />
              New Thread
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              {["all", "active", "archived"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter as typeof selectedFilter)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    selectedFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {filteredThreads.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                <IconMessage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No threads found</p>
                <p className="text-sm">Create a new thread to get started</p>
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                          {thread.title}
                        </h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          thread.isActive 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        }`}>
                          {thread.isActive ? "Active" : "Archived"}
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        {thread.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-xs"
                          >
                            <IconHash className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-1">
                          <IconMessage className="h-4 w-4" />
                          {thread.messageCount} messages
                        </div>
                        <div className="flex items-center gap-1">
                          <IconUsers className="h-4 w-4" />
                          {thread.participants.length} participants
                        </div>
                        <div className="flex items-center gap-1">
                          <IconClock className="h-4 w-4" />
                          {formatDate(thread.lastActivity)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleThreadStatus(thread.id)}
                        className="p-2 text-neutral-500 hover:text-blue-600 transition-colors"
                        title={thread.isActive ? "Archive thread" : "Activate thread"}
                      >
                        <IconEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteThread(thread.id)}
                        className="p-2 text-neutral-500 hover:text-red-600 transition-colors"
                        title="Delete thread"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hide scrollbars globally */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
}

// =======================
// LOGO COMPONENTS (Same as original)
// =======================
export const Logo = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium whitespace-pre text-black dark:text-white"
    >
      Incognito.h
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </a>
);