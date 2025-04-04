import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix with /api
  const apiRouter = express.Router();
  
  // Get all blog posts
  apiRouter.get("/blog-posts", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });
  
  // Get a blog post by slug
  apiRouter.get("/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });
  
  // Get market indices
  apiRouter.get("/market-indices", async (_req, res) => {
    try {
      const indices = await storage.getMarketIndices();
      res.json(indices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching market indices" });
    }
  });
  
  // Get stocks
  apiRouter.get("/stocks", async (_req, res) => {
    try {
      const stocks = await storage.getStocks();
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stocks" });
    }
  });
  
  // Submit contact form
  apiRouter.post("/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      // Save contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        message: "Your message has been sent successfully",
        id: contactMessage.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error submitting contact form" });
    }
  });
  
  // Use API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
