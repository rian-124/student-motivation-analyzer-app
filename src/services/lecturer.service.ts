import api from '@/lib/axios';
import {
  Lecturer,
  LecturerResponse,
  CreateLecturerPayload,
  UpdateLecturerPayload,
} from '@/lib/types/lecturer.type';

/**
 * Struktur envelope dari TransformInterceptor NestJS:
 * { statusCode, message, data: T, meta?: {...} }
 *
 * Untuk findAll: data = Lecturer[], meta = { total, page, lastPage }
 * Untuk findOne / create / update: data = Lecturer
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

export const lecturerService = {
  /** GET /lecturers?page=&limit= → { data: Lecturer[], meta: {...} } */
  findAll: async (page: number = 1, limit: number = 10): Promise<LecturerResponse> => {
    const response = await api.get<ApiEnvelope<Lecturer[]>>(
      `/lecturers?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      meta: response.data.meta ?? { total: 0, page, lastPage: 1 },
    };
  },

  /** GET /lecturers/:id */
  findOne: async (id: string): Promise<Lecturer> => {
    const response = await api.get<ApiEnvelope<Lecturer>>(`/lecturers/${id}`);
    return response.data.data;
  },

  /** POST /lecturers */
  create: async (payload: CreateLecturerPayload): Promise<Lecturer> => {
    const response = await api.post<ApiEnvelope<Lecturer>>('/lecturers', payload);
    return response.data.data;
  },

  /** PUT /lecturers/:id */
  update: async (id: string, payload: UpdateLecturerPayload): Promise<Lecturer> => {
    const response = await api.put<ApiEnvelope<Lecturer>>(`/lecturers/${id}`, payload);
    return response.data.data;
  },

  /** DELETE /lecturers/:id */
  remove: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<ApiEnvelope<{ message: string }>>(`/lecturers/${id}`);
    return response.data.data;
  },
};
