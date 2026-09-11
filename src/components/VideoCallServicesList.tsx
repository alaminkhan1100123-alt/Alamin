import { Camera, EyeOff, Award, Video, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VideoCallServiceItem } from '../types.ts';
import { BlueVerifiedBadge } from './BlueVerifiedBadge.tsx';

interface VideoCallServicesListProps {
  services: VideoCallServiceItem[];
  selectedServiceId: string | null;
  onSelectService: (service: VideoCallServiceItem) => void;
}

export function VideoCallServicesList({
  services,
  selectedServiceId,
  onSelectService,
}: VideoCallServicesListProps) {
  const getIcon = (type: VideoCallServiceItem['iconType']) => {
    switch (type) {
      case 'camera':
        return <Camera className="w-5 h-5 text-blue-600" />;
      case 'eye-off':
        return <EyeOff className="w-5 h-5 text-purple-600" />;
      case 'award':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-emerald-600" />;
      default:
        return <Video className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div id="video-call-services-section" className="space-y-3 mb-5">
      {/* Authentic Guarantee Banner with Blue Verified */}
      <div
        id="authentic-guarantee-badge"
        className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-lg px-3.5 py-2 text-emerald-800"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              100% Real & Authentic Service
            </span>
            <BlueVerifiedBadge size="sm" />
          </div>
        </div>
        <span className="text-[11px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
          ১০০% রিয়েল
        </span>
      </div>

      {/* Services List */}
      <div className="space-y-2.5">
        {services.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service.id}
              id={service.id}
              onClick={() => onSelectService(service)}
              className={`relative flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-[#007bff] bg-blue-50/50 shadow-sm ring-1 ring-[#007bff]/30'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white shadow-xs' : 'bg-gray-100'
                  }`}
                >
                  {getIcon(service.iconType)}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                      {service.name}
                    </h3>
                    <BlueVerifiedBadge size="sm" />
                    {service.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    {service.nameBn}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 pl-2">
                <div className="text-base sm:text-lg font-black text-[#0d47a1] tracking-tight">
                  {service.price}/-
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {service.price.toLocaleString('bn-BD')} টাকা
                </div>
              </div>

              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 bg-[#007bff] text-white rounded-full p-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-center text-gray-500 italic pt-1">
        * পছন্দের সার্ভিস বেছে নিয়ে নিচের বিকাশ নম্বরে পেমেন্ট করুন অথবা সরাসরি হোয়াটসঅ্যাপে নক করুন
      </p>
    </div>
  );
}
