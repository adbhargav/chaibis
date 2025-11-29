"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "", general: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    let valid = true;
    const newErrors = { 
      email: "", 
      password: "",
      general: "",
    };
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Check if user exists in localStorage
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        // User found, save to session
        const userSession = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          zipCode: user.zipCode || '',
          joinDate: user.joinDate || new Date().toLocaleDateString(),
          loyaltyPoints: user.loyaltyPoints || 0,
        };
        
        localStorage.setItem('user', JSON.stringify(userSession));
        
        // Get return URL or default to home
        const returnUrl = searchParams.get('returnUrl') || '/';
        router.push(returnUrl);
      } else {
        setErrors({
          email: "",
          password: "",
          general: "Invalid email or password. Please try again or sign up."
        });
        setIsLoading(false);
      }
    } catch (error) {
      setErrors({
        email: "",
        password: "",
        general: "An error occurred. Please try again."
      });
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    try {
      // Create a guest user session with more complete data
      const guestUser = {
        id: `guest_${Date.now()}`,
        name: 'Guest User',
        email: `guest_${Math.random().toString(36).substr(2, 9)}@chaibisket.com`,
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        joinDate: new Date().toISOString(),
        loyaltyPoints: 0,
        isGuest: true,
        guestToken: `gt_${Math.random().toString(36).substr(2, 16)}`,
      };
      
      // Save to session with error handling
      try {
        localStorage.setItem('user', JSON.stringify(guestUser));
        // Also set a flag to identify guest users across page refreshes
        localStorage.setItem('isGuest', 'true');
        
        // Dispatch event to update all components about the login
        window.dispatchEvent(new CustomEvent('user-login', { detail: guestUser }));
        
        // Redirect to home with a small delay to ensure state updates
        setTimeout(() => {
          router.push('/');
          router.refresh(); // Force a refresh to update all components
        }, 100);
      } catch (error) {
        console.error('Error saving guest session:', error);
        setErrors({
          email: "",
          password: "",
          general: "Could not save guest session. Please try again."
        });
      }
    } catch (error) {
      console.error('Error creating guest session:', error);
      setErrors({
        email: "",
        password: "",
        general: "An error occurred. Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050302] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl border border-[#2d1a11] bg-[#120a07] text-[#f5eddc]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-24 w-24 rounded-full border-2 border-[#2d1a11] overflow-hidden">
              <Image src="/images/logo.jpg" alt="Chai Bisket" width={96} height={96} className="object-cover" />
            </div>
          </div>
          <CardTitle className="text-2xl text-[#f5eddc]">Welcome Back</CardTitle>
          <p className="text-sm text-[#f5eddc]/70">Sign in to your Chai Bisket account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-[#2d120b] border border-[#c87534]/30 text-[#f5eddc] px-4 py-3 rounded-xl text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#f5eddc]">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.email ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-rose-600">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#f5eddc]">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.password ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#f5eddc]/60"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-rose-600">{errors.password}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <Button 
              type="button" 
              onClick={handleGuestLogin}
              className="w-full bg-[#120a07] hover:bg-[#1c0f08] text-[#f5eddc] border border-[#2d1a11] font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mt-3"
            >
              Continue as Guest
            </Button>
          </form>
          
          <div className="mt-6 text-center text-[#f5eddc]/80">
            <span>Don&apos;t have an account? </span>
            <Link 
              href="/signup" 
              className="text-[#f0a35c] hover:text-[#ffd9a0] font-medium text-lg underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
              Sign up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link 
              href="/" 
              className="text-[#f0a35c] hover:text-[#ffd9a0] font-medium text-lg underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
              ← Back to Home
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
