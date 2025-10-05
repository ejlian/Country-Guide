"use client";

import { useState } from "react";
import { Info, Shield, Bus, Lightbulb, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TIPS = [
  {
    country: "Italy",
    sections: [
      {
        title: "Cultural Etiquette",
        icon: Info,
        tips: [
          "Greet with a handshake or kiss on both cheeks",
          "Dress modestly when visiting churches",
          "Tipping is appreciated but not mandatory (5-10%)",
          "Avoid discussing politics or religion with strangers",
        ],
      },
      {
        title: "Safety and Health",
        icon: Shield,
        tips: [
          "Emergency number: 112",
          "Pharmacies (Farmacia) are widely available",
          "Tap water is safe to drink in most cities",
          "Watch out for pickpockets in crowded areas",
        ],
      },
      {
        title: "Transportation",
        icon: Bus,
        tips: [
          "Trains are efficient for intercity travel",
          "Purchase train tickets in advance for better prices",
          "Validate your ticket before boarding",
          "Taxis are metered; use official taxi stands",
        ],
      },
      {
        title: "General Advice",
        icon: Lightbulb,
        tips: [
          "Learn basic Italian phrases",
          "Most businesses close for lunch (1-4 PM)",
          "Book popular attractions in advance",
          "Carry small bills for small purchases",
        ],
      },
    ],
  },
  {
    country: "Japan",
    sections: [
      {
        title: "Cultural Etiquette",
        icon: Info,
        tips: [
          "Bow when greeting someone",
          "Remove shoes when entering homes",
          "Don't tip - it's considered rude",
          "Use both hands when giving/receiving items",
        ],
      },
      {
        title: "Safety and Health",
        icon: Shield,
        tips: [
          "Emergency number: 110 (police), 119 (ambulance)",
          "Healthcare is excellent but can be expensive",
          "Carry health insurance documentation",
          "Japan is one of the safest countries to visit",
        ],
      },
      {
        title: "Transportation",
        icon: Bus,
        tips: [
          "Get a JR Pass for unlimited train travel",
          "Trains are punctual - don't be late",
          "Tokyo metro can be confusing - use Google Maps",
          "Taxis are expensive; use public transport",
        ],
      },
      {
        title: "General Advice",
        icon: Lightbulb,
        tips: [
          "Cash is still king - carry yen",
          "Free WiFi is limited - rent a pocket WiFi",
          "Learn basic Japanese phrases",
          "Restaurants may not have English menus",
        ],
      },
    ],
  },
  {
    country: "France",
    sections: [
      {
        title: "Cultural Etiquette",
        icon: Info,
        tips: [
          "Greet with 'Bonjour' before asking questions",
          "Kiss on both cheeks when meeting friends",
          "Use formal 'vous' unless invited to use 'tu'",
          "Dress well - appearance matters",
        ],
      },
      {
        title: "Safety and Health",
        icon: Shield,
        tips: [
          "Emergency number: 112",
          "European Health Insurance Card accepted",
          "Pharmacies marked with green cross",
          "Be aware of pickpockets near tourist sites",
        ],
      },
      {
        title: "Transportation",
        icon: Bus,
        tips: [
          "Metro is the best way to get around Paris",
          "TGV trains connect major cities",
          "Buy Navigo pass for unlimited weekly travel",
          "Uber and taxis are widely available",
        ],
      },
      {
        title: "General Advice",
        icon: Lightbulb,
        tips: [
          "Many shops close on Sundays",
          "Lunch is typically 12-2 PM, dinner 7-10 PM",
          "Book popular restaurants in advance",
          "Learn basic French phrases - it's appreciated",
        ],
      },
    ],
  },
];

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Italy");

  const filteredTips = TIPS.find((tip) => tip.country === selectedCountry);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Travel Tips</h1>
        <p className="mt-2 text-muted-foreground">Essential information for your journey</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a country..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {TIPS.map((tip) => (
            <Button
              key={tip.country}
              variant={selectedCountry === tip.country ? "default" : "outline"}
              onClick={() => setSelectedCountry(tip.country)}
            >
              {tip.country}
            </Button>
          ))}
        </div>
      </div>

      {/* Tips Content */}
      {filteredTips && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTips.sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.tips.map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>Helpful links and information for travelers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold">Embassy Information</h3>
              <p className="text-sm text-muted-foreground">
                Find your country's embassy contact information and emergency services.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Travel Insurance</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive travel insurance coverage for your trip.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Language Guide</h3>
              <p className="text-sm text-muted-foreground">
                Learn essential phrases and common expressions for your destination.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
