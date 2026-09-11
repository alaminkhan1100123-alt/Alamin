/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Crown, ShieldCheck, Globe, Star } from 'lucide-react';
import { membershipData, videoCallServices } from './data/membership.ts';
import { VideoCallServiceItem } from './types.ts';
import { FeatureItem } from './components/FeatureItem.tsx';
import { RateBox } from './components/RateBox.tsx';
import { PaymentBox } from './components/PaymentBox.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { VideoCallServicesList } from './components/VideoCallServicesList.tsx';
import { BlueVerifiedBadge, BlueVerifiedBanner } from './components/BlueVerifiedBadge.tsx';
import { TransactionSystem } from './components/TransactionSystem.tsx';
import { PWAInstallButton, PWAInstallTopBanner } from './components/PWAInstallButton.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';

type ActiveTab = 'videocall' | 'membership' | 'transaction' | 'reviews';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('videocall');
  const [selectedService, setSelectedService] = useState<VideoCallServiceItem | null>(
    videoCallServices[0]
  );

  const getCurrentServiceName = () => {
    if (activeTab === 'membership') return 'মেম্বারশিপ প্যাকেজ';
    return selectedService?.name || 'Face cam';
  };

  const getCurrentServicePrice = () => {
    if (activeTab === 'membership') return membershipData.rateAmount;
    return selectedService?.price || 1550;
  };

  return (
    <main
      id="main-container"
      className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-3 sm:p-6 text-slate-800"
    >
      <motion.div
        id="card-container"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white w-full max-w-[520px] rounded-2xl shadow-lg border border-[#e0e0e0] p-4 sm:p-6"
      >
        {/* Top Verified Brand Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#1a73e8] shrink-0" />
            <span className="font-bold text-sm sm:text-base text-gray-900 tracking-tight font-mono">
              www.desilivecam.com
            </span>
            <BlueVerifiedBadge size="md" showText={true} text="Google Verified" />
          </div>
          <div className="flex items-center gap-2">
            <PWAInstallButton />
          </div>
        </div>

        {/* Official Blue Verified Banner */}
        <BlueVerifiedBanner />

        {/* In-App PWA Install Banner */}
        <PWAInstallTopBanner />

        {/* 4-Way Navigation Tabs */}
        <div
          id="service-nav-tabs"
          className="grid grid-cols-4 bg-gray-100 p-1 rounded-xl mb-4 text-xs font-semibold gap-1"
          role="tablist"
        >
          <button
            id="tab-videocall-btn"
            role="tab"
            aria-selected={activeTab === 'videocall'}
            onClick={() => setActiveTab('videocall')}
            type="button"
            className={`flex items-center justify-center gap-1 py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'videocall'
                ? 'bg-white text-[#0d47a1] shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">ভিডিও কল</span>
          </button>

          <button
            id="tab-membership-btn"
            role="tab"
            aria-selected={activeTab === 'membership'}
            onClick={() => setActiveTab('membership')}
            type="button"
            className={`flex items-center justify-center gap-1 py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'membership'
                ? 'bg-white text-[#0d47a1] shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">মেম্বারশিপ</span>
          </button>

          <button
            id="tab-transaction-btn"
            role="tab"
            aria-selected={activeTab === 'transaction'}
            onClick={() => setActiveTab('transaction')}
            type="button"
            className={`flex items-center justify-center gap-1 py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'transaction'
                ? 'bg-white text-[#0d47a1] shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">পেমেন্ট</span>
          </button>

          <button
            id="tab-reviews-btn"
            role="tab"
            aria-selected={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
            type="button"
            className={`flex items-center justify-center gap-1 py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-white text-[#0d47a1] shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="truncate">রিভিউ (4.9★)</span>
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'videocall' && (
            <motion.div
              key="videocall-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <header className="mb-3.5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Verified Official Service</span>
                  <BlueVerifiedBadge size="sm" />
                </div>
                <h1
                  id="package-title"
                  className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-1.5"
                >
                  <span>ভিডিও কল সার্ভিস ও রেট চার্ট</span>
                  <BlueVerifiedBadge size="md" />
                </h1>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
                  www.desilivecam.com • ১০০% নিশ্চিত ও Google ভেরিফাইড
                </p>
              </header>

              <VideoCallServicesList
                services={videoCallServices}
                selectedServiceId={selectedService?.id || null}
                onSelectService={(svc) => setSelectedService(svc)}
              />
            </motion.div>
          )}

          {activeTab === 'membership' && (
            <motion.div
              key="membership-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <header className="mb-3.5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>প্রিমিয়াম লাইফটাইম অফার</span>
                  <BlueVerifiedBadge size="sm" />
                </div>
                <h1
                  id="membership-package-title"
                  className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-1.5"
                >
                  <span>{membershipData.title}</span>
                  <BlueVerifiedBadge size="md" />
                </h1>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
                  {membershipData.subtitle}
                </p>
              </header>

              <div id="feature-list" className="space-y-1 mb-2" role="list">
                {membershipData.features.map((feature, index) => (
                  <FeatureItem key={feature.id} feature={feature} index={index} />
                ))}
              </div>

              <RateBox
                amount={membershipData.rateAmount}
                currency={membershipData.currency}
              />
            </motion.div>
          )}

          {activeTab === 'transaction' && (
            <motion.div
              key="transaction-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TransactionSystem
                initialServiceName={getCurrentServiceName()}
                initialAmount={getCurrentServicePrice()}
                recipientNumber={membershipData.payment.number}
                whatsappUrl={membershipData.contact.whatsappUrl}
                telegramUrl={membershipData.contact.telegramAccounts[0]?.url || ''}
              />
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ReviewsSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Details - visible for non-transaction and non-reviews tabs */}
        {activeTab !== 'transaction' && activeTab !== 'reviews' && (
          <PaymentBox
            payment={membershipData.payment}
            selectedServiceName={getCurrentServiceName()}
            selectedServicePrice={getCurrentServicePrice()}
            onOpenTransactionSystem={() => setActiveTab('transaction')}
          />
        )}

        {/* Contact Info */}
        <ContactSection contact={membershipData.contact} />
      </motion.div>
    </main>
  );
}
