"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconMessageCircle,
  IconUsers,
  IconSettings,
  IconSend,
  IconMicrophone,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { StarsBackground } from "../components/ui/starsback";
import { ShootingStars } from "../components/ui/shootingstar";
import IconRipple from "../components/ui/icon-ripple";
import { joinRoom } from "../lib/socket";

// =======================
// MAIN CHAT PAGE
// =======================
export default function Chat() {
  const [open, setOpen] = useState(false);

  const links = [
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

  return (
    <div className="relative flex w-full h-screen overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-900">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {open ? (
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-2">
                <div className="p-2 pb-1 text-xs opacity-60 tracking-wide text-neutral-600 dark:text-neutral-400">Other Threads</div>
                
                <div className="flex items-center gap-2 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded">
                  <div className="text-2xl font-thin opacity-30 tabular-nums text-neutral-500 dark:text-neutral-400">01</div>
                  <img className="w-8 h-8 rounded" src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Album cover"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">Dio Lupa</div>
                    <div className="text-xs font-semibold opacity-60 text-neutral-600 dark:text-neutral-400 truncate">REMAINING REASON</div>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded">
                  <div className="text-2xl font-thin opacity-30 tabular-nums text-neutral-500 dark:text-neutral-400">02</div>
                  <img className="w-8 h-8 rounded" src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="Album cover"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">Ellie Beilish</div>
                    <div className="text-xs font-semibold opacity-60 text-neutral-600 dark:text-neutral-400 truncate">BEARS OF A FEVER</div>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded">
                  <div className="text-2xl font-thin opacity-30 tabular-nums text-neutral-500 dark:text-neutral-400">03</div>
                  <img className="w-8 h-8 rounded" src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Album cover"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">Sabrino Gardener</div>
                    <div className="text-xs font-semibold opacity-60 text-neutral-600 dark:text-neutral-400 truncate">CAPPUCCINO</div>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-2">
                <IconUsers className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
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

      {/* Chat UI */}
      <ChatUI />

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
// CHAT UI
// =======================
const ChatUI = () => {
  type Message = {
    text: string;
    sender: string; // "me" | other username
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // === Phoenix channel integration ===
  const channelRef = useRef<any>(null);
  // Import joinRoom at the top of the file instead of using require

  useEffect(() => {
    // join backend channel
    const channel = joinRoom("lobby");
    channelRef.current = channel;
    channelRef.current = channel;

    // listen for messages
    channel.on("new_msg", (msg: any) => {
      setMessages((prev) => [
        ...prev,
        { text: msg.body, sender: msg.user },
      ]);
    });

    return () => {
      channel.leave();
    };
  }, []);

  // smooth scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !channelRef.current) return;

    // push message to backend
    channelRef.current.push("new_msg", { body: input });

    setMessages((prev) => [...prev, { text: input, sender: "me" }]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleMic = () => setRecording((r) => !r);

  return (
    <div className="relative flex flex-1 flex-col h-full text-white overflow-hidden bg-black">
      {/* Background */}
      <StarsBackground className="absolute inset-0 z-0" />
      <ShootingStars className="absolute inset-0 z-10" />

      {/* Foreground */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <header className="p-4 bg-black/80 backdrop-blur-sm border-b border-neutral-800 text-center font-bold text-lg">
          Incognito.h
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 scroll-smooth">
          {messages.length === 0 ? (
            <p className="text-neutral-400 text-center mt-10">
              👋 Start chatting anonymously…
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== "me" && (
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`}
                    className="h-8 w-8 rounded-full"
                    alt="Avatar"
                  />
                )}

                <div
                  className={`px-4 py-2 rounded-lg shadow text-sm leading-relaxed break-words
                    ${
                      msg.sender === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-neutral-700 text-white rounded-bl-none"
                    }`}
                  style={{ maxWidth: "70%" }}
                >
                  {msg.text}
                </div>

                {msg.sender === "me" && (
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=me"
                    className="h-8 w-8 rounded-full"
                    alt="My Avatar"
                  />
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-800 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center bg-neutral-900/80 rounded-lg px-3 py-2">
            {/* Mic */}
            <div onClick={toggleMic} className="cursor-pointer">
              <IconRipple
                borderColor={recording ? "#3b82f6" : "transparent"}
                iconColor={recording ? "#3b82f6" : "#888"}
                icon={IconMicrophone}
                iconSize={22}
              />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 mx-3 bg-transparent text-white outline-none"
            />

            {/* Send */}
            <IconSend
              onClick={handleSend}
              className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


// =======================
// LOGO COMPONENTS
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