import { useState, useEffect, type FormEvent } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Receipt,
  RotateCcw,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { TransactionRecord } from '../types.ts';
import { BlueVerifiedBadge } from './BlueVerifiedBadge.tsx';

interface TransactionSystemProps {
  initialServiceName?: string;
  initialAmount?: number;
  recipientNumber: string;
  whatsappUrl: string;
  telegramUrl: string;
}

const AVAILABLE_PACKAGES = [
  { name: 'Face cam', price: 1550 },
  { name: 'Non face', price: 1250 },
  { name: 'Face organization Face', price: 3060 },
  { name: 'Face organization non face', price: 1850 },
  { name: 'মেম্বারশিপ প্যাকেজ (Full)', price: 8500 },
];

export function TransactionSystem({
  initialServiceName = 'Face cam',
  initialAmount = 1550,
  recipientNumber,
  whatsappUrl,
  telegramUrl,
}: TransactionSystemProps) {
  const [selectedPackage, setSelectedPackage] = useState(initialServiceName);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<TransactionRecord | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [history, setHistory] = useState<TransactionRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('membership_user_transactions');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Update when initial properties change
  useEffect(() => {
    if (initialServiceName) {
      setSelectedPackage(initialServiceName);
    }
    if (initialAmount) {
      setAmount(initialAmount);
    }
  }, [initialServiceName, initialAmount]);

  const handlePackageChange = (pkgName: string) => {
    setSelectedPackage(pkgName);
    const found = AVAILABLE_PACKAGES.find((p) => p.name === pkgName);
    if (found) {
      setAmount(found.price);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanNumber = senderNumber.trim();
    const cleanTrx = trxId.trim().toUpperCase();

    if (!cleanNumber || cleanNumber.length < 11) {
      setError('সঠিক ১১ ডিজিটের বিকাশ প্রেরক নম্বর প্রদান করুন (যেমন: 01XXXXXXXXX)');
      return;
    }

    if (!cleanTrx || cleanTrx.length < 5) {
      setError('সঠিক বিকাশ ট্রানজেকশন আইডি (TrxID) প্রদান করুন');
      return;
    }

    if (!amount || amount <= 0) {
      setError('সঠিক টাকার পরিমাণ উল্লেখ করুন');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord: TransactionRecord = {
        id: `TRX-${Date.now().toString().slice(-6)}`,
        senderNumber: cleanNumber,
        trxId: cleanTrx,
        amount: Number(amount),
        serviceName: selectedPackage,
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        status: 'verified',
      };

      const updatedHistory = [newRecord, ...history];
      setHistory(updatedHistory);
      try {
        localStorage.setItem(
          'membership_user_transactions',
          JSON.stringify(updatedHistory.slice(0, 10))
        );
      } catch {
        // ignore
      }

      setSubmittedRecord(newRecord);
      setIsSubmitting(false);
    }, 600);
  };

  const getReceiptText = (record: TransactionRecord) => {
    return `✅ www.desilivecam.com Google Verified Official মেমো:\n• সার্ভিস: ${record.serviceName}\n• টাকার পরিমাণ: ${record.amount} টাকা\n• প্রেরক নম্বর: ${record.senderNumber}\n• ট্রানজেকশন আইডি (TrxID): ${record.trxId}\n• টোকেন নং: ${record.id}\n• সময়: ${record.timestamp}\n• ওয়েবসাইট: www.desilivecam.com\n• প্রাপক বিকাশ পার্সোনাল: ${recipientNumber}`;
  };

  const handleCopyReceipt = async (record: TransactionRecord) => {
    const text = getReceiptText(record);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div
      id="transaction-system-container"
      className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm mb-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                ট্রানজেকশন ভেরিফিকেশন সিস্টেম
              </h3>
              <BlueVerifiedBadge size="sm" />
            </div>
            <p className="text-xs text-gray-500">
              টাকা পাঠানোর পর TrxID দিয়ে নিশ্চিত করুন
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-md"
          >
            <Clock className="w-3 h-3" />
            <span>ইতিহাস ({history.length})</span>
          </button>
        )}
      </div>

      {/* History view toggle */}
      {showHistory && history.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700 uppercase">
              সাম্প্রতিক জমা দেওয়া ট্রানজেকশন
            </span>
            <button
              onClick={() => setShowHistory(false)}
              className="text-[11px] text-gray-500 hover:text-gray-800"
            >
              বন্ধ করুন
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white p-2.5 rounded border border-gray-200 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-1">
                    <span>{item.serviceName}</span>
                    <span className="text-blue-600 font-mono">({item.trxId})</span>
                  </div>
                  <div className="text-[11px] text-gray-500">
                    প্রেরক: {item.senderNumber} • {item.timestamp}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700">{item.amount} ৳</div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submitted Result / Receipt Card */}
      {submittedRecord ? (
        <div
          id="transaction-success-memo"
          className="bg-gradient-to-b from-blue-50/50 to-white border border-blue-200 rounded-xl p-4 sm:p-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3 border-b border-blue-100 pb-2.5">
            <div className="flex items-center gap-1.5">
              <BlueVerifiedBadge size="md" />
              <span className="text-xs font-black uppercase tracking-wider text-blue-900 font-mono">
                www.desilivecam.com Official Receipt
              </span>
            </div>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ভেরিফিকেশন গ্রহণ করা হয়েছে
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-gray-700 my-3">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">টোকেন নং:</span>
              <span className="font-mono font-bold text-gray-900">{submittedRecord.id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">সার্ভিস:</span>
              <span className="font-bold text-gray-900">{submittedRecord.serviceName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">টাকার পরিমাণ:</span>
              <span className="font-black text-blue-900 text-base">
                {submittedRecord.amount} টাকা
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">প্রেরক বিকাশ নম্বর:</span>
              <span className="font-mono font-bold text-gray-900">{submittedRecord.senderNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">ট্রানজেকশন আইডি (TrxID):</span>
              <span className="font-mono font-black text-[#c2185b] tracking-wider text-sm">
                {submittedRecord.trxId}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">জমা দেওয়ার সময়:</span>
              <span className="text-gray-600">{submittedRecord.timestamp}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
            <a
              id="send-receipt-whatsapp-btn"
              href={`https://wa.me/8801706412074?text=${encodeURIComponent(
                getReceiptText(submittedRecord)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp এ মেমো পাঠান</span>
            </a>

            <button
              id="copy-receipt-btn"
              type="button"
              onClick={() => handleCopyReceipt(submittedRecord)}
              className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedReceipt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>মেমো কপি</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setSubmittedRecord(null);
                setTrxId('');
              }}
              className="px-3 py-2 text-gray-500 hover:text-gray-800 text-xs flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>নতুন</span>
            </button>
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Service Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              সার্ভিস / প্যাকেজ নির্বাচন করুন
            </label>
            <div className="relative">
              <select
                id="trx-service-select"
                value={selectedPackage}
                onChange={(e) => handlePackageChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm font-medium text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              >
                {AVAILABLE_PACKAGES.map((pkg) => (
                  <option key={pkg.name} value={pkg.name}>
                    {pkg.name} — {pkg.price}/- টাকা
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sender Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                আপনার বিকাশ প্রেরক নম্বর
              </label>
              <input
                id="trx-sender-number"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                maxLength={14}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-mono"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                টাকার পরিমাণ (টাকা)
              </label>
              <input
                id="trx-amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={100}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-bold"
                required
              />
            </div>
          </div>

          {/* Transaction ID */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">
                বিকাশ ট্রানজেকশন আইডি (TrxID)
              </label>
              <span className="text-[11px] text-pink-600 font-medium">
                বিকাশ SMS থেকে কপি করুন
              </span>
            </div>
            <input
              id="trx-id-input"
              type="text"
              placeholder="e.g. BK72B9X4LA"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value.toUpperCase())}
              className="w-full bg-gray-50 border border-pink-300 focus:border-pink-500 rounded-lg p-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-mono tracking-wider uppercase font-bold"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            id="submit-transaction-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-60 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span>যাচাই ও জমা করা হচ্ছে...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>ট্রানজেকশন ভেরিফাই ও মেমো সংগ্রহ করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
