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
      className={`rounded-xl p-6 shadow bg-brand/10 flex flex-col gap-5 ${className}`}
    >
      <CardHeader className="relative flex justify-center items-center">
        <div className="w-40 h-40 rounded-full bg-brand/15 overflow-hidden flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain p-3"
          />
        </div>
      </CardHeader>
      <CardTitle className="text-brand-secondary font-semibold text-[1rem]">
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}
