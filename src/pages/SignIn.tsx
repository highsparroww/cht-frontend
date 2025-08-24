"use client";

import React, { useState } from "react";
import axios from "axios";

interface RegisterProps {
  onNavigate?: () => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      alert(res.data.message || "User registered successfully!");

      // Optionally redirect to Sign In page after registration
      if (onNavigate) onNavigate();
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 duration-1000 animate-in fade-in zoom-in-95 slide-in-from-top-8 lg:space-y-6 lg:bg-gray-50 dark:lg:bg-background">
      {/* Logo */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Incognito.H</h1>
      </div>

      {/* Register Form */}
      <div className="flex w-full max-w-sm flex-col items-center space-y-10 rounded-lg border-transparent bg-background px-6 dark:border-border dark:shadow md:w-8/12 md:border md:px-8 md:py-6 md:shadow lg:w-5/12 lg:px-6 xl:w-4/12 xl:py-8 2xl:w-3/12">
        <h5 className="font-medium text-center">Create an Account</h5>

        <form onSubmit={handleRegister} className="w-full space-y-2.5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Secret Code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
