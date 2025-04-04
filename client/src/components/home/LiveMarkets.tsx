import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketIndex, Stock } from "@/lib/types";

export default function LiveMarkets() {
  const tradingViewRef = useRef<HTMLDivElement>(null);

  const { data: indices, isLoading: indicesLoading } = useQuery<MarketIndex[]>({
    queryKey: ["/api/market-indices"],
  });

  const { data: stocks, isLoading: stocksLoading } = useQuery<Stock[]>({
    queryKey: ["/api/stocks"],
  });

  // Initialize TradingView widget
  useEffect(() => {
    if (!tradingViewRef.current) return;
    
    // Clean up previous widget if it exists
    tradingViewRef.current.innerHTML = '';
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== 'undefined') {
        new window.TradingView.widget({
          width: '100%',
          height: 500,
          symbol: "NSE:NIFTY",
          interval: "D",
          timezone: "Asia/Kolkata",
          theme: "dark",
          style: "1",
          locale: "in",
          toolbar_bg: "#1f2937",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: 'tradingview-widget'
        });
      }
    };
    
    tradingViewRef.current.appendChild(script);
    
    return () => {
      if (tradingViewRef.current) {
        tradingViewRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="markets" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6 text-foreground">
          Live <span className="text-secondary">Market Overview</span>
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Stay ahead with real-time market data and comprehensive technical analysis powered by TradingView.
        </p>
        
        <Card className="bg-card shadow-lg rounded-md p-4 mb-12 border-secondary/20">
          <CardContent className="p-0">
            <div id="tradingview-widget" ref={tradingViewRef} className="w-full h-[500px]">
              <div className="flex items-center justify-center h-full bg-primary">
                <p className="text-muted-foreground">Loading TradingView chart...</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card shadow-lg rounded-md border-secondary/20">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-4 flex items-center text-foreground">
                <i className="fas fa-chart-bar text-secondary mr-2"></i> NSE Market Overview
              </h3>
              <div className="overflow-x-auto custom-scrollbar">
                {indicesLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-primary text-primary-foreground text-left">
                        <th className="py-3 px-4 font-semibold">Index</th>
                        <th className="py-3 px-4 font-semibold">Value</th>
                        <th className="py-3 px-4 font-semibold">Change</th>
                        <th className="py-3 px-4 font-semibold">%</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      {indices?.map((index) => (
                        <tr key={index.id} className="border-b border-muted">
                          <td className="py-3 px-4 font-medium">{index.name}</td>
                          <td className="py-3 px-4 font-mono">{index.value}</td>
                          <td className={`py-3 px-4 font-mono ${index.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {index.change}
                          </td>
                          <td className={`py-3 px-4 font-mono ${index.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {index.percentChange}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-lg rounded-md border-secondary/20">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-4 flex items-center text-foreground">
                <i className="fas fa-fire-alt text-secondary mr-2"></i> Top Gainers/Losers
              </h3>
              <div className="overflow-x-auto custom-scrollbar">
                {stocksLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-primary text-primary-foreground text-left">
                        <th className="py-3 px-4 font-semibold">Stock</th>
                        <th className="py-3 px-4 font-semibold">LTP</th>
                        <th className="py-3 px-4 font-semibold">Change</th>
                        <th className="py-3 px-4 font-semibold">%</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      {stocks?.map((stock) => (
                        <tr key={stock.id} className="border-b border-muted">
                          <td className="py-3 px-4 font-medium">{stock.symbol}</td>
                          <td className="py-3 px-4 font-mono">{stock.ltp}</td>
                          <td className={`py-3 px-4 font-mono ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change}
                          </td>
                          <td className={`py-3 px-4 font-mono ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.percentChange}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
