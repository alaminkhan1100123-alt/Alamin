export interface FeatureItemData {
  id: string;
  icon: string;
  text: string;
  highlight?: boolean;
}

export interface VideoCallServiceItem {
  id: string;
  name: string;
  nameBn?: string;
  price: number;
  popular?: boolean;
  description?: string;
  badge?: string;
  iconType: 'camera' | 'eye-off' | 'award' | 'video';
}

export interface PaymentDetails {
  method: string;
  accountType: string;
  number: string;
  minLimit: number;
  maxLimit: number;
  currency: string;
  supportedPlatforms: string[];
}

export interface TelegramContact {
  handle: string;
  url: string;
}

export interface ContactInfo {
  websiteUrl: string;
  websiteLabel: string;
  telegramAccounts: TelegramContact[];
  whatsappNumber: string;
  whatsappUrl: string;
  imoNumber: string;
}

export interface TransactionRecord {
  id: string;
  senderNumber: string;
  trxId: string;
  amount: number;
  serviceName: string;
  timestamp: string;
  status: 'verified' | 'pending' | 'reviewed';
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number; // 1 to 5
  serviceUsed: string;
  comment: string;
  date: string;
  verified: boolean;
  likes?: number;
}

export interface MembershipPackageData {
  title: string;
  subtitle: string;
  rateAmount: number;
  currency: string;
  features: FeatureItemData[];
  payment: PaymentDetails;
  contact: ContactInfo;
}
