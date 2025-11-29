'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, List, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { menuItems } from '@/app/data/menuItems';

const categoryTabs = [
  'Appetizers',
  'Burgers',
  'Rolls',
  'Frankies',
  'Biriyani',
  'Curries',
  'Snacks',
  'Mandi',
  'Indo-Chinese',
  'Breakfast',
  'Desserts',
  'Shakes',
  'Drinks',
];

const collectionOptions = [
  { label: 'Full Menu', value: 'full', hours: '10:30 AM – 10:00 PM' },
  { label: 'Main Course', value: 'main', hours: '12:00 PM – 10:00 PM' },
  { label: 'Quick Bites', value: 'quick', hours: '10:30 AM – 11:00 PM' },
];

// Map each collection to the categories it should show
const collectionCategoryMap: Record<string, string[]> = {
  full: categoryTabs,
  main: [
    'Biriyani',
    'Curries',
    'Mandi',
    'Indo-Chinese',
  ],
  quick: [
    'Appetizers',
    'Burgers',
    'Rolls',
    'Frankies',
    'Snacks',
    'Breakfast',
  ],
};

interface MenuProps {
  onCartUpdate?: () => void;
}

const Menu = ({ onCartUpdate }: MenuProps) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(categoryTabs[0]);
  const [activeCollection, setActiveCollection] = useState('full');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [isClient, setIsClient] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const collectionDropdownRef = useRef<HTMLDivElement>(null);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 8);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };

    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collectionDropdownRef.current &&
        !collectionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCollectionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When collection changes, make sure activeCategory stays within that collection
  useEffect(() => {
    const allowedCategories = collectionCategoryMap[activeCollection];
    if (!allowedCategories || allowedCategories.length === 0) return;

    setActiveCategory((prev) =>
      allowedCategories.includes(prev) ? prev : allowedCategories[0]
    );
  }, [activeCollection]);

  const scrollCategories = (direction: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const offset = direction === 'left' ? -260 : 260;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const addToCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { id: itemId, quantity: 1 }];

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: updatedCart } }));
      onCartUpdate?.();
      return updatedCart;
    });
  };

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const searchActive = normalizedSearch.length > 0;
  const allowedCategoriesForCollection =
    collectionCategoryMap[activeCollection] ?? categoryTabs;

  const filteredItems = menuItems.filter((item) => {
    const inCollection = allowedCategoriesForCollection.includes(item.category);
    const matchesSearch =
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch);

    if (searchActive) {
      return matchesSearch && inCollection;
    }
    return item.category === activeCategory && inCollection;
  });

  const currentCollection =
    collectionOptions.find((option) => option.value === activeCollection) ?? collectionOptions[0];

  return (
    <section id="menu" className="py-12 sm:py-16 bg-transparent text-[#f5eddc]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5eddc]">Our Menu</h2>
          <p className="text-[#f5eddc]/80 max-w-2xl mx-auto mt-2">Explore our authentic Indian dishes and beverages</p>
        </div>
        <div className="mb-8 sm:mb-12 rounded-3xl border border-[#2d1a11] bg-[#0b0503] text-[#f5eddc] p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4" ref={collectionDropdownRef}>
                <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#2d1a11] bg-[#120a07] text-[#f5eddc] flex items-center justify-center shadow-md">
                  <List className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="relative">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#f5eddc]/50">Collection</div>
                  <button
                    type="button"
                    onClick={() => setIsCollectionOpen((prev) => !prev)}
                    className="mt-1 flex items-center gap-2 text-base sm:text-lg font-semibold text-[#f5eddc] focus:outline-none"
                  >
                    {currentCollection.label}
                    <ChevronDown
                      className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isCollectionOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isCollectionOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 sm:w-48 rounded-2xl border border-[#2d1a11] bg-[#120a07] text-sm shadow-xl z-10 overflow-hidden">
                      {collectionOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setActiveCollection(option.value);
                            setIsCollectionOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 sm:px-4 sm:py-3 hover:bg-[#1c0a05] ${
                            option.value === activeCollection ? 'text-[#c87534]' : 'text-[#f5eddc]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="text-[10px] sm:text-xs text-[#f5eddc]/60 mt-1">{currentCollection.hours}</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f5eddc]/50" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search in ${currentCollection.label}...`}
                    className="w-full rounded-full border border-[#2d1a11] bg-[#050302] py-2.5 sm:py-3 pl-11 pr-4 text-sm text-[#f5eddc] placeholder:text-[#f5eddc]/40 focus:border-[#c87534] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollCategories('left')}
                    disabled={!canScrollLeft}
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-[#2d1a11] flex items-center justify-center transition ${
                      canScrollLeft ? 'bg-[#120a07] hover:bg-[#1c0a05]' : 'bg-[#120a07]/40 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-[#f5eddc]" />
                  </button>
                  <button
                    onClick={() => scrollCategories('right')}
                    disabled={!canScrollRight}
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-[#2d1a11] flex items-center justify-center transition ${
                      canScrollRight
                        ? 'bg-[#120a07] hover:bg-[#1c0a05]'
                        : 'bg-[#120a07]/40 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#f5eddc]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[#2d1a11] bg-[#120a07]">
                <span className="h-0.5 w-6 bg-[#f5eddc]" />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="mb-3 flex justify-between text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-[#f5eddc]/60">
                  <span>{searchActive ? 'Search results' : 'Browse categories'}</span>
                  {!searchActive && <span className="hidden xs:inline-block">{activeCategory}</span>}
                  {searchActive && <span>{filteredItems.length} items</span>}
                </div>
                <div
                  ref={categoryScrollRef}
                  className="overflow-x-auto pb-2 sm:pb-3 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
                >
                  <div className="flex flex-nowrap gap-2 sm:gap-4 md:gap-6 w-max">
                    {categoryTabs.map((category) => {
                      const isActive = category === activeCategory;
                      return (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`relative pb-2 sm:pb-3 px-1.5 sm:px-2 md:px-3 text-[8px] xs:text-[9px] sm:text-xs font-semibold tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.25em] uppercase whitespace-nowrap transition ${
                            isActive ? 'text-[#f5eddc]' : 'text-[#f5eddc]/40'
                          }`}
                        >
                          {category}
                          <span
                            className={`absolute left-0 right-0 -bottom-0.5 h-0.5 transition ${
                              isActive ? 'bg-[#c87534]' : 'bg-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#2d1a11]" />
              </div>
            </div>
          </div>
        </div>

        {searchActive && (
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-[#2d1a11] bg-[#120a07] px-4 py-3 sm:px-5 sm:py-4 text-sm text-[#f5eddc]/80">
            <span>
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} for “{searchTerm}”
            </span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#c87534] underline-offset-4 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#120a07] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#2d1a11] hover:border-[#c87534]/50 flex flex-col"
              >
                <div className="relative h-40 sm:h-48 md:h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={isClient && item.id <= 3}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-white/80 mt-1">{item.description}</p>
                      </div>
                      <span className="text-amber-200 text-base sm:text-lg font-semibold">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <Button
                    onClick={() => addToCart(item.id)}
                    className="w-full font-medium py-2.5 sm:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-auto text-sm sm:text-base"
                  >
                    <Plus className="h-4 w-4" />
                    Add to Basket
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-[#120a07] rounded-xl border border-[#2d1a11]">
            <p className="text-[#f5eddc]/70 mb-4 px-4">
              {searchActive
                ? <>No items match “{searchTerm}”.</>
                : <>No items available in {activeCategory} right now.</>}
            </p>
            <Button
              onClick={() => (searchActive ? setSearchTerm('') : setActiveCategory(categoryTabs[0]))}
              variant="outline"
              className="border-[#c87534] text-[#f5eddc] text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            >
              {searchActive ? 'Clear Search' : 'Back to First Category'}
            </Button>
          </div>
        )}

        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-[#120a07] p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-[#2d1a11] max-w-3xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f5eddc] mb-2 sm:mb-3">Need a full cart?</h3>
            <p className="text-[#f5eddc]/70 mb-4 sm:mb-5 md:mb-6 max-w-md mx-auto text-sm">
              Checkout to reserve your groceries or add more staples to your basket.
            </p>
            <Button
              onClick={() => router.push('/cart')}
              className="font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">View Cart & Checkout</span>
              <span className="xs:hidden">View Cart</span>
              {getCartCount() > 0 && (
                <span className="ml-2 bg-[#050302]/30 text-[#f5eddc] text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full">
                  {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
                </span>
              )}
            </Button>
            <p className="mt-3 text-xs text-[#f5eddc]/50">Delivery windows and prices refresh throughout the day.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

