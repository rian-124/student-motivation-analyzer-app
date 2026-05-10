import api from '@/lib/axios';
import { 
  Lecturer, 
  LecturerResponse, 
  CreateLecturerPayload, 
  UpdateLecturerPayload 
} from '@/lib/types/lecturer.type';

export const lecturerService = {
  findAll: async (page: number = 1, limit: number = 10): Promise<LecturerResponse> => {
    const response = await api.get<{ data: LecturerResponse }>(`/lecturers?page=${page}&limit=${limit}`);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  findOne: async (id: string): Promise<Lecturer> => {
    const response = await api.get<{ data: Lecturer }>(`/lecturers/${id}`);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  create: async (payload: CreateLecturerPayload): Promise<Lecturer> => {
    const response = await api.post<{ data: Lecturer }>('/lecturers', payload);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  update: async (id: string, payload: UpdateLecturerPayload): Promise<Lecturer> => {
    const response = await api.put<{ data: Lecturer }>(`/lecturers/${id}`, payload);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  remove: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ data: { message: string } }>(`/lecturers/${id}`);
    return response.data.data; // Unwrapping from TransformInterceptor
  },
};
