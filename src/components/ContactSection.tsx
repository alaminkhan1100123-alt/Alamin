import { ExternalLink, Globe, Send, MessageCircle } from 'lucide-react';
import { ContactInfo } from '../types.ts';
import { BlueVerifiedBadge } from './BlueVerifiedBadge.tsx';

interface ContactSectionProps {
  contact: ContactInfo;
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <div
      id="contact-info-section"
      className="text-center text-sm sm:text-[15px] text-gray-600 leading-relaxed pt-2 border-t border-gray-100"
    >
      <p className="font-semibold text-gray-800 mb-1.5 flex items-center justify-center gap-1.5">
        <span>গুগল ভেরিফাইড অফিসিয়াল ওয়েবসাইট</span>
        <BlueVerifiedBadge size="sm" />
      </p>

      <div className="flex justify-center mb-3">
        <a
          id="website-external-link"
          href={contact.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-[#1a73e8] hover:text-[#1557b0] hover:underline transition-all py-2 px-4 rounded-xl bg-blue-50/80 border border-blue-200 hover:bg-blue-100 shadow-xs text-sm sm:text-base font-mono"
        >
          <Globe className="w-4 h-4 text-[#1a73e8]" />
          <span>{contact.websiteLabel}</span>
          <BlueVerifiedBadge size="sm" text="Verified" showText={true} />
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
        </a>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-gray-700 mt-2">
        <span className="font-semibold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <span>সরাসরি যোগাযোগ করুন</span>
          <BlueVerifiedBadge size="sm" />
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* WhatsApp Direct */}
          <a
            id="whatsapp-contact-link"
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors py-1.5 px-3 rounded-full bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/80 shadow-2xs text-xs sm:text-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp: {contact.whatsappNumber}</span>
            <BlueVerifiedBadge size="sm" />
            <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
          </a>

          {/* Telegram accounts */}
          {contact.telegramAccounts.map((account, index) => (
            <a
              key={account.handle}
              id={`telegram-inbox-link-${index + 1}`}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#0088cc] hover:text-[#006699] hover:underline transition-colors py-1.5 px-3 rounded-full bg-sky-50 border border-sky-100 hover:bg-sky-100/80 shadow-2xs text-xs sm:text-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#0088cc]" />
              <span>{account.handle}</span>
              <BlueVerifiedBadge size="sm" />
              <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
            </a>
          ))}
        </div>

        {/* Standalone HTML File Link */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-center">
          <a
            id="standalone-html-file-link"
            href="/desilivecam.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 border border-gray-200 px-3 py-1 rounded-lg transition-colors font-mono font-medium"
          >
            <span>📄 Standalone HTML Version (desilivecam.html)</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
