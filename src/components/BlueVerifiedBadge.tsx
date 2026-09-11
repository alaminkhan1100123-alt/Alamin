import { BadgeCheck, ShieldCheck, Globe, Lock } from 'lucide-react';

interface BlueVerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  className?: string;
}

export function BlueVerifiedBadge({
  size = 'md',
  showText = false,
  text = 'Google Verified',
  className = '',
}: BlueVerifiedBadgeProps) {
  const iconSizeClass =
    size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <span
      className={`inline-flex items-center gap-1 text-[#1a73e8] ${className}`}
      title="Google Verified Official Account"
    >
      <BadgeCheck
        className={`${iconSizeClass} fill-[#1a73e8] text-white shrink-0 drop-shadow-xs`}
        aria-label="Google Verified"
      />
      {showText && (
        <span className="text-xs font-bold tracking-tight text-[#1a73e8] select-none">
          {text}
        </span>
      )}
    </span>
  );
}

export function GoogleVerifiedBadge({
  size = 'md',
  showDomain = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  showDomain?: boolean;
}) {
  const iconSizeClass =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
      <BadgeCheck className={`${iconSizeClass} fill-[#1a73e8] text-white shrink-0`} />
      <span>Google Verified</span>
      {showDomain && (
        <span className="text-blue-900 font-mono font-bold">www.desilivecam.com</span>
      )}
    </span>
  );
}

export function BlueVerifiedBanner() {
  return (
    <div
      id="google-verified-official-banner"
      className="bg-gradient-to-r from-blue-50 via-sky-50 to-emerald-50 border border-blue-200 rounded-xl p-3 sm:p-3.5 my-3 shadow-xs"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-200 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-5 h-5 fill-[#1a73e8] text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-gray-900 leading-tight tracking-tight">
                Google Verified Official Account
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                <Globe className="w-3 h-3 text-blue-600" />
                <span className="font-mono font-bold">www.desilivecam.com</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium mt-0.5 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600 inline" />
              <span>১০০% নিশ্চিত, সুরক্ষিত ও অফিসিয়াল ওয়েবসাইট</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end shrink-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Safe</span>
          </span>
        </div>
      </div>
    </div>
  );
}
