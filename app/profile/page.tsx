"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SAVED_COUNTRIES = [
  { code: "FR", name: "Paris", country: "France" },
  { code: "JP", name: "Tokyo", country: "Japan" },
  { code: "IT", name: "Rome", country: "Italy" },
  { code: "ES", name: "Barcelona", country: "Spain" },
  { code: "AU", name: "Sydney", country: "Australia" },
  { code: "BR", name: "Rio de Janeiro", country: "Brazil" },
];

const USER_REVIEWS = [
  {
    id: "1",
    country: "Paris",
    date: "May 2023",
    rating: 5,
    text: "Paris is a city that truly lives up to its reputation as the city of love and lights. From the iconic Eiffel Tower to the charming streets of Montmartre, every corner of Paris exudes romance and history.",
  },
  {
    id: "2",
    country: "Tokyo",
    date: "June 2023",
    rating: 4,
    text: "Tokyo is an incredible blend of tradition and modernity. The city is impeccably clean and safe, with a fascinating culture that's both ancient and cutting-edge.",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("saved");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:bg-primary/90">
                <Edit2 className="h-3 w-3" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">Sophia Clark</h1>
              <p className="text-muted-foreground">Joined in 2021</p>
              <div className="mt-4 flex flex-wrap justify-center gap-6 md:justify-start">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">following</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Follow
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-xl font-semibold">About</h2>
              <p className="text-muted-foreground">
                Travel enthusiast exploring the world one country at a time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Countries Tab */}
        <TabsContent value="saved" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Saved Countries</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAVED_COUNTRIES.map((place) => (
              <Link key={place.code} href={`/country/${place.code.toLowerCase()}`}>
                <Card className="group cursor-pointer transition-all hover:shadow-lg">
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{place.code}</Badge>
                    <h3 className="text-lg font-semibold group-hover:text-primary">{place.name}</h3>
                    <p className="text-sm text-muted-foreground">{place.country}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          {USER_REVIEWS.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{review.country}</h3>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "fill-primary" : "fill-muted"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
