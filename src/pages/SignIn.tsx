"use client";
import React, { useState } from "react";
import axios from "axios";
import { BackgroundBeams } from "../components/ui/beam";

interface RegisterProps {
  onNavigate?: () => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased overflow-hidden">
      {/* Background Beams */}
      <BackgroundBeams />
      
      {/* Content Container */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center space-y-6 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
            Incognito.H
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base mt-2">
            Join our anonymous community
          </p>
        </div>
        
        {/* Register Form */}
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm px-6 py-8 sm:px-8 sm:py-10 shadow-2xl">
            <h5 className="font-medium text-center text-neutral-200 text-lg sm:text-xl mb-6">
              Create an Account
            </h5>
            
            <form onSubmit={handleRegister} className="w-full space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Secret Code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-black border border-neutral-700 text-white font-medium hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </form>
            
            {/* Optional Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-neutral-500 text-sm">
                Already have an account?{" "}
                <button 
                  onClick={onNavigate}
                  className="text-white hover:text-neutral-300 font-medium transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}