import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// 🔥 Firebase Imports
import { auth } from "@/lib/firebase"; // Adjust path if needed
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false); // Optional: loading state
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Carbon Footprint', path: '/carbon-footprint' },
    { name: 'Digital Calculator', path: '/calculator' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // ✅ Google Sign-In Function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast({
        title: "Signed In Successfully",
        description: `Welcome back, ${user.displayName}!`,
      });

      console.log("User signed in:", user);
    } catch (error: unknown) {
      console.error("Error signing in with Google:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        title: "Sign-In Failed",
        description: errorMessage || "An error occurred during sign-in.",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-green-500 p-2 rounded-lg shadow">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">CarbonPrint</span>
          </Link>

          {/* Desktop Nav + Theme Toggle + Sign-In */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                    : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Theme"
              className="transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>

            {/* Google Sign-In Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={signInWithGoogle}
              disabled={isSigningIn}
              className="flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-800"
            >
              {isSigningIn ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-green-600"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="#4285F4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button + Sign-In */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Theme"
              className="transition-all duration-200"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>

            {/* Mobile Menu Toggler */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                      : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Sign-In Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={signInWithGoogle}
                disabled={isSigningIn}
                className="w-full mt-2 flex items-center justify-center gap-2 border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
              >
                {isSigningIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-green-600"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="#4285F4">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;