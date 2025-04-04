import { TrendingUp } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="relative h-14 w-14 mr-3">
        {/* Base shield shape with gold gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-secondary to-amber-700 rounded-b-lg rounded-t-md shadow-xl"></div>
        
        {/* Inner panel with stock chart pattern */}
        <div className="absolute inset-[2px] bg-primary rounded-b-lg rounded-t-md flex items-center justify-center 
                      border-t border-l border-r border-secondary/60 overflow-hidden">
          
          {/* Subtle chart pattern in background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 w-full h-[40%] flex items-end">
              <div className="w-[10%] h-[30%] bg-secondary mx-[1px]"></div>
              <div className="w-[10%] h-[50%] bg-secondary mx-[1px]"></div>
              <div className="w-[10%] h-[70%] bg-secondary mx-[1px]"></div>
              <div className="w-[10%] h-[40%] bg-secondary mx-[1px]"></div>
              <div className="w-[10%] h-[80%] bg-secondary mx-[1px]"></div>
              <div className="w-[10%] h-[60%] bg-secondary mx-[1px]"></div>
              <div className="w-[10%] h-[90%] bg-secondary mx-[1px]"></div>
            </div>
          </div>
          
          {/* "GSC" with premium layered effect */}
          <div className="relative font-bold text-lg tracking-tight z-10">
            {/* Shadow layers for 3D effect */}
            <div className="absolute -top-[2px] -left-[2px] text-black/20 blur-[1px]">GSC</div>
            <div className="absolute -top-[1px] -left-[1px] text-secondary/60">GSC</div>
            
            {/* Main text with gradient */}
            <div className="bg-gradient-to-b from-yellow-300 via-secondary to-amber-600 bg-clip-text text-transparent">
              GSC
            </div>
          </div>
          
          {/* Small stock icon */}
          <div className="absolute bottom-1 right-1">
            <TrendingUp className="h-3 w-3 text-secondary/90" />
          </div>
        </div>
        
        {/* Gold decorative elements */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-300 to-secondary rounded-full border border-primary/50"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-300/50"></div>
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-70"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-70"></div>
      </div>
      
      <div>
        <div className="relative">
          <span className="font-[Playfair_Display] text-2xl md:text-3xl font-bold tracking-wide flex flex-col md:flex-row">
            <span className="bg-gradient-to-r from-yellow-300 via-secondary to-amber-600 bg-clip-text text-transparent">Gain Street Capital</span>
          </span>
          
          {/* Elegant tagline */}
          <span className="text-xs text-secondary/80 tracking-widest uppercase mt-0 md:mt-0.5 block font-light">
            Premium Trading Solutions
          </span>
        </div>
        
        {/* Decorative line with animated gradient effect */}
        <div className="h-0.5 w-full bg-gradient-to-r from-secondary/10 via-yellow-400/90 to-secondary/10 mt-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}