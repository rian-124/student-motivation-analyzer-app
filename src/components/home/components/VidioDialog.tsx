"use client";

import { PlayCircle } from "lucide-react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function VidioDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!bg-brand-accent w-10 h-10 text-xs font-normal text-white hover:!bg-brand-accent-hover cursor-pointer">
          <PlayCircle className="size-full !text-brand-secondary" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogTitle>Demo Vidio</DialogTitle>
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
