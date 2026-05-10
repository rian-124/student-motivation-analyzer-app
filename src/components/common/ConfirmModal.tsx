"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle } from "lucide-react";
import { useState } from "react";

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "brand";
  icon?: "info" | "warning";
  onConfirm: () => void;
  children: React.ReactNode;
}

export function ConfirmModal({
  title,
  description,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  variant = "brand",
  icon = "info",
  onConfirm,
  children,
}: ConfirmModalProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200";
      case "brand":
        return "bg-brand hover:bg-brand-hover text-white shadow-brand/20";
      default:
        return "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[380px] rounded-2xl border-none shadow-2xl p-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-2 flex flex-col items-center text-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
            variant === 'destructive' ? 'bg-rose-50 text-rose-600' : 'bg-brand/10 text-brand'
          }`}>
            {icon === "warning" ? <AlertCircle className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
          </div>
          <DialogTitle className="text-xl font-black text-slate-800 leading-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm mt-2 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-6 pt-2 flex flex-col sm:flex-row gap-2 border-none">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-xl text-xs font-bold text-slate-400 h-11 hover:bg-slate-50"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`flex-1 rounded-xl px-6 h-11 text-xs font-bold shadow-lg transition-all active:scale-95 ${getVariantStyles()}`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
