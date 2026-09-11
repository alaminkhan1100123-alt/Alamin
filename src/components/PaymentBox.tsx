import { useState } from 'react';
import { Copy, Check, Smartphone, MessageCircle, ShieldCheck } from 'lucide-react';
import { PaymentDetails } from '../types.ts';
import { BlueVerifiedBadge } from './BlueVerifiedBadge.tsx';

interface PaymentBoxProps {
  payment: PaymentDetails;
  selectedServiceName?: string;
  selectedServicePrice?: number;
  onOpenTransactionSystem?: () => void;
}

export function PaymentBox({
  payment,
  selectedServiceName,
  selectedServicePrice,
  onOpenTransactionSystem,
}: PaymentBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(payment.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = payment.number;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = selectedServiceName
    ? encodeURIComponent(
        `হ্যালো, আমি "${selectedServiceName}" (${selectedServicePrice}/- টাকা) সার্ভিসটি নিতে চাই।`
      )
    : encodeURIComponent('হ্যালো, বিস্তারিত জানতে ও সার্ভিস নিতে যোগাযোগ করছি।');

  return (
    <div
      id="payment-box-section"
      className="bg-[#fff0f5] border border-dashed border-[#e91e63] p-4 sm:p-5 rounded-xl mb-5 text-center shadow-xs transition-all relative overflow-hidden"
    >
      <div className="flex items-center justify-center gap-1.5 mb-1.5">
        <Smartphone className="w-5 h-5 text-[#d81b60]" />
        <h4 className="text-base sm:text-lg font-bold text-[#d81b60]">
          পেমেন্ট ও যোগাযোগের ঠিকানা
        </h4>
        <BlueVerifiedBadge size="sm" />
      </div>

      {/* Badges for platforms */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 text-[11px] font-semibold">
        <span className="bg-pink-100 text-[#c2185b] px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
          <span>bKash Personal</span>
          <BlueVerifiedBadge size="sm" />
        </span>
        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
          WhatsApp
        </span>
        <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
          IMO
        </span>
        <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200">
          Telegram
        </span>
      </div>

      {/* Number Card */}
      <div className="bg-white border border-pink-200 rounded-lg p-3 my-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 max-w-md mx-auto shadow-xs">
        <div className="flex items-center gap-2.5 text-left">
          <div className="w-9 h-9 rounded-full bg-[#d81b60]/10 flex items-center justify-center font-bold text-xs text-[#d81b60] shrink-0">
            বিকাশ
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <span>{payment.method} {payment.accountType}</span>
              <BlueVerifiedBadge size="sm" />
            </div>
            <div
              id="bkash-number-display"
              className="text-lg sm:text-xl font-bold tracking-wider text-[#c2185b] font-mono select-all leading-tight"
            >
              {payment.number}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button
            id="copy-payment-number-btn"
            onClick={handleCopyNumber}
            type="button"
            aria-label="নম্বর কপি করুন"
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#d81b60] hover:bg-[#c2185b] text-white shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>কপি নম্বর</span>
              </>
            )}
          </button>

          <a
            id="whatsapp-direct-link"
            href={`https://wa.me/8801706412074?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1 transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <p className="text-xs sm:text-[13px] text-gray-600 font-medium mt-2">
        <span className="font-bold text-gray-800">{payment.number}</span> — WhatsApp, IMO, Telegram এবং বিকাশ পেমেন্ট নম্বর
      </p>

      <p className="text-xs text-gray-500 mt-0.5">
        টাকা সীমা: <span className="font-semibold text-gray-800">৫০০ - ২৫০০০</span> টাকা
      </p>

      {/* Button to verify transaction */}
      {onOpenTransactionSystem && (
        <div className="mt-3 pt-2.5 border-t border-pink-100">
          <button
            id="open-transaction-system-btn"
            type="button"
            onClick={onOpenTransactionSystem}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d81b60] hover:text-[#ad1457] bg-pink-50 hover:bg-pink-100/80 px-3.5 py-1.5 rounded-full border border-pink-200 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>টাকা পাঠিয়েছেন? ট্রানজেকশন ভেরিফাই করুন</span>
            <BlueVerifiedBadge size="sm" />
          </button>
        </div>
      )}
    </div>
  );
}
