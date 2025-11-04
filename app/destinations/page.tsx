"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Clock, DollarSign, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Destination {
  code: string;
  name: string;
  region: string;
  image: string;
  description: string;
  highlights: string[];
  bestTime: string;
  budget: "Low" | "Medium" | "High";
  temperature: string;
  popular: boolean;
}

const DESTINATIONS: Destination[] = [
  {
    code: "IT",
    name: "Italy",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    description: "Experience la dolce vita with world-class art, cuisine, and ancient history",
    highlights: ["Colosseum", "Venice Canals", "Tuscany", "Amalfi Coast"],
    bestTime: "Apr-Oct",
    budget: "Medium",
    temperature: "25°C",
    popular: true,
  },
  {
    code: "JP",
    name: "Japan",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop",
    description: "Discover ancient temples, modern cities, and unique cultural experiences",
    highlights: ["Mount Fuji", "Tokyo", "Kyoto Temples", "Cherry Blossoms"],
    bestTime: "Mar-May",
    budget: "High",
    temperature: "18°C",
    popular: true,
  },
  {
    code: "FR",
    name: "France",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    description: "From Paris to Provence, indulge in art, fashion, and exquisite cuisine",
    highlights: ["Eiffel Tower", "Louvre", "French Riviera", "Mont Saint-Michel"],
    bestTime: "Apr-Oct",
    budget: "High",
    temperature: "22°C",
    popular: true,
  },
  {
    code: "ES",
    name: "Spain",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&h=600&fit=crop",
    description: "Vibrant culture, stunning architecture, and Mediterranean beaches await",
    highlights: ["Sagrada Familia", "Alhambra", "Ibiza", "Camino de Santiago"],
    bestTime: "May-Oct",
    budget: "Medium",
    temperature: "28°C",
    popular: true,
  },
  {
    code: "GR",
    name: "Greece",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    description: "Ancient ruins, white-washed islands, and crystal-clear Mediterranean waters",
    highlights: ["Santorini", "Acropolis", "Mykonos", "Meteora"],
    bestTime: "Apr-Oct",
    budget: "Medium",
    temperature: "26°C",
    popular: true,
  },
  {
    code: "TH",
    name: "Thailand",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
    description: "Tropical paradise with temples, beaches, and incredible street food",
    highlights: ["Bangkok", "Phi Phi Islands", "Chiang Mai", "Phuket"],
    bestTime: "Nov-Mar",
    budget: "Low",
    temperature: "32°C",
    popular: true,
  },
  {
    code: "US",
    name: "United States",
    region: "Americas",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop",
    description: "Diverse landscapes from coast to coast, vibrant cities, and natural wonders",
    highlights: ["Grand Canyon", "NYC", "Yellowstone", "Golden Gate Bridge"],
    bestTime: "May-Sep",
    budget: "High",
    temperature: "24°C",
    popular: true,
  },
  {
    code: "AU",
    name: "Australia",
    region: "Oceania",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop",
    description: "Unique wildlife, stunning beaches, and the iconic Outback",
    highlights: ["Sydney Opera House", "Great Barrier Reef", "Uluru", "Melbourne"],
    bestTime: "Sep-Mar",
    budget: "High",
    temperature: "27°C",
    popular: true,
  },
];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || dest.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case "Low": return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
      case "Medium": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400";
      case "High": return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
      default: return "";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Popular Destinations</h1>
        <p className="mt-2 text-muted-foreground">
          Discover your next adventure from our curated collection of destinations
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations..."
            className="pl-9"
          />
        </div>
        <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
          <TabsList>
            <TabsTrigger value="all">All Regions</TabsTrigger>
            <TabsTrigger value="Europe">Europe</TabsTrigger>
            <TabsTrigger value="Asia">Asia</TabsTrigger>
            <TabsTrigger value="Americas">Americas</TabsTrigger>
            <TabsTrigger value="Oceania">Oceania</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? "s" : ""} found
        </p>
        {selectedRegion !== "all" && (
          <Button variant="ghost" size="sm" onClick={() => setSelectedRegion("all")}>
            Clear filters
          </Button>
        )}
      </div>

      {/* Destinations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations.map((destination) => (
          <Link key={destination.code} href={`/country/${destination.code}`}>
            <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                {destination.popular && (
                  <Badge className="absolute right-3 top-3">Popular</Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-3 left-3 text-2xl font-bold text-white">
                  {destination.name}
                </h2>
              </div>
              <CardContent className="space-y-4 p-4">
                <p className="text-sm text-muted-foreground">{destination.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.slice(0, 3).map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Best Time</div>
                      <div className="font-medium">{destination.bestTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Avg Temp</div>
                      <div className="font-medium">{destination.temperature}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                      <Badge variant="outline" className={`${getBudgetColor(destination.budget)} text-xs`}>
                        {destination.budget}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Region</div>
                      <div className="font-medium">{destination.region}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
