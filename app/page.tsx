"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";

// ... (keep existing imports)

// ... (keep existing code until Page component)

export default function Page() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  // ... (keep existing state)

  // ... (keep existing code until Hero buttons)

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="py-5 sm:py-6 px-6 sm:px-8 text-base font-medium rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
                size="lg"
                onClick={() => router.push('#menu')}
              >
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  <Utensils className="h-5 w-5" />
                  Explore Our Menu
                </span>
              </Button>
              <Button
                variant="outline"
                className="py-5 sm:py-6 px-6 sm:px-8 text-base font-medium rounded-xl transition-all duration-300"
                size="lg"
                onClick={() => router.push('#order-options')}
              >
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone className="h-5 w-5" />
                  Order Now
                </span>
              </Button>
            </div>

            <div className="mt-6">
              <Button
                className="py-4 px-6 text-base font-medium rounded-xl shadow-lg bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a] transition-all duration-300 transform hover:scale-105"
                size="lg"
                onClick={() => router.push('#specials')}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  Today&apos;s Special
                </span>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#f5eddc]/80">
              {[
                { label: "Freshly brewed chai", color: "#f0a35c" },
                { label: "Charcoal-fired kebabs", color: "#d97a3a" },
                { label: "Vegetarian favourites", color: "#f5b97a" },
              ].map((chip) => (
                <div key={chip.label} className="flex items-center gap-2 bg-[#120a07]/80 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm border border-[#f5eddc]/10">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: chip.color }}></div>
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>
          </motion.div >
        </Container >

    {/* Scroll indicator - hidden on mobile */ }
    < div className = "absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block" >
      <div className="w-6 h-10 border-2 border-[#f5eddc]/40 rounded-full flex justify-center p-1">
        <div className="w-1 h-2 bg-[#f5eddc]/70 rounded-full animate-scroll"></div>
      </div>
        </div >

    <style jsx global>{`
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(10px); opacity: 0.5; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-scroll {
            animation: scroll 2s infinite;
          }
        `}</style>
      </Section >

    {/* MARQUEE - Hidden on mobile, visible on md screens and up */ }
    < div className = "hidden md:block relative overflow-hidden bg-[#120a07]" >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#120a07] via-transparent to-[#120a07] z-10" />
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] py-3 text-sm font-medium text-[#f5eddc]/80 md:animate-[marquee_30s_linear_infinite]">
          <span className="mx-4 md:mx-8">Irani Chai</span>
          <span className="mx-4 md:mx-8">Osmania Biscuits</span>
          <span className="mx-4 md:mx-8">Hyderabadi Biryani</span>
          <span className="mx-4 md:mx-8">Samosa & Cutlets</span>
          <span className="mx-4 md:mx-8">Bun Maska</span>
          <span className="mx-4 md:mx-8">Vada Pav</span>
          <span className="mx-4 md:mx-8">Chicken 65</span>
          <span className="mx-4 md:mx-8">Kulfi & Falooda</span>

          {/* Duplicate items for seamless loop - hidden on mobile */}
          <span className="hidden md:inline-block mx-4 md:mx-8">Irani Chai</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Osmania Biscuits</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Hyderabadi Biryani</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Samosa & Cutlets</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Bun Maska</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Vada Pav</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Chicken 65</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Kulfi & Falooda</span>
        </div>
      </div >

    {/* TODAY'S SPECIAL */ }
    < Section id = "specials" className = "bg-[#0b0503]" >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5eddc] mb-4">Today&apos;s Special</h2>
          <p className="text-[#f5eddc]/80 max-w-2xl mx-auto">
            Discover our chef&apos;s special creations for the day, crafted with the finest ingredients and authentic flavors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Special Item 1 */}
          <div className="bg-[#120a07] rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <Image
                src="/images/Hyderabadi Biryani.jpg"
                alt="Special Hyderabadi Biryani"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#f5eddc]">Hyderabadi Biryani</h3>
                <span className="text-amber-200 font-bold">$12.99</span>
              </div>
              <p className="text-[#f5eddc]/80 mb-4">Authentic dum biryani with tender meat and fragrant basmati rice.</p>
              <Button
                onClick={() => addToCart(15)}
                className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Special Item 2 */}
          <div className="bg-[#120a07] rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <Image
                src="/images/iran chaai.png"
                alt="Special Irani Chai"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#f5eddc]">Irani Chai</h3>
                <span className="text-amber-200 font-bold">$3.99</span>
              </div>
              <p className="text-[#f5eddc]/80 mb-4">Traditional strong tea with spices, served with Osmania biscuits.</p>
              <Button
                onClick={() => addToCart(4)}
                className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Special Item 3 */}
          <div className="bg-[#120a07] rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <Image
                src="/images/Chicken 65.jpg"
                alt="Special Chicken 65"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#f5eddc]">Chicken 65</h3>
                <span className="text-amber-200 font-bold">$9.99</span>
              </div>
              <p className="text-[#f5eddc]/80 mb-4">Spicy deep-fried chicken with authentic South Indian spices.</p>
              <Button
                onClick={() => addToCart(13)}
                className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
      </Section >

    {/* MENU SECTION */ }
    < Section id = "menu" className = "bg-[#0b0503]" >
      <Menu onCartUpdate={() => setCartCount(getCartCount())} />
      </Section >

    {/* GALLERY */ }
    < Section id = "our-story" className = "bg-[#120a07]" >
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Moments & Mood</h2>
          <p className="mt-3 text-[#f5eddc]/70">Swipe through the vibe — tag us <span className="font-semibold text-[#f0a35c]">@chaibisket_eats</span> on Instagram to get featured!</p>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {art.gallery.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl">
              <SafeImage
                src={src}
                alt={`Chai Bisket gallery ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline" className="border-[#f5eddc]/40">
            <a href="https://instagram.com/chaibisket_eats" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <Instagram className="mr-2 h-4 w-4" />Follow @chaibisket_eats
            </a>
          </Button>
        </div>
      </Container>
      </Section >

    {/* Floating Catering Button - Mobile Only */ }
    < div className = "fixed bottom-6 right-6 z-50 lg:hidden" >
      <a
        href="#contact"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#c87534] to-[#8a4b24] text-[#120a06] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Get a Catering Quote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </a>
      </div >


    {/* TESTIMONIALS */ }
    < Section id = "testimonials" className = "bg-[#0b0503]" >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5eddc] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#f5eddc]/80 max-w-2xl mx-auto">
            Do not just take our word for it &#8212; hear from our cherished customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial Card */}
          {[
            {
              name: "Priya Sharma",
              role: "Food Blogger",
              text: `"The Hyderabadi Biryani here is the closest I've found to my grandmother's recipe. Authentic flavors that transport you straight to the streets of Hyderabad."`,
            },
            {
              name: "Rahul Mehta",
              role: "Local Resident",
              text: `"Their Irani Chai paired with Osmania biscuits is my daily ritual. The perfect start to any day, reminding me of the chai stalls back home in Mumbai."`,
            },
            {
              name: "Anita Desai",
              role: "Catering Client",
              text: `"We hired Chai Bisket for our corporate event and they exceeded expectations. The live biryani station was a huge hit, and the service was impeccable!"`,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#120a07] rounded-2xl p-6 border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#c87534]/50"
            >
              {/* Name + Role */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-[#f5eddc]">{item.name}</h4>
                <p className="text-[#f0a35c] text-sm">{item.role}</p>
              </div>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#f0a35c]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-[#f5eddc]/80 italic">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
      </Section >


    {/* Floating Catering Button - Mobile Only */ }
    < div className = "fixed bottom-6 right-6 z-50 lg:hidden" >
      <a
        href="#contact"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#c87534] to-[#8a4b24] text-[#120a06] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Get a Catering Quote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </a>
      </div >

    {/* LOCATION SECTION */ }
    < Section id = "location" className = "bg-[#120a07]" >
      <LocationSection />
      </Section >

    {/* CONTACT / CATERING */ }
    < Section id = "contact" className = "bg-[#0b0503]" >
      <Container>
        <div id="order-options" className="scroll-mt-32" />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Contact & Catering</CardTitle>
            </CardHeader>
            <CardContent>

              <ContactForm />
            </CardContent>
          </Card>
          <div className="bg-gradient-to-br from-[#2b160d] to-[#5a2d1a] text-[#f5eddc] rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#f5eddc]/10 rounded-full" />
            <h3 className="text-2xl font-semibold">Hosting a Party?</h3>
            <p className="mt-3 text-[#f5eddc]/80">From chai counters to biryani bars — we cater birthdays, office events, and desi celebrations.</p>
            <ul className="mt-4 space-y-2 text-sm text-[#f5eddc]/90">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f5eddc]"></div> Customizable menus</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f5eddc]"></div> Bulk chai, biscuits & snacks</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f5eddc]"></div> On‑site live stations</li>
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-center text-[#120a06] bg-gradient-to-r from-[#f0a35c] to-[#c87534] hover:from-[#f5b97a] hover:to-[#d8843d] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
            >
              Get a Catering Quote
            </a>
          </div>
        </div>
      </Container>
      </Section >

    {/* FOOTER */ }
    < footer className = "bg-[#120a07] text-[#f5eddc] border-t border-[#2d1a11]" >
        <Container className="py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-semibold">Chai Bisket LLC</div>
            <div className="text-[#f5eddc]/70 text-sm">an Indian eatery</div>
            <p className="mt-3 text-[#f5eddc]/70 text-sm max-w-sm">
              Light, emotional, and full of passion & food — welcome to your new chai adda in Cumming.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3">Quick Links</div>
            <ul className="space-y-2 text-[#f5eddc]/70 text-sm">
              <li><a href="#menu" className="hover:text-[#ffd9a0]">Menu</a></li>
              <li><a href="#story" className="hover:text-[#ffd9a0]">Our Story</a></li>
              <li><a href="#location" className="hover:text-[#ffd9a0]">Location & Hours</a></li>
              <li><a href="#contact" className="hover:text-[#ffd9a0]">Catering</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Find Us</div>
            <div className="text-sm text-[#f5eddc]/70 flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> 911 Market Pl Blvd, Suite L, Cumming, GA 30041</div>
            <div className="text-sm text-[#f5eddc]/70 mt-2">Phone: (770) 555‑0123</div>
            <a href="https://instagram.com/chaibisket_eats" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-[#f5eddc] hover:text-[#ffd9a0]">
              <Instagram className="h-4 w-4" /> Follow on Instagram
            </a>
          </div>
        </Container>
        <div className="border-t border-[#2d1a11]">
          <Container className="py-4 text-xs text-[#f5eddc]/60 flex flex-wrap items-center justify-between">
            <span>© {new Date().getFullYear()} Chai Bisket LLC. All rights reserved.</span>
            <span>Made with ❤ chai & biscuits.</span>
          </Container>
        </div>
      </footer >

    {/* KEYFRAMES */ }
    < style > {`
        @keyframes marquee { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        }
      `}</style >
    </div >
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
