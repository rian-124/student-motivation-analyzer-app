import type { Student } from "./student.type";

export interface MotivationAnalysis {
  id: string;
  studentId: string;
  description?: string;
  transcription: string;
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
  mfcc?: number[][];
  metrics?: {
    energy: number;
    speed: number;
    pitch: number;
    fluency: number;
    articulation: number;
  };
  createdAt: string;
  updatedAt: string;
  student?: Student;
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
