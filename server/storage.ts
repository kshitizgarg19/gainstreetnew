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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPostsMap: Map<number, BlogPost>;
  private blogPostsBySlug: Map<string, BlogPost>;
  private marketIndicesMap: Map<number, MarketIndex>;
  private stocksMap: Map<number, Stock>;
  private contactMessagesMap: Map<number, ContactMessage>;
  
  private userId: number;
  private blogPostId: number;
  private marketIndexId: number;
  private stockId: number;
  private contactMessageId: number;

  constructor() {
    this.users = new Map();
    this.blogPostsMap = new Map();
    this.blogPostsBySlug = new Map();
    this.marketIndicesMap = new Map();
    this.stocksMap = new Map();
    this.contactMessagesMap = new Map();
    
    this.userId = 1;
    this.blogPostId = 1;
    this.marketIndexId = 1;
    this.stockId = 1;
    this.contactMessageId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPostsMap.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPostsMap.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPostsBySlug.get(slug);
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const blogPost: BlogPost = { ...post, id };
    this.blogPostsMap.set(id, blogPost);
    this.blogPostsBySlug.set(blogPost.slug, blogPost);
    return blogPost;
  }
  
  // Market index methods
  async getMarketIndices(): Promise<MarketIndex[]> {
    return Array.from(this.marketIndicesMap.values());
  }
  
  async createMarketIndex(index: InsertMarketIndex): Promise<MarketIndex> {
    const id = this.marketIndexId++;
    const marketIndex: MarketIndex = { ...index, id };
    this.marketIndicesMap.set(id, marketIndex);
    return marketIndex;
  }
  
  async updateMarketIndex(id: number, index: Partial<InsertMarketIndex>): Promise<MarketIndex | undefined> {
    const current = this.marketIndicesMap.get(id);
    if (!current) return undefined;
    
    const updated: MarketIndex = { ...current, ...index };
    this.marketIndicesMap.set(id, updated);
    return updated;
  }
  
  // Stock methods
  async getStocks(): Promise<Stock[]> {
    return Array.from(this.stocksMap.values());
  }
  
  async createStock(stock: InsertStock): Promise<Stock> {
    const id = this.stockId++;
    const newStock: Stock = { ...stock, id };
    this.stocksMap.set(id, newStock);
    return newStock;
  }
  
  async updateStock(id: number, stock: Partial<InsertStock>): Promise<Stock | undefined> {
    const current = this.stocksMap.get(id);
    if (!current) return undefined;
    
    const updated: Stock = { ...current, ...stock };
    this.stocksMap.set(id, updated);
    return updated;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const contactMessage: ContactMessage = { ...message, id };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesMap.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  // Initialize with sample data
  private initializeData() {
    // Create blog posts
    this.createBlogPost({
      title: "Mastering Iron Condors in Volatile Markets",
      content: "Iron condors are a popular options trading strategy used when a trader believes that the underlying asset will remain within a specific price range by the time the options contracts expire. This strategy involves simultaneously buying and selling calls and puts with different strike prices but the same expiration date.\n\nThe strategy consists of four options contracts: selling an out-of-the-money call, buying a further out-of-the-money call, selling an out-of-the-money put, and buying a further out-of-the-money put. The goal is to profit from the premium collected while limiting risk.\n\nIron condors are particularly useful in volatile markets because they allow traders to capitalize on high implied volatility without having to predict the direction of price movement. When implied volatility is high, options premiums are also high, which means traders can collect more premium when selling options.\n\nHowever, this strategy requires careful risk management. The maximum profit is limited to the net premium received, while the maximum loss is the difference between the strike prices of the options on the same side (call or put) minus the net premium received.\n\nTo master iron condors in volatile markets, traders should:\n\n1. Choose the right underlying asset: Look for assets with high implied volatility but that are expected to trade within a range.\n\n2. Select appropriate strike prices: The short call and put should be outside the expected trading range of the underlying asset, while the long call and put should be further out to limit risk.\n\n3. Monitor the position: Regularly review the position and be prepared to adjust or close it if the underlying asset moves outside the expected range.\n\n4. Manage risk: Use stop-loss orders and consider taking profits early if the strategy is working as expected.\n\n5. Consider the timing: Implement the strategy when implied volatility is high but expected to decrease.\n\nBy understanding and effectively implementing iron condors, traders can generate consistent returns even in volatile market conditions.",
      excerpt: "Learn how to implement this advanced options strategy to profit from market consolidation while limiting risk.",
      category: "Options Strategy",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&h=600",
      publishedAt: new Date("2023-07-15").toISOString(),
      slug: "mastering-iron-condors-volatile-markets"
    });
    
    this.createBlogPost({
      title: "Q2 Earnings Impact on Nifty Outlook",
      content: "The second quarter earnings season has provided valuable insights into the trajectory of the Indian markets heading into the second half of 2023. As companies report their financial results, patterns emerge that can guide investment strategies for the coming months.\n\nKey sectors like IT, banking, and pharmaceuticals have shown mixed results, with IT facing challenges due to global economic uncertainties, while the banking sector demonstrates resilience backed by robust credit growth and improving asset quality.\n\nThe pharma sector has shown signs of recovery after facing headwinds from pricing pressures in the US market and regulatory challenges. Domestic consumption-driven companies have reported steady growth, reflecting the resilience of the Indian consumer despite inflationary pressures.\n\nBased on these earnings trends, our analysis suggests that the Nifty index is likely to trade in a range-bound manner in the near term, with support at 22,500 and resistance at 23,200. The broader market momentum remains positive, driven by strong domestic inflows through mutual funds and retail participation.\n\nSectoral rotation is expected to continue, with defensive sectors like FMCG and healthcare gaining favor if global uncertainties persist. Conversely, cyclical sectors such as metals and real estate may outperform if global growth concerns ease and the US Federal Reserve signals a pause in rate hikes.\n\nInvestors should focus on companies with strong balance sheets, consistent earnings growth, and the ability to navigate inflationary pressures. Stock-specific opportunities will emerge as the earnings season progresses, especially in mid-cap and small-cap segments where valuation comfort exists.\n\nOptions traders should consider strategies that capitalize on range-bound movements, such as iron condors or butterfly spreads, while maintaining appropriate risk management protocols.",
      excerpt: "Our analysis of how the latest quarterly results are shaping the trajectory of Indian markets heading into H2 2023.",
      category: "Market Analysis",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&h=400",
      publishedAt: new Date("2023-07-08").toISOString(),
      slug: "q2-earnings-impact-nifty-outlook"
    });
    
    this.createBlogPost({
      title: "Advanced Volume Profile Analysis for Options Traders",
      content: "Volume profile analysis is a powerful tool that options traders can leverage to identify key price levels for strategic positioning. Unlike traditional technical indicators that focus on price and time, volume profile provides insights into trading activity at specific price levels.\n\nThe volume profile displays a horizontal histogram that shows the volume traded at each price level during a specified time period. This creates a shape that represents where most of the trading activity has occurred, highlighting areas of high volume (known as high-volume nodes) and low volume (low-volume nodes).\n\nFor options traders, these volume nodes serve as critical reference points for determining potential support and resistance levels, which can inform strike price selection and strategy implementation.\n\nHigh-volume nodes often indicate areas of price agreement between buyers and sellers, which can act as strong support or resistance. When price approaches these levels, options traders can anticipate potential bounces or reversals, making them ideal for placing directional options trades or determining stop-loss levels.\n\nLow-volume nodes, conversely, represent areas where price moved quickly with little trading activity. These areas often indicate price levels where the market lacks conviction, making them potential areas for price to move through rapidly when revisited.\n\nThe Point of Control (POC) - the price level with the highest traded volume - is particularly significant. The POC often acts as a magnet for price, making it a key reference point for options strategies. For example, when price is trading above the POC, selling put options at strike prices near the POC can be a high-probability strategy, as price is likely to find support at this level.\n\nValue areas, which encompass 70% of the volume within a profile, help traders identify fair value ranges. Trading strategies can be designed around price returning to or staying within these value areas, or breaking out of them during trend changes.\n\nBy incorporating volume profile analysis into options trading, traders can make more informed decisions about strike price selection, strategy choice, and risk management parameters, ultimately improving the probability of successful trades.",
      excerpt: "How to use volume profile as a powerful tool to identify key price levels for strategic options positioning.",
      category: "Technical Analysis",
      imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&h=400",
      publishedAt: new Date("2023-07-01").toISOString(),
      slug: "advanced-volume-profile-analysis-options-traders"
    });
    
    // Create market indices
    this.createMarketIndex({
      name: "NIFTY 50",
      value: "22,825.20",
      change: "+154.80",
      percentChange: "+0.68%",
      isPositive: true
    });
    
    this.createMarketIndex({
      name: "NIFTY BANK",
      value: "48,756.35",
      change: "+324.15",
      percentChange: "+0.67%",
      isPositive: true
    });
    
    this.createMarketIndex({
      name: "NIFTY IT",
      value: "37,112.80",
      change: "-215.40",
      percentChange: "-0.58%",
      isPositive: false
    });
    
    this.createMarketIndex({
      name: "NIFTY PHARMA",
      value: "18,924.75",
      change: "+87.20",
      percentChange: "+0.46%",
      isPositive: true
    });
    
    // Create stocks
    this.createStock({
      symbol: "TATASTEEL",
      name: "Tata Steel Ltd.",
      ltp: "142.75",
      change: "+9.45",
      percentChange: "+7.08%",
      isPositive: true
    });
    
    this.createStock({
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      ltp: "1,642.30",
      change: "+56.85",
      percentChange: "+3.59%",
      isPositive: true
    });
    
    this.createStock({
      symbol: "INFY",
      name: "Infosys Ltd.",
      ltp: "1,478.60",
      change: "-42.35",
      percentChange: "-2.78%",
      isPositive: false
    });
    
    this.createStock({
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd.",
      ltp: "3,745.20",
      change: "-65.75",
      percentChange: "-1.73%",
      isPositive: false
    });
  }
}

export const storage = new MemStorage();
