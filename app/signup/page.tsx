"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    general: "",
  });

  type FormErrors = typeof errors;

  const validateForm = () => {
    let valid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      general: ""
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
      valid = false;
    }

    // ZIP code validation - trim whitespace before validation
    const trimmedZipCode = formData.zipCode.trim();
    if (!trimmedZipCode) {
      newErrors.zipCode = "ZIP code is required";
      valid = false;
    } else if (!/^[0-9]{5,6}$/.test(trimmedZipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP/PIN code (5 digits for USA, 6 digits for India)";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim whitespace from all fields before validation
    const trimmedFormData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      zipCode: formData.zipCode.trim()
    };

    setFormData(trimmedFormData);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Save user to localStorage
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === trimmedFormData.email);
      if (existingUser) {
        setErrors({
          ...errors,
          email: "An account with this email already exists. Please sign in instead."
        });
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: trimmedFormData.name,
        email: trimmedFormData.email,
        password: trimmedFormData.password, // In production, this should be hashed
        phone: '',
        address: trimmedFormData.address,
        city: trimmedFormData.city,
        state: trimmedFormData.state,
        zipCode: trimmedFormData.zipCode,
        joinDate: new Date().toLocaleDateString(),
        loyaltyPoints: 0,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Save to session
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        city: newUser.city,
        state: newUser.state,
        zipCode: newUser.zipCode,
        joinDate: newUser.joinDate,
        loyaltyPoints: newUser.loyaltyPoints,
      };

      localStorage.setItem('user', JSON.stringify(userSession));

      setIsLoading(false);
      router.push("/profile"); // Redirect to profile page after signup
    } catch (error) {
      setErrors({
        ...errors,
        general: "An error occurred. Please try again."
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050302] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl border border-[#2d1a11] bg-[#120a07] text-[#f5eddc]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/images/logo.jpg" alt="Chai Bisket" className="h-16 w-16 rounded-full object-cover border border-[#2d1a11]" />
          </div>
          <CardTitle className="text-2xl text-[#f5eddc]">Create Account</CardTitle>
          <p className="text-sm text-[#f5eddc]/70">Sign up for a Chai Bisket account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-[#2d120b] border border-[#c87534]/30 text-[#f5eddc] px-4 py-3 rounded-xl text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-[#f5eddc]">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.name ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                placeholder="Enter your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-rose-600">{errors.name}</p>
              )}
            </div>

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
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-[#f5eddc]">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.confirmPassword ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                  placeholder="Confirm your password"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="text-sm text-rose-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="border-t border-[#2d1a11] pt-4 mt-4">
              <h3 className="text-lg font-medium text-[#f5eddc] mb-3">Delivery Address</h3>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-[#f5eddc]">Street Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.address ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                  placeholder="123 Main St"
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                {errors.address && (
                  <p id="address-error" className="text-sm text-rose-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium text-[#f5eddc]">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.city ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                    placeholder="City"
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  {errors.city && (
                    <p id="city-error" className="text-sm text-rose-600">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium text-[#f5eddc]">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.state ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                    placeholder="State"
                    aria-invalid={!!errors.state}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  />
                  {errors.state && (
                    <p id="state-error" className="text-sm text-rose-600">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <label htmlFor="zipCode" className="text-sm font-medium text-[#f5eddc]">ZIP Code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.zipCode ? "border-[#ff9b7a]" : "border-[#2d1a11]"}`}
                  placeholder="12345 or 123456"
                  aria-invalid={!!errors.zipCode}
                  aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
                />
                {errors.zipCode && (
                  <p id="zipCode-error" className="text-sm text-rose-600">{errors.zipCode}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-[#f5eddc]/80">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="text-[#f0a35c] hover:text-[#ffd9a0] font-medium text-lg underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
              Sign in
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
