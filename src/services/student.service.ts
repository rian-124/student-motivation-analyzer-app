import api from '@/lib/axios';
import {
  Student,
  StudentResponse,
  CreateStudentPayload,
  UpdateStudentPayload,
} from '@/lib/types/student.type';

/**
 * Struktur envelope dari TransformInterceptor NestJS:
 * { statusCode, message, data: T, meta?: {...} }
 *
 * Untuk findAll: data = Student[], meta = { total, page, lastPage }
 * Untuk findOne / create / update: data = Student
 */
type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    lastPage: number;
  };
};

export const studentService = {
  /** GET /students?page=&limit= → { data: Student[], meta: {...} } */
  findAll: async (page: number = 1, limit: number = 10): Promise<StudentResponse> => {
    const response = await api.get<ApiEnvelope<Student[]>>(
      `/students?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      meta: response.data.meta ?? { total: 0, page, lastPage: 1 },
    };
  },

  /** GET /students/:id */
  findOne: async (id: string): Promise<Student> => {
    const response = await api.get<ApiEnvelope<Student>>(`/students/${id}`);
    return response.data.data;
  },

  /** POST /students */
  create: async (payload: CreateStudentPayload): Promise<Student> => {
    const response = await api.post<ApiEnvelope<Student>>('/students', payload);
    return response.data.data;
  },

  /** PUT /students/:id */
  update: async (id: string, payload: UpdateStudentPayload): Promise<Student> => {
    const response = await api.put<ApiEnvelope<Student>>(`/students/${id}`, payload);
    return response.data.data;
  },

  /** DELETE /students/:id */
  remove: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<ApiEnvelope<{ message: string }>>(`/students/${id}`);
    return response.data.data;
  },
};
