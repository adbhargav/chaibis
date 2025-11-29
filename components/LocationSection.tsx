"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#f5eddc] mb-4">
                    Visit Us
                </h2>
                <p className="text-[#f5eddc]/80 max-w-2xl mx-auto">
                    Come experience the authentic taste of Hyderabad in the heart of Cumming.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Map Placeholder / Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg"
                >
                    {/* Replace this iframe with the actual Google Maps embed URL for the specific address if available, 
              or keep this placeholder/generic map view */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.246206976664!2d-84.1441869242968!3d34.14006797312411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5990b7638888d%3A0x868e9102437f810!2s911%20Market%20Pl%20Blvd%20Suite%20L%2C%20Cumming%2C%20GA%2030041!5e0!3m2!1sen!2sus!4v1709667000000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    {/* Address Card */}
                    <div className="bg-[#120a07] p-6 rounded-2xl border border-[#2d1a11] hover:border-[#c87534]/50 transition-colors duration-300">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#1a100b] rounded-xl text-[#f0a35c]">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#f5eddc] mb-2">Location</h3>
                                <p className="text-[#f5eddc]/80 leading-relaxed">
                                    911 Market Pl Blvd, Suite L<br />
                                    Cumming, GA 30041
                                </p>
                                <Button
                                    variant="link"
                                    className="mt-2 p-0 h-auto text-[#f0a35c] hover:text-[#f5b97a]"
                                    asChild
                                >
                                    <a
                                        href="https://maps.google.com/?q=911+Market+Pl+Blvd,+Suite+L,+Cumming,+GA+30041"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        Get Directions <Navigation className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Hours Card */}
                    <div className="bg-[#120a07] p-6 rounded-2xl border border-[#2d1a11] hover:border-[#c87534]/50 transition-colors duration-300">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#1a100b] rounded-xl text-[#f0a35c]">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#f5eddc] mb-2">Opening Hours</h3>
                                <ul className="space-y-2 text-[#f5eddc]/80">
                                    <li className="flex justify-between w-full min-w-[200px]">
                                        <span>Mon - Thu</span>
                                        <span>11:00 AM - 10:00 PM</span>
                                    </li>
                                    <li className="flex justify-between w-full min-w-[200px]">
                                        <span>Fri - Sat</span>
                                        <span>11:00 AM - 11:00 PM</span>
                                    </li>
                                    <li className="flex justify-between w-full min-w-[200px]">
                                        <span>Sunday</span>
                                        <span>11:00 AM - 10:00 PM</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="bg-[#120a07] p-6 rounded-2xl border border-[#2d1a11] hover:border-[#c87534]/50 transition-colors duration-300">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#1a100b] rounded-xl text-[#f0a35c]">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#f5eddc] mb-2">Contact</h3>
                                <p className="text-[#f5eddc]/80 mb-2">
                                    (770) 555-0123
                                </p>
                                <p className="text-[#f5eddc]/60 text-sm">
                                    Call us for reservations or takeout orders.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LocationSection;
