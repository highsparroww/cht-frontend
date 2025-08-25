"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconMessageCircle,
  IconUsers,
  IconSettings,
  IconHome,
  IconTrendingUp,
  IconCalendar,
  IconBell,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react";

// Additional icons for admin section (using simple SVGs since we can't import lucide-react here)
const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Crown = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 16L3 7l5.5 5L12 4l3.5 8L21 7l-2 9H5zm2.7-2h8.6l.9-4.4-2.1 1.8L12 8l-3.1 3.4-2.1-1.8L6.7 14z"/>
  </svg>
);

// Logo Components
const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <div className="font-medium text-black dark:text-white whitespace-pre">
        Dashboard
      </div>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const [notifications] = useState([
    { id: 1, title: "New message from Sarah", time: "2 min ago", unread: true },
    { id: 2, title: "Meeting in 30 minutes", time: "25 min ago", unread: true },
    { id: 3, title: "Project deadline reminder", time: "1 hour ago", unread: false },
  ]);

  const [stats] = useState([
    { label: "Total Messages", value: "1,234", change: "+12%", positive: true },
    { label: "Active Users", value: "856", change: "+8%", positive: true },
    { label: "Projects", value: "42", change: "-3%", positive: false },
    { label: "Tasks Completed", value: "127", change: "+15%", positive: true },
  ]);

  // Updated admin data instead of recent activity
  const [admins] = useState([
    {
      id: 1,
      name: "John Smith",
      username: "johnsmith",
      role: "Owner",
      joinedDate: "2024-01-15",
      isOnline: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      username: "sarahj",
      role: "Admin",
      joinedDate: "2024-02-20",
      isOnline: true
    },
    {
      id: 3,
      name: "Mike Chen",
      username: "mikechen",
      role: "Admin", 
      joinedDate: "2024-03-10",
      isOnline: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      username: "emmaw",
      role: "Admin",
      joinedDate: "2024-03-25",
      isOnline: true
    }
  ]);

  const totalAdmins = admins.length;
  const onlineAdmins = admins.filter(admin => admin.isOnline).length;
  const owner = admins.find(admin => admin.role === "Owner");

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            GC Name
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
            <IconBell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
            <IconSearch className="h-5 w-5" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <IconPlus className="h-4 w-4" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <IconTrendingUp className={`h-4 w-4 ${
                      stat.positive ? 'rotate-0' : 'rotate-180'
                    }`} />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Updated Admins Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Group Admins
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Total: <span className="font-medium text-neutral-900 dark:text-neutral-100">{totalAdmins}</span>
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Online: <span className="font-medium text-green-600">{onlineAdmins}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${admin.username}`}
                          className="h-10 w-10 rounded-full"
                          alt={admin.name}
                        />
                        {admin.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white dark:border-neutral-800"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {admin.name}
                          </p>
                          {admin.role === "Owner" && (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          @{admin.username} • Joined {new Date(admin.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        admin.role === "Owner" 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {admin.role}
                      </span>
                      <div className={`h-2 w-2 rounded-full ${
                        admin.isOnline ? "bg-green-400" : "bg-neutral-300 dark:bg-neutral-600"
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-b-lg border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                      <IconUsers className="h-4 w-4" />
                      <span>{totalAdmins} total admins</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      <span>{onlineAdmins} online now</span>
                    </div>
                  </div>
                  {owner && (
                    <div className="text-neutral-600 dark:text-neutral-400">
                      Owner: <span className="font-medium text-neutral-900 dark:text-neutral-100">{owner.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Group Description Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-2">
                  <IconMessageCircle className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Group Description
                  </h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700/50">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Welcome to our Community!</span>
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    This is a collaborative space where we discuss projects, share ideas, and work together. 
                    Feel free to introduce yourself and participate in ongoing conversations.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconSettings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Group Rules</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Be respectful and professional in all interactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconMessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Topics</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Project updates, discussions, announcements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconCalendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Meeting Schedule</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Weekly sync every Friday at 3 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-b-lg border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                      <IconUsers className="h-4 w-4" />
                      <span>42 members</span>
                    </div>
                    <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                      <IconCalendar className="h-4 w-4" />
                      <span>Created Jan 2024</span>
                    </div>
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    <span className="text-xs">Last updated: 2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Quick Actions
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 text-center hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors group">
                  <IconMessageCircle className="h-8 w-8 mx-auto text-blue-600 group-hover:text-blue-700" />
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mt-2">Start Chat</p>
                </button>
                <button className="p-4 text-center hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors group">
                  <IconUsers className="h-8 w-8 mx-auto text-green-600 group-hover:text-green-700" />
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mt-2">Create Group</p>
                </button>
                <button className="p-4 text-center hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors group">
                  <IconCalendar className="h-8 w-8 mx-auto text-purple-600 group-hover:text-purple-700" />
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mt-2">Schedule</p>
                </button>
                <button className="p-4 text-center hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors group">
                  <IconSettings className="h-8 w-8 mx-auto text-gray-600 group-hover:text-gray-700" />
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mt-2">Settings</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "#",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
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
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">Gaming Community</div>
                    <div className="text-xs font-semibold opacity-60 text-neutral-600 dark:text-neutral-400 truncate">REMAINING REASON</div>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded">
                  <div className="text-2xl font-thin opacity-30 tabular-nums text-neutral-500 dark:text-neutral-400">65</div>
                  <img className="w-8 h-8 rounded" src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="Album cover"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">Web dev</div>
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

      {/* Dashboard Content */}
      <DashboardContent />

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