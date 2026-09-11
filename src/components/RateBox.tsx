import { ShieldCheck } from 'lucide-react';

interface RateBoxProps {
  amount: number;
  currency: string;
}

export function RateBox({ amount, currency }: RateBoxProps) {
  return (
    <div
      id="membership-rate-box"
      className="bg-[#e3f2fd] border-l-4 border-[#1e88e5] p-4 rounded-r-md mt-4 mb-5 flex items-center justify-between shadow-xs transition-shadow duration-200 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl shrink-0" role="img" aria-label="gift">
          🎁
        </span>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span className="text-base sm:text-lg font-bold text-[#0d47a1]">
            মেম্বারশিপ রেট:
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#0d47a1] tracking-wide">
            ৮৫০০ {currency}
          </span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#bbdefb] text-[#0d47a1]">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>লাইফটাইম ভেরিফাইড</span>
      </div>
    </div>
  );
}
