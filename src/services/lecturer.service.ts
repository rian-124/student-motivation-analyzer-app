import api from "@/lib/axios";
import type {
  CreateLecturerPayload,
  Lecturer,
  LecturerResponse,
  UpdateLecturerPayload,
} from "@/lib/types/lecturer.type";

import type { WebResponse } from "@/lib/types/auth.type";

export const lecturerService = {
  /** GET /lecturers?page=&limit= → { data: Lecturer[], meta: {...} } */
  findAll: async (page = 1, limit = 10): Promise<LecturerResponse> => {
    const response = await api.get<WebResponse<Lecturer[]>>(
      `/lecturers?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      meta: response.data.meta ?? { total: 0, page, limit: limit },
    };
  },

  /** GET /lecturers/:id */
  findOne: async (id: string): Promise<Lecturer> => {
    const response = await api.get<WebResponse<Lecturer>>(`/lecturers/${id}`);
    return response.data.data;
  },

  /** POST /lecturers */
  create: async (payload: CreateLecturerPayload): Promise<Lecturer> => {
    const response = await api.post<WebResponse<Lecturer>>(
      "/lecturers",
      payload,
    );
    return response.data.data;
  },

  /** PUT /lecturers/:id */
  update: async (
    id: string,
    payload: UpdateLecturerPayload,
  ): Promise<Lecturer> => {
    const response = await api.put<WebResponse<Lecturer>>(
      `/lecturers/${id}`,
      payload,
    );
    return response.data.data;
  },

  /** DELETE /lecturers/:id */
  remove: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<WebResponse<{ message: string }>>(
      `/lecturers/${id}`,
    );
    return response.data.data;
  },
};
