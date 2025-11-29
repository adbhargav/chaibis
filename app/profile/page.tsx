"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, MapPin, CreditCard, Home } from "lucide-react";
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Get cart count from localStorage
  const getCartCount = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          return cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
        } catch (e) {
          return 0;
        }
      }
    }
    return 0;
  };

  // Check for tab query parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['profile', 'password', 'orders', 'loyalty'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  // Update cart count on mount and when localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Load user data from localStorage
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    joinDate: "",
    loyaltyPoints: 0,
  });

  // Load user data and orders on mount
  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          zipCode: userData.zipCode || "",
          joinDate: userData.joinDate || new Date().toLocaleDateString(),
          loyaltyPoints: userData.loyaltyPoints || 0,
        });
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
      } catch (e) {
        console.error('Failed to parse user data', e);
        router.push('/login');
      }
    } else {
      // No user logged in, redirect to login
      router.push('/login');
    }
  }, [router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Validation
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Save data to localStorage
    try {
      const updatedUserData = {
        ...userData,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      // Update users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === userData.email);
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        };
        localStorage.setItem('users', JSON.stringify(users));
      }

      setUserData(updatedUserData);
      setIsEditing(false);
    } catch (e) {
      console.error('Failed to save user data', e);
    }
  };

  const handleChangePassword = () => {
    // Validation
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }

    if (!passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
      valid = false;
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Save password (in a real app this would be an API call)
    console.log("Password changed successfully");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#050302] flex items-center justify-center">
        <div className="animate-pulse text-[#f5eddc]/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050302] text-[#f5eddc]">
      <Navbar cartCount={cartCount} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#f5eddc]">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="rounded-3xl bg-[#120a07] border-[#2d1a11] text-[#f5eddc]">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="mx-auto h-20 w-20 rounded-full bg-[#c87534] grid place-items-center text-[#120a06] font-bold text-2xl mb-3">
                    {userData.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-[#f5eddc]/70 text-sm">{userData.email}</p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1a100b] text-[#f0a35c] border border-[#c87534]/20">
                    <span>Member since {userData.joinDate}</span>
                  </div>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-colors ${activeTab === "profile"
                        ? "bg-[#1a100b] text-[#f0a35c] font-medium border border-[#c87534]/20"
                        : "text-[#f5eddc]/70 hover:bg-[#1a100b] hover:text-[#f5eddc]"
                      }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-colors ${activeTab === "password"
                        ? "bg-[#1a100b] text-[#f0a35c] font-medium border border-[#c87534]/20"
                        : "text-[#f5eddc]/70 hover:bg-[#1a100b] hover:text-[#f5eddc]"
                      }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Change Password
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-colors ${activeTab === "orders"
                        ? "bg-[#1a100b] text-[#f0a35c] font-medium border border-[#c87534]/20"
                        : "text-[#f5eddc]/70 hover:bg-[#1a100b] hover:text-[#f5eddc]"
                      }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Order History
                  </button>
                  <button
                    onClick={() => setActiveTab("loyalty")}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-colors ${activeTab === "loyalty"
                        ? "bg-[#1a100b] text-[#f0a35c] font-medium border border-[#c87534]/20"
                        : "text-[#f5eddc]/70 hover:bg-[#1a100b] hover:text-[#f5eddc]"
                      }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Loyalty Points
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="w-full text-left px-4 py-3 rounded-xl flex items-center text-[#f5eddc]/70 hover:bg-[#1a100b] hover:text-[#f5eddc] transition-colors"
                  >
                    <Home className="h-5 w-5 mr-3" />
                    Home Page
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card className="rounded-3xl bg-[#120a07] border-[#2d1a11] text-[#f5eddc]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.name ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                              }`}
                          />
                          {errors.name && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.email ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                              }`}
                          />
                          {errors.email && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.phone ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                              }`}
                          />
                          {errors.phone && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.phone}</p>}
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                            Delivery Address
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.address ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                              }`}
                          />
                          {errors.address && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.address}</p>}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({ ...userData }); // Reset form data
                          }}
                          className="mr-3 border-[#2d1a11] text-[#f5eddc] hover:bg-[#1a100b]"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-[#f5eddc]/60">Full Name</h3>
                          <p className="mt-1 text-[#f5eddc]">{userData.name}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-[#f5eddc]/60">Email Address</h3>
                          <p className="mt-1 text-[#f5eddc]">{userData.email}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-[#f5eddc]/60">Phone Number</h3>
                          <p className="mt-1 text-[#f5eddc]">{userData.phone}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-[#f5eddc]/60">Delivery Address</h3>
                          <p className="mt-1 text-[#f5eddc]">
                            {userData.address}
                            {userData.city && `, ${userData.city}`}
                            {userData.state && `, ${userData.state}`}
                            {userData.zipCode && ` ${userData.zipCode}`}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-[#f5eddc]/60">Member Since</h3>
                          <p className="mt-1 text-[#f5eddc]">{userData.joinDate}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-[#f5eddc]/60">Loyalty Points</h3>
                          <p className="mt-1 text-[#f5eddc]">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1a100b] text-[#f0a35c] border border-[#c87534]/20">
                              {userData.loyaltyPoints} points
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "password" && (
              <Card className="rounded-3xl bg-[#120a07] border-[#2d1a11] text-[#f5eddc]">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.currentPassword ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                            }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#f5eddc]/60"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.currentPassword}</p>}
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.newPassword ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                          }`}
                      />
                      {errors.newPassword && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.newPassword}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChange}
                        className={`w-full border rounded-xl px-4 py-3 bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${errors.confirmNewPassword ? "border-[#ff9b7a]" : "border-[#2d1a11]"
                          }`}
                      />
                      {errors.confirmNewPassword && <p className="mt-1 text-sm text-[#ff9b7a]">{errors.confirmNewPassword}</p>}
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleChangePassword}
                        className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]"
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card className="rounded-3xl bg-[#120a07] border-[#2d1a11] text-[#f5eddc]">
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                    const userOrders = orders.filter((order: any) => order.userEmail === userData.email);

                    if (userOrders.length === 0) {
                      return (
                        <div className="text-center py-12">
                          <div className="mx-auto h-16 w-16 rounded-full bg-[#1a100b] grid place-items-center text-[#c87534] mb-4 border border-[#c87534]/20">
                            <CreditCard className="h-8 w-8" />
                          </div>
                          <h3 className="text-lg font-medium text-[#f5eddc] mb-1">No orders yet</h3>
                          <p className="text-[#f5eddc]/70 mb-6">Your order history will appear here once you place an order.</p>
                          <Button asChild className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]">
                            <Link href="/">Start Ordering</Link>
                          </Button>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        {userOrders.reverse().map((order: any, index: number) => (
                          <div key={index} className="border border-[#2d1a11] bg-[#050302] rounded-xl p-6 hover:border-[#c87534]/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-semibold text-[#f5eddc]">Order #{order.orderId}</h3>
                                <p className="text-sm text-[#f5eddc]/70 mt-1">{order.orderDate}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-[#f0a35c]">${order.total.toFixed(2)}</p>
                                <p className="text-xs text-[#f5eddc]/60 mt-1 capitalize">{order.status || 'Completed'}</p>
                              </div>
                            </div>

                            <div className="border-t border-[#2d1a11] pt-4">
                              <h4 className="text-sm font-medium text-[#f5eddc]/80 mb-2">Items:</h4>
                              <ul className="space-y-1">
                                {order.items.map((item: any, itemIndex: number) => (
                                  <li key={itemIndex} className="text-sm text-[#f5eddc]/70 flex justify-between">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {order.deliveryAddress && (
                              <div className="border-t border-[#2d1a11] pt-4 mt-4">
                                <p className="text-xs text-[#f5eddc]/60">
                                  <span className="font-medium">Delivery to:</span> {order.deliveryAddress}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {activeTab === "loyalty" && (
              <Card className="rounded-3xl bg-[#120a07] border-[#2d1a11] text-[#f5eddc]">
                <CardHeader>
                  <CardTitle>Loyalty Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#1a100b] text-[#c87534] mb-4 border border-[#c87534]/20">
                      <span className="text-2xl font-bold">{userData.loyaltyPoints}</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#f5eddc] mb-2">Loyalty Points</h3>
                    <p className="text-[#f5eddc]/70 max-w-md mx-auto mb-6">
                      Earn points with every purchase and redeem them for discounts on future orders.
                    </p>
                    <div className="bg-[#050302] border border-[#2d1a11] rounded-2xl p-6 max-w-md mx-auto text-left">
                      <h4 className="font-medium text-[#f5eddc] mb-3">How it works:</h4>
                      <ul className="space-y-2 text-sm text-[#f5eddc]/70">
                        <li className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#c87534] mt-2 mr-3"></span>
                          <span>Earn 1 point for every $1 spent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#c87534] mt-2 mr-3"></span>
                          <span>100 points = $5 off your next order</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#c87534] mt-2 mr-3"></span>
                          <span>Special rewards for loyal customers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
