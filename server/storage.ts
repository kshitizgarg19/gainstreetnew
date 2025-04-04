import { 
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  marketIndices, type MarketIndex, type InsertMarketIndex,
  stocks, type Stock, type InsertStock,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Market index methods
  getMarketIndices(): Promise<MarketIndex[]>;
  createMarketIndex(index: InsertMarketIndex): Promise<MarketIndex>;
  updateMarketIndex(id: number, index: Partial<InsertMarketIndex>): Promise<MarketIndex | undefined>;
  
  // Stock methods
  getStocks(): Promise<Stock[]>;
  createStock(stock: InsertStock): Promise<Stock>;
  updateStock(id: number, stock: Partial<InsertStock>): Promise<Stock | undefined>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

import { db } from './db';
import { eq, desc } from 'drizzle-orm';

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  
  // Market index methods
  async getMarketIndices(): Promise<MarketIndex[]> {
    return await db.select().from(marketIndices);
  }
  
  async createMarketIndex(index: InsertMarketIndex): Promise<MarketIndex> {
    const [newIndex] = await db.insert(marketIndices).values(index).returning();
    return newIndex;
  }
  
  async updateMarketIndex(id: number, index: Partial<InsertMarketIndex>): Promise<MarketIndex | undefined> {
    const [updatedIndex] = await db
      .update(marketIndices)
      .set(index)
      .where(eq(marketIndices.id, id))
      .returning();
    return updatedIndex;
  }
  
  // Stock methods
  async getStocks(): Promise<Stock[]> {
    return await db.select().from(stocks);
  }
  
  async createStock(stock: InsertStock): Promise<Stock> {
    const [newStock] = await db.insert(stocks).values(stock).returning();
    return newStock;
  }
  
  async updateStock(id: number, stock: Partial<InsertStock>): Promise<Stock | undefined> {
    const [updatedStock] = await db
      .update(stocks)
      .set(stock)
      .where(eq(stocks.id, id))
      .returning();
    return updatedStock;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
}

export const storage = new DatabaseStorage();
