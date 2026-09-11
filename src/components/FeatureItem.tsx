import { FeatureItemData } from '../types.ts';

interface FeatureItemProps {
  key?: string;
  feature: FeatureItemData;
  index: number;
}

export function FeatureItem({ feature, index }: FeatureItemProps) {
  return (
    <div
      id={feature.id}
      className="flex items-center p-3.5 mb-3 bg-[#f8f9fa] border-l-4 border-[#007bff] rounded-r-md transition-all duration-200 hover:bg-[#f0f4f8] hover:translate-x-1"
    >
      <span className="mr-3 text-lg leading-none shrink-0" aria-hidden="true">
        {feature.icon}
      </span>
      <span className="text-[15px] sm:text-base font-medium text-[#2d3748] tracking-tight">
        {feature.text}
      </span>
    </div>
  );
}
