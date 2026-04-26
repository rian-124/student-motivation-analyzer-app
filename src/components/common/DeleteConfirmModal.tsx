"use client"

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
import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteConfirmModalProps {
  title: string;
  description: string;
  onConfirm?: () => void;
  children: React.ReactNode;
}

export function DeleteConfirmModal({ title, description, onConfirm, children }: DeleteConfirmModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <div className="p-8 pb-4 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
          </div>
          
          <DialogHeader className="p-0 space-y-2">
            <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">{title}</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs leading-relaxed px-2">
              {description} Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="p-6 pt-2 grid grid-cols-2 gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl text-xs font-bold text-slate-400 h-10 w-full hover:bg-slate-50">
            Batal
          </Button>
          <Button 
            variant="destructive"
            className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-10 text-xs font-bold shadow-md shadow-rose-600/20 transition-all active:scale-95 w-full"
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            <Trash2 className="w-3.5 h-3.5 mr-2" />
            Hapus Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
