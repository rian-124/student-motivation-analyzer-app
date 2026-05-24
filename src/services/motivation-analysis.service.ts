import api from "@/lib/axios";
import type { WebResponse } from "@/lib/types/auth.type";
import type {
  CreateAnalysisPayload,
  MotivationAnalysis,
  MotivationAnalysisResponse,
} from "@/lib/types/motivation-analysis.type";

export type StudentGraphData = {
  stats: {
    latestStatus: string;
    activityCount: number;
    avgScore: number;
    growth: number;
  };
  weeklyTrend?: Array<{
    label: string;
    value: number;
  }>;
  benchmark?: Array<{
    subject: string;
    A: number;
    B: number;
    fullMark: number;
  }>;
};

export const motivationAnalysisService = {
  /** POST /analysis/upload */
  uploadAndAnalyze: async (
    payload: CreateAnalysisPayload,
  ): Promise<MotivationAnalysis> => {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append("studentId", payload.studentId);
    if (payload.description) {
      formData.append("description", payload.description);
    }

    const response = await api.post<WebResponse<MotivationAnalysis>>(
      "/analysis/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data.data;
  },

  /** GET /analysis/student/:studentId */
  findByStudent: async (studentId: string): Promise<MotivationAnalysis[]> => {
    const response = await api.get<WebResponse<MotivationAnalysis[]>>(
      `/analysis/student/${studentId}`,
    );
    return response.data.data;
  },

  /** GET /analysis/class/:classId */
  findByClass: async (classId: string): Promise<MotivationAnalysis[]> => {
    const response = await api.get<WebResponse<MotivationAnalysis[]>>(
      `/analysis/class/${classId}`,
    );
    return response.data.data;
  },

  /** GET /analysis/graph/student/:studentId */
  getStudentGraphData: async (studentId: string): Promise<StudentGraphData> => {
    const response = await api.get<WebResponse<StudentGraphData>>(
      `/analysis/graph/student/${studentId}`,
    );
    return response.data.data;
  },

  /** GET /analysis?page=&limit= */
  findAll: async (
    page = 1,
    limit = 10,
  ): Promise<MotivationAnalysisResponse> => {
    const response = await api.get<WebResponse<MotivationAnalysis[]>>(
      `/analysis?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? { total: 0, page, limit: limit },
    };
  },

  /** GET /analysis/:id */
  findOne: async (id: string): Promise<MotivationAnalysis> => {
    const response = await api.get<WebResponse<MotivationAnalysis>>(
      `/analysis/${id}`,
    );
    return response.data.data;
  },
};
