"use client";
 
 import PageHeader from "@/components/common/PageHeader";
 import UploadZoneSection from "../section/UploadZoneSection";
 import UploadGuideSection from "../section/UploadGuideSection";
 import TopStatsSection from "@/features/analysis-result/section/TopStatsSection";
 import AnalysisGridSection from "@/features/analysis-result/section/AnalysisGridSection";
 import { useState } from "react";
 import { MotivationAnalysis } from "@/lib/types/motivation-analysis.type";
 import { Button } from "@/components/ui/button";
 import { RefreshCw } from "lucide-react";
 
 export default function UploadRecordingPage() {
   const [result, setResult] = useState<MotivationAnalysis | null>(null);
 
   return (
     <section className="p-6 lg:p-10 space-y-8 w-full min-h-screen bg-slate-50/30 dark:bg-slate-950">
       <div className="max-w-5xl mx-auto space-y-8">
         <PageHeader
           title="Upload Rekaman Suara"
           description="Analisis fitur akustik (MFCC) dan teks (STT) untuk menentukan tingkat motivasi siswa."
         />
 
         <div className="space-y-8">
           {!result ? (
             <>
               <UploadZoneSection onSuccess={setResult} />
               <UploadGuideSection />
             </>
           ) : (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div>
                   <h3 className="font-bold text-slate-800 dark:text-white">Hasil Analisis Terbaru</h3>
                   <p className="text-xs text-slate-500">Berhasil diproses pada {new Date(result.createdAt).toLocaleTimeString()}</p>
                 </div>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={() => setResult(null)}
                   className="rounded-lg border-brand/20 text-brand hover:bg-brand/5"
                 >
                   <RefreshCw className="w-3.5 h-3.5 mr-2" />
                   Upload Lagi
                 </Button>
               </div>
               
               <TopStatsSection data={result} />
               <AnalysisGridSection data={result} />
             </div>
           )}
         </div>
       </div>
     </section>
   );
 }