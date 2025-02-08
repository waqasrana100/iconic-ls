"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Car, Users, GlassWater, Map } from "lucide-react";

const services = [
    {
        title: "Corporate Transportation",
        description: "Professional and reliable service for business executives",
        icon: Car
    },
    {
        title: "Party Bus Rentals",
        description: "Perfect for special events and group celebrations",
        icon: Users
    },
    {
        title: "Special Events",
        description: "Make your special day even more memorable",
        icon: GlassWater
    },
    {
        title: "City Tours",
        description: "Explore the city in comfort and style",
        icon: Map
    }
];

const Services = () => {
    return (
        <div className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                                    <service.icon className="w-6 h-6 text-black" />
                                </div>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{service.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;