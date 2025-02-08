"use client";

import { Button } from "./ui/button";

const Hero = () => {
    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0 bg-black/60 z-10"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1666919643134-d97687c1826c)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // backgroundBlend: 'overlay'
                }}
            />

            <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Luxury Limousine Services
                </h1>
                <p className="text-xl md:text-2xl text-primary mb-8 max-w-2xl">
                    Experience the finest in ground transportation with our premium fleet and professional chauffeurs
                </p>
                <Button
                    size="lg"
                    className="bg-primary text-black hover:bg-primary/90 text-lg px-8"
                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default Hero;