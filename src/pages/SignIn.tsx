import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "../components/ui/beam";

// Types for better TypeScript support
interface User {
  id: string;
  username: string;
  created_at: string;
}

interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

interface ErrorResponse {
  error: string;
}

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Rust backend URL
  const API_URL = "http://127.0.0.1:5000";

  // Check if user is already logged in (from memory/state only)
  useEffect(() => {
    // You can implement session persistence here if needed
    // For now, we'll keep it simple with just component state
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isRegister ? "/signup" : "/login";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username.trim(),
          password: code,
        }),
      });

      const data: AuthResponse | ErrorResponse = await response.json();

      if (!response.ok) {
        // Handle error response
        const errorData = data as ErrorResponse;
        throw new Error(errorData.error || `${isRegister ? "Registration" : "Login"} failed`);
      }

      // Handle success response
      const successData = data as AuthResponse;
      
      if (successData.token && successData.user) {
        // Save user data and token in component state
        setToken(successData.token);
        setUser(successData.user);
        
        alert(successData.message);
        
        // Clear form
        setUsername("");
        setCode("");
      } else {
        alert(successData.message);
      }

    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Handle specific error messages from Rust backend
      let errorMessage = error.message || (isRegister ? "Registration failed" : "Login failed");
      
      // Custom error handling based on your Rust backend validation
      if (errorMessage.includes("Username must be")) {
        errorMessage = "Username must be 3-50 characters and contain only letters, numbers, and underscores";
      } else if (errorMessage.includes("Password must be")) {
        errorMessage = "Password must be at least 6 characters long";
      } else if (errorMessage.includes("Username already exists")) {
        errorMessage = "This username is already taken";
      } else if (errorMessage.includes("Invalid credentials")) {
        errorMessage = "Invalid username or password";
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear state
    setUser(null);
    setToken(null);
    alert("Logged out successfully!");
  };

  // If user is logged in, show welcome screen
  if (user) {
    return (
      <div className="relative min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased overflow-hidden">
        <BackgroundBeams />

        <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
              Welcome to Incognito.H
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base mt-2">
              Hello, <span className="text-teal-400 font-medium">{user.username}</span>!
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="w-full max-w-sm sm:max-w-md">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm px-6 py-8 sm:px-8 sm:py-10 shadow-2xl text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-neutral-300 mb-2">
                  ✅ Successfully authenticated with Rust backend
                </p>
                <p className="text-neutral-500 text-sm">
                  🚀 Powered by high-performance Rust + PostgreSQL
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => alert("Dashboard coming soon!")}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Go to Dashboard
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased overflow-hidden">
      <BackgroundBeams />

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

        {/* Auth Form */}
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm px-6 py-8 sm:px-8 sm:py-10 shadow-2xl">
            <h5 className="font-medium text-center text-neutral-200 text-lg sm:text-xl mb-6">
              {isRegister ? "Create an Account" : "Sign In to Your Account"}
            </h5>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Username Field */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  maxLength={50}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Password Field */}
              <div>
                <input
                  type="password"
                  placeholder="Secret Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-black border border-neutral-700 text-white font-medium hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isRegister ? "Registering..." : "Signing In..."}
                  </div>
                ) : (
                  isRegister ? "Register" : "Sign In"
                )}
              </button>
            </form>

            {/* Toggle Between Register and Sign In */}
            <div className="mt-6 text-center">
              <p className="text-neutral-500 text-sm">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-white hover:text-neutral-300 font-medium transition-colors"
                >
                  {isRegister ? "Sign In" : "Register"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}