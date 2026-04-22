import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-brand-secondary">{title}</h1>
        <p className="text-sm text-brand-secondary/70">{description}</p>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
