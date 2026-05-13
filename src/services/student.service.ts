import api from '@/lib/axios';
import { 
  Student, 
  StudentResponse, 
  CreateStudentPayload, 
  UpdateStudentPayload 
} from '@/lib/types/student.type';

export const studentService = {
  findAll: async (page: number = 1, limit: number = 10): Promise<StudentResponse> => {
    const response = await api.get<any>(`/students?page=${page}&limit=${limit}`);
    return {
      data: response.data.data,
      meta: response.data.meta
    };
  },

  findOne: async (id: string): Promise<Student> => {
    const response = await api.get<{ data: Student }>(`/students/${id}`);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  create: async (payload: CreateStudentPayload): Promise<Student> => {
    const response = await api.post<{ data: Student }>('/students', payload);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  update: async (id: string, payload: UpdateStudentPayload): Promise<Student> => {
    const response = await api.put<{ data: Student }>(`/students/${id}`, payload);
    return response.data.data; // Unwrapping from TransformInterceptor
  },

  remove: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ data: { message: string } }>(`/students/${id}`);
    return response.data.data; // Unwrapping from TransformInterceptor
  },
};
