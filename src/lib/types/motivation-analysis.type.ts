import type { Student } from "./student.type";

export interface MotivationAnalysis {
  id: string;
  studentId: string;
  description?: string;
  transcription: string;
  prediction: string;
  predictionCode?: string;
  confidence: number;
  confidencePercent?: number;
  probabilities: {
    code: string;
    label: string;
    value: number;
    percentage: number;
  }[];
  result?: {
    code: string;
    label: string;
    confidence: number;
    confidencePercent: number;
    probabilities: {
      code: string;
      label: string;
      value: number;
      percentage: number;
    }[];
  };
  acoustic?: {
    mfcc?: number[] | number[][];
    metrics: {
      energy: number;
      speed: number;
      pitch: number;
      fluency: number;
      articulation: number;
    };
  };
  mfcc?: number[] | number[][];
  metrics?: {
    energy: number;
    speed: number;
    pitch: number;
    fluency: number;
    articulation: number;
  };
  createdAt: string;
  updatedAt: string;
  student?: Student & {
    className?: string | null;
    studyProgramName?: string | null;
    lecturerName?: string | null;
  };
}

export interface MotivationAnalysisResponse {
  data: MotivationAnalysis[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateAnalysisPayload {
  file: File;
  studentId: string;
  description?: string;
}
