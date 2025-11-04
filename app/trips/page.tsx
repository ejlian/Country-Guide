"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Destination {
  id: string;
  days: string;
  location: string;
  description: string;
}

interface Activity {
  id: string;
  location: string;
  details: string;
}

export default function TripsPage() {
  const [tripName, setTripName] = useState("Trip to Italy");
  const [country, setCountry] = useState("Italy");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: "1", days: "Day 1-3", location: "Rome", description: "The Eternal City" },
    { id: "2", days: "Day 4-6", location: "Florence", description: "Heart of the Renaissance" },
    { id: "3", days: "Day 7-9", location: "Venice", description: "City of Canals" },
  ]);
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", location: "Rome", details: "Colosseum, Roman Forum, Pantheon" },
  ]);
  const [notes, setNotes] = useState("");

  const handleAddDestination = () => {
    const newDest: Destination = {
      id: Date.now().toString(),
      days: `Day ${destinations.length * 3 + 1}-${destinations.length * 3 + 3}`,
      location: "New Destination",
      description: "Add description",
    };
    setDestinations([...destinations, newDest]);
  };

  const handleRemoveDestination = (id: string) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  const handleAddActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      location: "Location",
      details: "Activity details",
    };
    setActivities([...activities, newActivity]);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Plan Your Trip
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{tripName}</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left Sidebar - Trip Setup */}
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan Your Trip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Italy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button className="w-full">Create Trip</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Destinations Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Destinations</CardTitle>
              <Button variant="outline" size="sm" onClick={handleAddDestination}>
                Add Destination
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="flex items-start justify-between rounded-lg border bg-muted/30 p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {dest.days}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{dest.location}</h3>
                    <p className="text-sm text-muted-foreground">{dest.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveDestination(dest.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activities Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activities</CardTitle>
              <Button variant="outline" size="sm" onClick={handleAddActivity}>
                Add Activity
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between rounded-lg border bg-muted/30 p-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-semibold">{activity.location}</h3>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your travel notes here..."
                className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </CardContent>
          </Card>

          {/* Share Section */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Itinerary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Share via Email</Label>
                <div className="flex gap-2">
                  <Input placeholder="friend@example.com" />
                  <Button>Send</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Share on Social Media</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Instagram
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Generate Sharable Link</Label>
                <div className="flex gap-2">
                  <Input
                    value="https://globetrotter.app/trip/abCJdEfG"
                    readOnly
                    className="bg-muted"
                  />
                  <Button>Copy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
