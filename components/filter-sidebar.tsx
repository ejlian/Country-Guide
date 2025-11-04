"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  continents: string[];
  activities: string[];
}

const CONTINENTS = [
  { id: "africa", label: "Africa" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "north-america", label: "North America" },
  { id: "south-america", label: "South America" },
  { id: "oceania", label: "Oceania" },
];

const ACTIVITIES = [
  { id: "adventure", label: "Adventure" },
  { id: "beaches", label: "Beaches" },
  { id: "culture-history", label: "Culture & History" },
  { id: "food-wine", label: "Food & Wine" },
  { id: "wildlife", label: "Wildlife" },
  { id: "shopping", label: "Shopping" },
  { id: "nightlife", label: "Nightlife" },
];

export function FilterSidebar({ isOpen, onClose, onApplyFilters }: FilterSidebarProps) {
  const [continents, setContinents] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);

  const handleContinentChange = (id: string, checked: boolean) => {
    if (checked) {
      setContinents([...continents, id]);
    } else {
      setContinents(continents.filter((c) => c !== id));
    }
  };

  const handleActivityChange = (id: string, checked: boolean) => {
    if (checked) {
      setActivities([...activities, id]);
    } else {
      setActivities(activities.filter((a) => a !== id));
    }
  };

  const handleApply = () => {
    onApplyFilters({ continents, activities });
    onClose();
  };

  const handleClear = () => {
    setContinents([]);
    setActivities([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 bg-card shadow-xl lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Continent Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold">Continent</h3>
              <div className="space-y-3">
                {CONTINENTS.map((continent) => (
                  <div key={continent.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={continent.id}
                      checked={continents.includes(continent.id)}
                      onCheckedChange={(checked) =>
                        handleContinentChange(continent.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={continent.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {continent.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Activity Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold">Popular Activities</h3>
              <div className="space-y-3">
                {ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={activity.id}
                      checked={activities.includes(activity.id)}
                      onCheckedChange={(checked) =>
                        handleActivityChange(activity.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={activity.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {activity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-6 space-y-3">
            <Button
              className="w-full"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClear}
            >
              Clear All
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
