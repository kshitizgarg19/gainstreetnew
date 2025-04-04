// Blog Post type
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  slug: string;
}

// Market Index type
export interface MarketIndex {
  id: number;
  name: string;
  value: string;
  change: string;
  percentChange: string;
  isPositive: boolean;
}

// Stock type
export interface Stock {
  id: number;
  symbol: string;
  name: string;
  ltp: string;
  change: string;
  percentChange: string;
  isPositive: boolean;
}

// Contact Message type
export interface ContactMessage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Option Chain types
export interface OptionData {
  callOI: string;
  callOIChange: string;
  callVolume: string;
  callLTP: string;
  callIV: string;
  strikePrice: string;
  putIV: string;
  putLTP: string;
  putVolume: string;
  putOIChange: string;
  putOI: string;
}

// TradingView Widget interface to avoid TS errors
declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any;
    };
  }
}
