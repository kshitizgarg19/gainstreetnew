import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface OptionData {
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

const optionsData: OptionData[] = [
  {
    callOI: "13,245,600",
    callOIChange: "+2,456,700",
    callVolume: "128,450",
    callLTP: "145.20",
    callIV: "11.2%",
    strikePrice: "22,700",
    putIV: "10.5%",
    putLTP: "98.75",
    putVolume: "95,230",
    putOIChange: "-567,800",
    putOI: "8,975,400"
  },
  {
    callOI: "9,854,200",
    callOIChange: "+1,243,500",
    callVolume: "87,240",
    callLTP: "124.55",
    callIV: "10.8%",
    strikePrice: "22,750",
    putIV: "11.2%",
    putLTP: "118.30",
    putVolume: "102,360",
    putOIChange: "+842,100",
    putOI: "10,523,800"
  },
  {
    callOI: "7,563,800",
    callOIChange: "-963,200",
    callVolume: "65,310",
    callLTP: "98.40",
    callIV: "9.7%",
    strikePrice: "22,800",
    putIV: "12.4%",
    putLTP: "143.85",
    putVolume: "124,570",
    putOIChange: "+1,536,400",
    putOI: "12,847,600"
  },
  {
    callOI: "5,248,600",
    callOIChange: "-487,300",
    callVolume: "42,680",
    callLTP: "72.15",
    callIV: "9.1%",
    strikePrice: "22,850",
    putIV: "13.5%",
    putLTP: "168.25",
    putVolume: "106,930",
    putOIChange: "+725,800",
    putOI: "9,635,200"
  }
];

export default function OptionsChain() {
  const [selectedSymbol, setSelectedSymbol] = useState("NIFTY");
  const [selectedExpiry, setSelectedExpiry] = useState("25 JUL 2023");
  const [priceRangeFrom, setPriceRangeFrom] = useState("");
  const [priceRangeTo, setPriceRangeTo] = useState("");

  return (
    <section id="options" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6 text-foreground">
          Options <span className="text-secondary">Chain Analysis</span>
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Comprehensive options data for informed trading decisions across all major Indian indices and stocks.
        </p>
        
        <Card className="mb-8 bg-card shadow-lg border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Select Index/Stock</label>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Index/Stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NIFTY">NIFTY</SelectItem>
                    <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                    <SelectItem value="FINNIFTY">FINNIFTY</SelectItem>
                    <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                    <SelectItem value="HDFCBANK">HDFCBANK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Expiry Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25 JUL 2023">25 JUL 2023</SelectItem>
                    <SelectItem value="31 JUL 2023">31 JUL 2023</SelectItem>
                    <SelectItem value="3 AUG 2023">3 AUG 2023</SelectItem>
                    <SelectItem value="10 AUG 2023">10 AUG 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Strike Price Range</label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    placeholder="From" 
                    className="w-24"
                    value={priceRangeFrom}
                    onChange={(e) => setPriceRangeFrom(e.target.value)}
                  />
                  <span className="text-foreground">-</span>
                  <Input 
                    type="number" 
                    placeholder="To" 
                    className="w-24"
                    value={priceRangeTo}
                    onChange={(e) => setPriceRangeTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground text-center text-sm">
                    <th colSpan={5} className="py-2 border-r border-r-white/20">CALLS</th>
                    <th className="py-2 px-3">Strike</th>
                    <th colSpan={5} className="py-2">PUTS</th>
                  </tr>
                  <tr className="bg-primary/90 text-primary-foreground text-sm">
                    <th className="py-2 px-3">OI</th>
                    <th className="py-2 px-3">Chg in OI</th>
                    <th className="py-2 px-3">Volume</th>
                    <th className="py-2 px-3">LTP</th>
                    <th className="py-2 px-3">IV</th>
                    <th className="py-2 px-3 bg-secondary text-secondary-foreground font-bold">Price</th>
                    <th className="py-2 px-3">IV</th>
                    <th className="py-2 px-3">LTP</th>
                    <th className="py-2 px-3">Volume</th>
                    <th className="py-2 px-3">Chg in OI</th>
                    <th className="py-2 px-3">OI</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-foreground">
                  {optionsData.map((option, index) => (
                    <tr key={index} className="option-row border-b border-muted">
                      <td className="py-2 px-3 text-right font-mono">{option.callOI}</td>
                      <td className={`py-2 px-3 text-right font-mono ${option.callOIChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {option.callOIChange}
                      </td>
                      <td className="py-2 px-3 text-right font-mono">{option.callVolume}</td>
                      <td className="py-2 px-3 text-right font-mono">{option.callLTP}</td>
                      <td className="py-2 px-3 text-right font-mono">{option.callIV}</td>
                      <td className="py-2 px-3 text-center bg-muted font-bold">{option.strikePrice}</td>
                      <td className="py-2 px-3 text-right font-mono">{option.putIV}</td>
                      <td className="py-2 px-3 text-right font-mono">{option.putLTP}</td>
                      <td className="py-2 px-3 text-right font-mono">{option.putVolume}</td>
                      <td className={`py-2 px-3 text-right font-mono ${option.putOIChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {option.putOIChange}
                      </td>
                      <td className="py-2 px-3 text-right font-mono">{option.putOI}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-3 text-foreground">Options Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary p-4 rounded-sm text-primary-foreground">
                  <h5 className="font-medium mb-2">Put-Call Ratio</h5>
                  <p className="text-3xl font-bold"><span className="text-secondary">0.89</span></p>
                  <p className="text-xs text-muted-foreground mt-1">Slightly bearish sentiment</p>
                </div>
                <div className="bg-primary p-4 rounded-sm text-primary-foreground">
                  <h5 className="font-medium mb-2">Max Pain</h5>
                  <p className="text-3xl font-bold"><span className="text-secondary">22,800</span></p>
                  <p className="text-xs text-muted-foreground mt-1">Key support/resistance level</p>
                </div>
                <div className="bg-primary p-4 rounded-sm text-primary-foreground">
                  <h5 className="font-medium mb-2">IV Percentile</h5>
                  <p className="text-3xl font-bold"><span className="text-secondary">65%</span></p>
                  <p className="text-xs text-muted-foreground mt-1">Above average volatility</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
