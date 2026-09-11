import { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share2, PlusSquare, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already running as standalone installed app, show minimal verified status or null
  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>অ্যাপ চালু আছে</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        id="pwa-install-app-btn"
        type="button"
        onClick={handleInstallClick}
        aria-label="অ্যাপ ইনস্টল করুন"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs sm:text-[13px] font-bold shadow-xs hover:shadow transition-all cursor-pointer select-none active:scale-95 shrink-0"
      >
        <Download className="w-3.5 h-3.5 animate-bounce" />
        <span>অ্যাপ ইনস্টল করুন</span>
      </button>

      {/* Guide Modal for iOS or manual installation */}
      {showGuideModal && (
        <div
          id="pwa-install-guide-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-gray-100 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    মোবাইলে অ্যাপ ইনস্টল করুন
                  </h3>
                  <span className="text-[11px] text-gray-500 font-mono">www.desilivecam.com</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-gray-700">
              {isIOS ? (
                // iPhone / iPad Guide
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 font-medium">
                    iPhone / iPad (Safari) ব্যবহারকারীদের জন্য:
                  </div>
                  <ol className="space-y-2 list-decimal list-inside pl-1 text-gray-600">
                    <li className="leading-relaxed">
                      নিচের ব্রাউজার বারে থাকা <strong className="inline-flex items-center gap-0.5 text-gray-900 font-bold"><Share2 className="w-3.5 h-3.5 inline text-blue-600" /> Share</strong> বাটনে ক্লিক করুন।
                    </li>
                    <li className="leading-relaxed">
                      মেনু স্ক্রল করে <strong className="inline-flex items-center gap-0.5 text-gray-900 font-bold"><PlusSquare className="w-3.5 h-3.5 inline text-blue-600" /> Add to Home Screen</strong> চাপুন।
                    </li>
                    <li className="leading-relaxed">
                      উপরে ডান পাশের <strong>"Add"</strong> বাটনে ক্লিক করলে মোবাইলের হোম স্ক্রিনে অ্যাপ যুক্ত হয়ে যাবে।
                    </li>
                  </ol>
                </div>
              ) : (
                // Android / Chrome / Desktop Guide
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Android / Chrome ব্যবহারকারীদের জন্য:</span>
                  </div>
                  <ol className="space-y-2 list-decimal list-inside pl-1 text-gray-600">
                    <li className="leading-relaxed">
                      ব্রাউজারের উপরে বা নিচে ডান পাশের <strong>তিনটি বিন্দু (⋮) বা মেনু</strong> অপশনে চাপ দিন।
                    </li>
                    <li className="leading-relaxed">
                      মেনু থেকে <strong>"Install App"</strong> অথবা <strong>"Add to Home Screen"</strong> (হোম স্ক্রিনে যোগ করুন) চাপুন।
                    </li>
                    <li className="leading-relaxed">
                      কয়েক সেকেন্ডের মধ্যে অ্যাপটি মোবাইলে ডাউনলোড ও ইনস্টল হয়ে যাবে।
                    </li>
                  </ol>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-full py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
              >
                ঠিক আছে, বুঝেছি
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PWAInstallTopBanner() {
  const { isInstalled, isInstallable, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <div
      id="pwa-install-top-banner"
      className="bg-[#1a73e8] text-white rounded-xl p-2.5 sm:p-3 mb-3.5 shadow-sm flex items-center justify-between gap-2 text-left"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Smartphone className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs sm:text-[13px] font-bold leading-tight">
            অফিসিয়াল মোবাইল অ্যাপ ইনস্টল করুন
          </div>
          <div className="text-[11px] text-blue-100">
            সহজে ও দ্রুত ব্যবহারের জন্য ফোনে সরাসরি অ্যাপ রাখুন
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={async () => {
            if (isInstallable) {
              await install();
            } else {
              setShowModal(true);
            }
          }}
          className="px-2.5 py-1.5 rounded-lg bg-white text-[#1a73e8] hover:bg-blue-50 text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3 h-3 text-[#1a73e8]" />
          <span>ইনস্টল</span>
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 text-white/70 hover:text-white rounded cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-gray-100 text-left text-gray-900">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                মোবাইলে কীভাবে অ্যাপ ইনস্টল করবেন?
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-3 text-xs space-y-2 text-gray-600">
              <p>১. আপনার ক্রোম বা মোবাইল ব্রাউজারের মেনু (⋮) অপশনে চাপুন।</p>
              <p>২. <strong>"Install app"</strong> বা <strong>"Add to Home screen"</strong> সিলেক্ট করুন।</p>
              <p>৩. নিশ্চিত করলেই হোম স্ক্রিনে অ্যাপ আইকন তৈরি হয়ে যাবে।</p>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
