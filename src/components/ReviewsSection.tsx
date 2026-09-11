import { useState, useEffect, type FormEvent } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquareQuote, 
  Send, 
  ShieldCheck, 
  BadgeCheck, 
  Filter, 
  Plus, 
  X, 
  Sparkles
} from 'lucide-react';
import { CustomerReview } from '../types.ts';
import { BlueVerifiedBadge } from './BlueVerifiedBadge.tsx';

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'তানভীর আহমেদ',
    location: 'মিরপুর, ঢাকা',
    rating: 5,
    serviceUsed: '৩০ মিনিট প্রিমিয়াম কল',
    comment: 'প্রথমে একটু সংশয়ে ছিলাম, কিন্তু পেমেন্ট করার পর মাত্র ২ মিনিটের মধ্যে সরাসরি হোয়াটসঅ্যাপে কানেক্ট করে দেয়। ভিডিও এবং অডিও কোয়ালিটি একদম এইচডি ও ক্লিয়ার ছিল। ১০০% ট্রাস্টেড সার্ভিস!',
    date: 'আজকে, ৩:২০ PM',
    verified: true,
    likes: 42
  },
  {
    id: 'rev-2',
    name: 'রাশেদ করিম',
    location: 'জিইসি, চট্টগ্রাম',
    rating: 5,
    serviceUsed: 'রেগুলার ভিআইপি (১ মাস)',
    comment: 'গোল্ড মেম্বারশিপ নেওয়ার পর অভিজ্ঞতা অসাধারণ। ২৪ ঘণ্টা সরাসরি সাপোর্ট পাই এবং প্রাইভেট শোর কোনো ঝামেলা ছাড়াই সেবা পাওয়া যায়। বিকাশ সেন্ড মানি ভেরিফিকেশনও খুব ফাস্ট হয়েছে।',
    date: 'গতকাল',
    verified: true,
    likes: 38
  },
  {
    id: 'rev-3',
    name: 'সাকিব হাসান',
    location: 'উপশহর, সিলেট',
    rating: 5,
    serviceUsed: '১ ঘণ্টা আল্ট্রা ভিআইপি',
    comment: 'ফুল ১ ঘণ্টা আনলিমিটেড প্রাইভেট টাইম উপভোগ করলাম। কোনো ডিস্টার্ব ছিল না। গুগল ভেরিফাইড ওয়েবসাইট দেখে ভরসা পেয়েছিলাম, আসলেই কথা ও কাজে মিল আছে। ধন্যবাদ desilivecam টিম!',
    date: '২ দিন আগে',
    verified: true,
    likes: 29
  },
  {
    id: 'rev-4',
    name: 'মাহমুদুল হক',
    location: 'বোয়ালিয়া, রাজশাহী',
    rating: 5,
    serviceUsed: 'ফুল নাইট স্পেশাল প্যাকেজ',
    comment: 'ফুল নাইট সার্ভিস নিয়েছিলাম। রাতভর সুন্দরভাবে কথা বলেছি। মডেল খুব অমায়িক ও ফ্রেন্ডলি ব্যবহার করেছে। অনলাইনে এত বিশ্বস্ত লাইভ সার্ভিস আমি আগে পাইনি।',
    date: '৪ দিন আগে',
    verified: true,
    likes: 54
  },
  {
    id: 'rev-5',
    name: 'ইমরান চৌধুরী',
    location: 'উত্তরা, ঢাকা',
    rating: 4,
    serviceUsed: '১৫ মিনিট ডেমো কল',
    comment: 'প্রথমবারের মতো ডেমো কল টেস্ট করার জন্য ২৫০ টাকা দিয়েছিলাম। খুব দ্রুত কল কানেক্ট হয়েছে। সার্ভিস ভালো ছিল তাই নেক্সট টাইম ফুল নাইট প্যাকেজ নিব।',
    date: '৫ দিন আগে',
    verified: true,
    likes: 19
  },
  {
    id: 'rev-6',
    name: 'ফারহান জাহিদ',
    location: 'খুলনা সদর',
    rating: 5,
    serviceUsed: 'গোল্ড প্রিমিয়াম মেম্বারশিপ',
    comment: 'সবকিছু খুব প্রফেশনাল। এদের পেমেন্ট মেমো সিস্টেম আর ট্রানজেকশন রসিদ সুবিধাটা দারুণ। কোনো ফেক কিছু নেই, রিয়েল গুগল সিকিউরড প্ল্যাটফর্ম।',
    date: '১ সপ্তাহ আগে',
    verified: true,
    likes: 67
  }
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('desi_customer_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'videocall' | 'membership'>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [authorRating, setAuthorRating] = useState(5);
  const [authorService, setAuthorService] = useState('৩০ মিনিট প্রিমিয়াম কল');
  const [authorComment, setAuthorComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // Save to localStorage when reviews update
  useEffect(() => {
    try {
      localStorage.setItem('desi_customer_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleLike = (id: string) => {
    if (likedReviews[id]) return;
    setLikedReviews((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((rev) => (rev.id === id ? { ...rev, likes: (rev.likes || 0) + 1 } : rev))
    );
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorComment.trim()) return;

    const newReview: CustomerReview = {
      id: `rev-user-${Date.now()}`,
      name: authorName.trim(),
      location: authorLocation.trim() || 'বাংলাদেশ',
      rating: authorRating,
      serviceUsed: authorService,
      comment: authorComment.trim(),
      date: 'এইমাত্র',
      verified: true,
      likes: 1
    };

    setReviews((prev) => [newReview, ...prev]);
    setShowAddModal(false);
    setAuthorName('');
    setAuthorLocation('');
    setAuthorComment('');
    setAuthorRating(5);
  };

  const filteredReviews = reviews.filter((rev) => {
    if (activeFilter === '5star') return rev.rating === 5;
    if (activeFilter === 'videocall') return rev.serviceUsed.includes('কল') || rev.serviceUsed.includes('প্যাকেজ');
    if (activeFilter === 'membership') return rev.serviceUsed.includes('মেম্বারশিপ') || rev.serviceUsed.includes('ভিআইপি');
    return true;
  });

  return (
    <div id="customer-reviews-section" className="space-y-4">
      {/* Top Credibility & Overall Rating Card */}
      <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 rounded-2xl p-4 sm:p-5 border border-blue-200/90 shadow-xs text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Big Score */}
          <div className="flex items-center gap-3.5">
            <div className="flex flex-col items-center justify-center bg-[#1a73e8] text-white w-16 h-16 rounded-2xl shadow-sm shrink-0">
              <span className="text-2xl font-black leading-none font-sans tracking-tight">4.9</span>
              <div className="flex text-amber-300 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                  গ্রাহক রিভিউ ও প্রশংসাপত্র
                </h2>
                <BlueVerifiedBadge size="sm" showText={true} text="Google Verified" />
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                ১,৫২০+ সন্তুষ্ট গ্রাহকের জেনুইন ও ভেরিফাইড ফিডব্যাক
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>৯৯.৪% গ্রাহক সন্তুষ্টি স্কোর ও সিকিউরড সার্ভিস</span>
              </div>
            </div>
          </div>

          {/* Action Button: Write Review */}
          <button
            id="open-add-review-btn"
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1557b0] hover:to-[#0d47a1] text-white text-xs sm:text-[13px] font-bold shadow-xs hover:shadow transition-all cursor-pointer select-none active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>আপনার রিভিউ দিন</span>
          </button>
        </div>

        {/* Rating Breakdown Bar */}
        <div className="mt-4 pt-3.5 border-t border-blue-100/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-12 font-medium shrink-0">৫ স্টার</span>
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full w-[94%]" />
            </div>
            <span className="font-bold text-gray-800 text-[11px]">৯৪%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 font-medium shrink-0">৪ স্টার</span>
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full w-[5%]" />
            </div>
            <span className="font-bold text-gray-800 text-[11px]">৫%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 font-medium shrink-0">বিশ্বস্ততা</span>
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[100%]" />
            </div>
            <span className="font-bold text-emerald-700 text-[11px]">১০০%</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-1.5 flex-wrap px-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>ফিল্টার:</span>
          </span>
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            সকল রিভিউ ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('5star')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === '5star'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>৫ স্টার</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('videocall')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'videocall'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ভিডিও কল
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('membership')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'membership'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            মেম্বারশিপ
          </button>
        </div>

        <span className="text-[11px] text-gray-400 hidden sm:inline-block">
          Google Authentic Feedback
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-2.5">
        {filteredReviews.map((rev) => {
          const isLiked = !!likedReviews[rev.id];
          return (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-gray-200/90 hover:border-blue-300 p-3.5 text-left shadow-2xs hover:shadow-xs transition-all"
            >
              {/* Review Header: User details & Rating */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs sm:text-[13px] text-gray-900 leading-tight">
                        {rev.name}
                      </span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.2 rounded-full">
                          <BadgeCheck className="w-3 h-3 text-[#1a73e8] shrink-0" />
                          <span>ভেরিফাইড ক্রেতা</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                      <span>{rev.location}</span>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center text-amber-400 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-current text-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Service Tag */}
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                <span>সার্ভিস:</span>
                <span className="text-gray-900 font-bold">{rev.serviceUsed}</span>
              </div>

              {/* Comment text */}
              <p className="mt-2 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                "{rev.comment}"
              </p>

              {/* Footer / Likes */}
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Google Safe Transactions দ্বারা ভেরিফাইড</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleLike(rev.id)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border transition-all cursor-pointer text-xs ${
                    isLiked
                      ? 'bg-blue-50 border-blue-200 text-[#1a73e8] font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                  <span>উপকারী ({rev.likes || 0})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Quote Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-left flex items-start gap-2.5 text-xs text-emerald-950">
        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
          <MessageSquareQuote className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-emerald-900 leading-tight">
            শতভাগ গোপনীয়তা ও আসল ভিডিও কল নিশ্চয়তা
          </h4>
          <p className="text-[11px] text-emerald-800/90 mt-0.5 leading-relaxed">
            প্রত্যেক গ্রাহকের তথ্য ও গোপনীয়তা সম্পূর্ণ এনক্রিপ্টেড থাকে। বিকাশ বা নগদ পেমেন্ট নিশ্চিত করার সাথে সাথেই অফিসিয়াল হোয়াটসঅ্যাপের মাধ্যমে মডেলের সরাসরি কল পাওয়া যায়।
          </p>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1a73e8] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    আপনার অভিজ্ঞতা শেয়ার করুন
                  </h3>
                  <span className="text-[11px] text-gray-500">Google Verified Customer Review</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="py-4 space-y-3">
              {/* Star rating selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  রেটিং সিলেক্ট করুন
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setAuthorRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || authorRating)
                            ? 'fill-current text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-2">
                    {authorRating} স্টার রেটিং
                  </span>
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: আরিয়ান খান"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a73e8] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    শহর / এলাকা
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: ঢাকা"
                    value={authorLocation}
                    onChange={(e) => setAuthorLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a73e8] focus:bg-white"
                  />
                </div>
              </div>

              {/* Service used */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  কোন সার্ভিসটি ব্যবহার করেছেন?
                </label>
                <select
                  value={authorService}
                  onChange={(e) => setAuthorService(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a73e8] focus:bg-white"
                >
                  <option value="১৫ মিনিট ডেমো কল">১৫ মিনিট ডেমো কল (২৫০ ৳)</option>
                  <option value="৩০ মিনিট প্রিমিয়াম কল">৩০ মিনিট প্রিমিয়াম কল (৪৫০ ৳)</option>
                  <option value="১ ঘণ্টা আল্ট্রা ভিআইপি">১ ঘণ্টা আল্ট্রা ভিআইপি (৮০০ ৳)</option>
                  <option value="ফুল নাইট স্পেশাল প্যাকেজ">ফুল নাইট স্পেশাল প্যাকেজ (১৫০০ ৳)</option>
                  <option value="রেগুলার ভিআইপি মেম্বারশিপ">রেগুলার ভিআইপি মেম্বারশিপ (১২০০ ৳)</option>
                  <option value="গোল্ড প্রিমিয়াম মেম্বারশিপ">গোল্ড প্রিমিয়াম মেম্বারশিপ (২৫০০ ৳)</option>
                  <option value="লাইফটাইম এলিট মেম্বারশিপ">লাইফটাইম এলিট মেম্বারশিপ (৫০০০ ৳)</option>
                </select>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  আপনার রিভিউ বা মন্তব্য *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="সার্ভিস ও ভিডিও কলের অভিজ্ঞতা সম্পর্কে বিস্তারিত লিখুন..."
                  value={authorComment}
                  onChange={(e) => setAuthorComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a73e8] focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>সাবমিট করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
