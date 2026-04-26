import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface CardFeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
}

export default function CardFeature({
  title,
  description,
  imageSrc,
  className,
}: CardFeatureProps) {
  return (
    <Card
      className={`group relative overflow-hidden rounded-3xl p-8 border border-white/20 bg-white/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 flex flex-col gap-6 ${className}`}
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

      <CardHeader className="p-0 relative flex justify-start items-start">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/20 border border-brand/10 flex items-center justify-center p-4 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </CardHeader>

      <div className="space-y-3">
        <CardTitle className="text-brand-secondary font-black text-xl tracking-tight leading-tight group-hover:text-brand transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-brand-secondary/60 text-sm font-medium leading-relaxed">
          {description}
        </CardDescription>
      </div>
    </Card>
  );
}
