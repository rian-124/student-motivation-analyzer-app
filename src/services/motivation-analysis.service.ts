import api from '@/lib/axios';
import {
  MotivationAnalysis,
  MotivationAnalysisResponse,
  CreateAnalysisPayload,
} from '@/lib/types/motivation-analysis.type';
import { WebResponse } from '@/lib/types/auth.type';

export const motivationAnalysisService = {
  /** POST /motivation-analysis/upload */
  uploadAndAnalyze: async (payload: CreateAnalysisPayload): Promise<MotivationAnalysis> => {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('studentId', payload.studentId);
    if (payload.description) {
      formData.append('description', payload.description);
    }

    const response = await api.post<WebResponse<MotivationAnalysis>>(
      '/motivation-analysis/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data.data;
  },

  /** GET /motivation-analysis/student/:studentId */
  findByStudent: async (studentId: string): Promise<MotivationAnalysis[]> => {
    const response = await api.get<WebResponse<MotivationAnalysis[]>>(
      `/motivation-analysis/student/${studentId}`,
    );
    return response.data.data;
  },

  /** GET /motivation-analysis/graph/student/:studentId */
  getStudentGraphData: async (studentId: string): Promise<any> => {
    const response = await api.get<WebResponse<any>>(
      `/motivation-analysis/graph/student/${studentId}`,
    );
    return response.data.data;
  },

  /** GET /motivation-analysis?page=&limit= */
  findAll: async (page: number = 1, limit: number = 10): Promise<MotivationAnalysisResponse> => {
    // Response struktur: { statusCode, message, data: { data: [], meta: {} } }
    // meta ada di dalam data, bukan di root envelope
    const response = await api.get<WebResponse<MotivationAnalysisResponse>>(
      `/motivation-analysis?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data.data ?? [],
      meta: response.data.data.meta ?? { total: 0, page, lastPage: 1 },
    };
  },

  /** GET /motivation-analysis/:id */
  findOne: async (id: string): Promise<MotivationAnalysis> => {
    const response = await api.get<WebResponse<MotivationAnalysis>>(
      `/motivation-analysis/${id}`,
    );
    return response.data.data;
  },
};
