'use client';

import Link from 'next/link';
import { ShoppingCart, Utensils, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  cartCount: number;
}

const Navbar = ({ cartCount }: NavbarProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check login status
  const checkLoginStatus = () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          // Show "Guest" for guest users
          if (userData.isGuest) {
            setUserName('Guest');
          } else {
            setUserName(userData.name || '');
          }
        } catch (e) {
          setIsLoggedIn(false);
          setUserName('');
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    }
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login status on mount
  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // Listen for custom logout event
    const handleLogout = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-logout', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-logout', handleLogout);
    };
  }, []);

  // Close menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsAuthOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById('navbar');
      if (isMenuOpen && navbar && !navbar.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsAuthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle logout
  const handleLogout = () => {
    // Clear user session from localStorage
    localStorage.removeItem('user');
    // Update state
    setIsLoggedIn(false);
    setUserName('');
    // Dispatch a custom event to notify other components of logout
    window.dispatchEvent(new CustomEvent('user-logout'));
    // Redirect to home page
    router.push("/");
  };

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-50 w-full border-b border-[#2d1a11] transition-all duration-300 ${isScrolled ? 'bg-[#050302]/95 backdrop-blur-md py-2 shadow-sm' : 'bg-[#050302]/85 backdrop-blur-sm py-3'
        }`}
    >
      <div className="container flex h-auto items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full border border-[#2d1a11] overflow-hidden bg-[#120a07]">
            <Image src="/images/logo.jpg" alt="Chai Bisket" width={56} height={56} className="object-cover" />
          </div>
          <div>
            <span className="text-lg font-semibold text-[#f5eddc] block leading-tight">CHAI BISKET</span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#f5eddc]/60">Indian Eatery</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#menu" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Menu</Link>
          <Link href="#our-story" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Our Story</Link>
          <Link href="#location" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Location</Link>
          <Link href="#contact" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Contact</Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-[#f5eddc] hover:bg-[#1c120c]"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c87534] text-xs font-medium text-[#120a06]">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#f5eddc] hover:bg-[#1c120c]"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsAuthOpen(false);
            }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Auth Buttons - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="default"
                  className="text-sm h-8 px-3"
                  onClick={() => router.push('/profile')}
                >
                  {userName}
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="text-sm h-8 px-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="default" asChild className="text-sm h-8 px-3">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="default" asChild className="text-sm h-8 px-3">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Auth Button */}
          <div className="md:hidden relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#f5eddc] hover:bg-[#1c120c]"
              onClick={() => {
                setIsAuthOpen(!isAuthOpen);
                setIsMenuOpen(false);
              }}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Auth Dropdown */}
            {isAuthOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#120a07] border border-[#2d1a11] rounded-lg shadow-lg z-50">
                <div className="py-1">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-left hover:bg-[#1c120c] text-[#f5eddc]"
                        onClick={() => {
                          setIsAuthOpen(false);
                          setIsMenuOpen(false);
                          router.push('/profile');
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-left hover:bg-[#1c120c] text-[#f5eddc]"
                        onClick={() => {
                          setIsAuthOpen(false);
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-left hover:bg-[#1c120c] text-[#f5eddc]"
                        asChild
                        onClick={() => {
                          setIsAuthOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-left hover:bg-[#1c120c] text-[#f5eddc]"
                        asChild
                        onClick={() => {
                          setIsAuthOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#120a07] border-b border-[#2d1a11] shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="container px-4 py-3 flex flex-col space-y-3">
            <Link
              href="#menu"
              className="py-3 text-[#f5eddc]/90 hover:text-[#ffd9a0] transition-colors font-medium border-b border-[#2d1a11]"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="#our-story"
              className="py-3 text-[#f5eddc]/90 hover:text-[#ffd9a0] transition-colors font-medium border-b border-[#2d1a11]"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="#location"
              className="py-3 text-[#f5eddc]/90 hover:text-[#ffd9a0] transition-colors font-medium border-b border-[#2d1a11]"
              onClick={() => setIsMenuOpen(false)}
            >
              Location
            </Link>
            <Link
              href="#contact"
              className="py-3 text-[#f5eddc]/90 hover:text-[#ffd9a0] transition-colors font-medium border-b border-[#2d1a11]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "auto";