import api from '@/lib/axios';
import { 
  MotivationAnalysis, 
  MotivationAnalysisResponse, 
  CreateAnalysisPayload 
} from '@/lib/types/motivation-analysis.type';
import { WebResponse } from '@/lib/types/auth.type';

export const motivationAnalysisService = {
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
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  findByStudent: async (studentId: string): Promise<MotivationAnalysis[]> => {
    const response = await api.get<WebResponse<MotivationAnalysis[]>>(
      `/motivation-analysis/student/${studentId}`
    );
    return response.data.data;
  },

  getStudentGraphData: async (studentId: string): Promise<any> => {
    const response = await api.get<WebResponse<any>>(`/motivation-analysis/graph/student/${studentId}`);
    return response.data.data;
  },

  findAll: async (page: number = 1, limit: number = 10): Promise<MotivationAnalysisResponse> => {
    const response = await api.get<WebResponse<MotivationAnalysisResponse>>(
      `/motivation-analysis?page=${page}&limit=${limit}`
    );
    return response.data.data;
  },

  findOne: async (id: string): Promise<MotivationAnalysis> => {
    const response = await api.get<WebResponse<MotivationAnalysis>>(
      `/motivation-analysis/${id}`
    );
    return response.data.data;
  },
};
