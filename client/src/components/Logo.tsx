export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="relative h-10 w-10 mr-2">
        <div className="absolute inset-0 bg-secondary rounded-sm transform rotate-45"></div>
        <div className="absolute inset-1 bg-primary rounded-sm transform rotate-45 flex items-center justify-center">
          <span className="text-secondary font-bold text-xl">G</span>
        </div>
      </div>
      <div>
        <span className="font-[Playfair_Display] text-2xl md:text-3xl font-bold">
          <span className="text-secondary">Gain</span> Street <span className="text-secondary">Capital</span>
        </span>
      </div>
    </div>
  );
}