"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const REVIEWS = [
  {
    id: "1",
    author: "Sophia Clark",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    country: "Italy",
    date: "2 weeks ago",
    rating: 5,
    text: "Italy was an incredible experience! The food, the culture, and the people were all amazing. I highly recommend visiting Rome and Florence.",
    likes: 15,
    comments: 2,
  },
  {
    id: "2",
    author: "Ethan Bennett",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    country: "Italy",
    date: "1 month ago",
    rating: 4,
    text: "I enjoyed my trip to Italy, especially the historical sites. However, some areas were quite crowded, which made it a bit challenging to navigate.",
    likes: 8,
    comments: 3,
  },
  {
    id: "3",
    author: "Olivia Carter",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    country: "Italy",
    date: "2 months ago",
    rating: 3,
    text: "Italy has its charm, but I found it to be a bit overrated. The prices were high, and the service was inconsistent. I expected more from such a popular destination.",
    likes: 5,
    comments: 4,
  },
];

export default function CommunityPage() {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Review and Rate: Italy</h1>
        <p className="mt-2 text-muted-foreground">Share your experience and help other travelers</p>
      </div>

      {/* Overall Rating */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="text-center">
              <div className="text-6xl font-bold">4.5</div>
              <div className="mt-2 flex justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-6 w-6 ${i < 4 ? "fill-primary" : i === 4 ? "fill-primary opacity-50" : "fill-muted"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Based on 125 reviews</p>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-4 text-sm">{star}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${star === 5 ? 60 : star === 4 ? 30 : star === 3 ? 15 : star === 2 ? 10 : 5}%` }}
                    />
                  </div>
                  <span className="w-10 text-sm text-muted-foreground">
                    {star === 5 ? "60%" : star === 4 ? "30%" : star === 3 ? "15%" : star === 2 ? "10%" : "5%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write a Review */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Write a Review</h2>
          <div className="space-y-4">
            <div>
              <Label>Your Rating</Label>
              <div className="mt-2 flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className={`h-8 w-8 ${i < rating ? "fill-primary" : "fill-muted"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience in Italy..."
                className="mt-2 min-h-[120px]"
              />
            </div>
            <Button>Submit Review</Button>
          </div>
        </CardContent>
      </Card>

      {/* All Reviews */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">All Reviews</h2>
        <div className="space-y-4">
          {REVIEWS.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-primary" : "fill-muted"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        {review.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <MessageSquare className="h-4 w-4" />
                        {review.comments}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
