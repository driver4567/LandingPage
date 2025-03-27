import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const subscriberData = insertNewsletterSubscriberSchema.parse(req.body);
      
      // Check if the email is already subscribed
      const existingSubscriber = await storage.getSubscriberByEmail(subscriberData.email);
      if (existingSubscriber) {
        return res.status(409).json({ message: "This email is already subscribed" });
      }
      
      // Add current timestamp
      const subscriber = await storage.createSubscriber({
        ...subscriberData,
        subscribed_at: new Date().toISOString()
      });
      
      return res.status(201).json({
        message: "Successfully subscribed to the newsletter",
        subscriber
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid subscriber data", 
          errors: error.format() 
        });
      }
      console.error("Newsletter subscription error:", error);
      return res.status(500).json({ message: "Failed to subscribe to the newsletter" });
    }
  });

  // Instagram feed endpoint - in a real app this would connect to Instagram API
  app.get("/api/instagram/feed", (_req, res) => {
    // Respond with a message to explain that this would be implemented with a real Instagram API
    return res.status(200).json({
      message: "This endpoint would connect to Instagram API in a production environment",
      feed: [
        { id: "1", imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8", likes: 248, comments: 42 },
        { id: "2", imageUrl: "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d", likes: 315, comments: 53 },
        { id: "3", imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a", likes: 189, comments: 29 },
        { id: "4", imageUrl: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", likes: 276, comments: 48 }
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
