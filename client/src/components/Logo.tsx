export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="relative h-12 w-12 mr-3">
        {/* Diamond shape base */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-yellow-600 rounded-sm transform rotate-45 shadow-lg"></div>
        
        {/* Inner diamond with subtle pattern */}
        <div className="absolute inset-1 bg-primary rounded-sm transform rotate-45 flex items-center justify-center 
                       border border-secondary/40 backdrop-blur-sm">
          
          {/* Logo letter with 3D effect */}
          <div className="relative">
            <span className="absolute -top-[1px] -left-[1px] text-black/10 font-bold text-2xl filter blur-[0.5px]">G</span>
            <span className="absolute -top-[0.5px] -left-[0.5px] text-secondary/80 font-bold text-2xl">G</span>
            <span className="relative text-secondary font-bold text-2xl">G</span>
          </div>
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-secondary rounded-full opacity-80 shadow-glow-sm"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-secondary rounded-full opacity-80 shadow-glow-sm"></div>
      </div>
      
      <div>
        <span className="font-[Playfair_Display] text-2xl md:text-3xl font-bold tracking-wide">
          <span className="text-secondary bg-gradient-to-r from-secondary to-yellow-600 bg-clip-text text-transparent">Gain</span>
          <span className="px-0.5"> Street </span>
          <span className="text-secondary bg-gradient-to-r from-secondary to-yellow-600 bg-clip-text text-transparent">Capital</span>
        </span>
        <div className="h-0.5 w-full bg-gradient-to-r from-secondary/10 via-secondary/80 to-secondary/10 mt-0.5"></div>
      </div>
    </div>
  );
}