"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { menuItems } from '@/app/data/menuItems';
import Image from 'next/image';

// Define types
type CartItem = {
  id: number;
  quantity: number;
};

// Reuse shared MenuItem type shape from data file (only fields we care about)
type MenuItem = (typeof menuItems)[number];

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
        setCart([]);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // Find menu item by ID
  const getMenuItem = (id: number) => {
    return menuItems.find(item => item.id === id);
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = getMenuItem(item.id);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  // Handle checkout
  const handleCheckout = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('user');

    if (isLoggedIn) {
      // User is logged in, proceed to checkout
      router.push('/checkout');
    } else {
      // User is not logged in, redirect to login with return URL
      router.push('/login?returnUrl=/checkout');
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#050302] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-[#120a07] rounded mb-8"></div>
            <div className="h-64 bg-[#120a07] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050302] text-[#f5eddc] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border border-[#2d1a11] overflow-hidden">
              <Image src="/images/logo.jpg" alt="Chai Bisket" width={48} height={48} className="object-cover" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#f5eddc]/60">Chai Bisket LLC</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#f5eddc]">Your Cart</h1>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
        </div>

        <p className="text-[#f5eddc]/70 mb-8">Review your items before checkout</p>

        {cart.length === 0 ? (
          <div className="bg-[#120a07] rounded-2xl shadow-sm p-8 text-center border border-[#2d1a11]">
            <ShoppingCart className="h-16 w-16 text-[#f5eddc]/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-[#f5eddc]/70 mb-6">Looks like you haven&apos;t added anything to your cart yet</p>
            <Button
              onClick={() => router.push('/#menu')}
              className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] overflow-hidden">
                <div className="divide-y divide-[#2d1a11]">
                  {cart.map((item) => {
                    const menuItem = getMenuItem(item.id);
                    if (!menuItem) return null;

                    return (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-[#2d1a11]">
                          <Image
                            src={menuItem.image}
                            alt={menuItem.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-[#f5eddc]">{menuItem.name}</h3>
                              <p className="text-sm text-[#f5eddc]/60 mt-1">{menuItem.description}</p>
                            </div>
                            <Button
                              variant="secondary"
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#f5eddc]/50 hover:text-[#ff7f7f]"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-[#2d1a11] rounded-lg bg-[#050302]">
                              <Button
                                variant="secondary"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-[#f5eddc] hover:bg-[#120a07]"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-3 py-1 text-[#f5eddc]">{item.quantity}</span>
                              <Button
                                variant="secondary"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-[#f5eddc] hover:bg-[#120a07]"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="font-semibold text-[#f0a35c]">
                              ${(menuItem.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-[#f5eddc] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Subtotal</span>
                    <span className="font-medium text-[#f5eddc]">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Tax</span>
                    <span className="font-medium text-[#f5eddc]">${(calculateTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Delivery</span>
                    <span className="font-medium text-[#f5eddc]">$2.99</span>
                  </div>
                  <div className="border-t border-[#2d1a11] pt-4 flex justify-between font-semibold text-lg text-[#f5eddc]">
                    <span>Total</span>
                    <span>${(calculateTotal() * 1.08 + 2.99).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push('/#menu')}
                  className="w-full mt-3 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
