import { MembershipPackageData, VideoCallServiceItem } from '../types.ts';

export const videoCallServices: VideoCallServiceItem[] = [
  {
    id: 'vc-face-cam',
    name: 'Face cam',
    nameBn: 'ফেস ক্যাম (Face Cam)',
    price: 1550,
    badge: 'জনপ্রিয়',
    description: 'ফুল ফেস লাইভ ভিডিও কল সার্ভিস',
    iconType: 'camera',
  },
  {
    id: 'vc-non-face',
    name: 'Non face',
    nameBn: 'নন ফেস (Non Face)',
    price: 1250,
    description: 'প্রাইভেট নন-ফেস লাইভ ভিডিও কল',
    iconType: 'eye-off',
  },
  {
    id: 'vc-org-face',
    name: 'Face organization Face',
    nameBn: 'ফেস অর্গানাইজেশন ফেস (Org Face)',
    price: 3060,
    badge: 'স্পেশাল প্যাকেজ',
    description: 'ফুল অর্গানাইজেশন ফেস-টু-ফেস প্রিমিয়াম সেশন',
    iconType: 'award',
    popular: true,
  },
  {
    id: 'vc-org-non-face',
    name: 'Face organization non face',
    nameBn: 'ফেস অর্গানাইজেশন নন-ফেস (Org Non-Face)',
    price: 1850,
    description: 'অর্গানাইজেশন নন-ফেস এক্সক্লুসিভ সেশন',
    iconType: 'video',
  },
];

export const membershipData: MembershipPackageData = {
  title: 'মেম্বারশিপ প্যাকেজ',
  subtitle: 'সকল প্রিমিয়াম সুবিধার পূর্ণাঙ্গ বিবরণ ও সহজ পেমেন্ট পদ্ধতি',
  rateAmount: 8500,
  currency: 'টাকা',
  features: [
    {
      id: 'feature-calls',
      icon: '🎙️',
      text: '৩০ টা কল সার্ভিস বিনামূল্যে',
    },
    {
      id: 'feature-groups',
      icon: '✅',
      text: '৪ টি premium group life time',
    },
    {
      id: 'feature-chat',
      icon: '✅',
      text: '24 Hours Girls Private Chat Box',
    },
    {
      id: 'feature-livestream',
      icon: '🔴',
      text: 'LIVESTREAM LONG',
    },
    {
      id: 'feature-availability',
      icon: '⚡',
      text: '24 Hours Available',
    },
  ],
  payment: {
    method: 'bKash',
    accountType: 'Personal',
    number: '01706412074',
    minLimit: 500,
    maxLimit: 25000,
    currency: 'টাকা',
    supportedPlatforms: ['bKash', 'WhatsApp', 'IMO', 'Telegram'],
  },
  contact: {
    websiteUrl: 'http://www.desilivecam.com',
    websiteLabel: 'www.desilivecam.com',
    whatsappNumber: '01706412074',
    whatsappUrl: 'https://wa.me/8801706412074',
    imoNumber: '01706412074',
    telegramAccounts: [
      {
        handle: '@Aanika_tasnim_07',
        url: 'https://t.me/Aanika_tasnim_07',
      },
      {
        handle: '@Pservicebd',
        url: 'https://t.me/Pservicebd',
      },
    ],
  },
};

