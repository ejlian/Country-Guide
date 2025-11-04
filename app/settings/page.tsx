"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
];

export default function SettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your preferences and account settings</p>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Language Preferences</CardTitle>
              <CardDescription>Choose your preferred language for the interface</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <div className="space-y-3">
              {LANGUAGES.map((language) => (
                <div
                  key={language.code}
                  className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <RadioGroupItem value={language.code} id={language.code} />
                  <Label
                    htmlFor={language.code}
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                    </div>
                    {selectedLanguage === language.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={handleSave}>
              {saved ? "Changes Saved!" : "Save Changes"}
            </Button>
            {saved && (
              <span className="text-sm text-muted-foreground">
                Language preference updated successfully
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Other Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Other Settings</CardTitle>
          <CardDescription>Additional preferences and options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="font-medium">Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive updates about saved countries and trips
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="font-medium">Privacy</div>
                <div className="text-sm text-muted-foreground">
                  Control who can see your profile and reviews
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <div className="font-medium">Account</div>
                <div className="text-sm text-muted-foreground">
                  Update your email, password, and account information
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
