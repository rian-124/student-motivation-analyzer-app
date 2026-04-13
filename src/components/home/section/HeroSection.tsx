import { Button } from "@/components/ui/button";
import Link from "next/link";
import VidioDialog from "../components/VidioDialog";
import { FileAudio, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex justify-between items-center py-12 pl-12 pr-4 rounded-md bg-gray-50">
      <div className="flex flex-col gap-3 w-full">
        <div className="text-6xl font-bold">
          <h1 className="text-brand-secondary">Student Motivation</h1>
          <h1 className="text-brand">Analyzer</h1>
        </div>
        <div>
          <p className="text-gray-400 max-w-md">
            Analyze student motivation using AI-powered text and voice
            processing.
          </p>
        </div>
        <div className="flex gap-5">
          <Button
            asChild
            className="md:inline-flex lg:inline-flex bg-brand! p-5 font-normal text-xs hover:bg-brand-hover!"
          >
            <Link href={"/sign-up"}>Start Analyze</Link>
          </Button>
          <VidioDialog />
        </div>
      </div>
      <div className="relative w-1/2 h-[20rem]">
        <div className="w-10 h-10 absolute left-[-60px] top-10 z-10 flex flex-col gap-3">
          <div className="w-[7.5rem] p-1 rounded-2xl flex items-center gap-2 shadow-[0_16px_40px_rgba(16,21,102,0.12)]">
            <div className="rounded-full bg-amber-400 w-10 h-10 p-3">
              <Sparkles className="size-full text-white" />
            </div>
            <div className="text-xs text-gray-500">
              <h1>AI</h1>
              <h2 className="font-bold text-brand-secondary">Motivation</h2>
            </div>
          </div>
          <div className="w-[7.5rem] ml-7 p-1 rounded-2xl flex items-center gap-2 shadow-[0_16px_40px_rgba(16,21,102,0.12)]">
            <div className="rounded-full bg-red-500 w-10 h-10 p-3">
              <FileAudio className="size-full text-white" />
            </div>
            <div className="text-xs text-gray-500">
              <h1 className="font-bold text-brand-secondary">Audio</h1>
              <h2>Analysis</h2>
            </div>
          </div>
        </div>
        <div className="absolute z-0 top-7 right-0 flex justify-end">
          <div className="relative">
            <div className="absolute w-[24rem] -top-16 -left-15">
              <Image
                src="/person.svg"
                alt="Student portrait"
                width={320}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="w-[14rem]">
              <Image
                src="/Retangle2.svg"
                alt="retangle"
                width={320}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-10 h-10 absolute right-40 -bottom-10 z-10 flex flex-col gap-3">
          <div className="w-[7.5rem] p-1 rounded-2xl flex items-center gap-2 border border-gray-200 shadow-2xl">
            <div className="rounded-full bg-amber-400 w-10 h-10 p-3">
              <Sparkles className="size-full text-white" />
            </div>
            <div className="text-xs text-gray-500">
              <h1>AI</h1>
              <h2 className="font-bold text-brand-secondary">Motivation</h2>
            </div>
          </div>
          <div className="w-[7.5rem] ml-7 p-1 rounded-2xl flex items-center gap-2 border border-gray-200 shadow-2xl">
            <div className="rounded-full bg-red-500 w-10 h-10 p-3">
              <FileAudio className="size-full text-white" />
            </div>
            <div className="text-xs text-gray-500">
              <h1 className="font-bold text-brand-secondary">Audio</h1>
              <h2>Analysis</h2>
            </div>
          </div>
        </div>
        <div className="absolute z-0 -bottom-40 -left-20 flex justify-end">
          <div className="relative">
            <div className="absolute w-[17rem] -top-14 -left-0">
              <Image
                src="/person2.svg"
                alt="Student portrait"
                width={320}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="w-[14rem]">
              <Image
                src="/Retangle.svg"
                alt="retangle"
                width={320}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
