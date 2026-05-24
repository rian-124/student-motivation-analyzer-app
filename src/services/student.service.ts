import api from "@/lib/axios";
import type { WebResponse } from "@/lib/types/auth.type";
import type {
  CreateStudentPayload,
  Student,
  StudentResponse,
  UpdateStudentPayload,
} from "@/lib/types/student.type";

export const studentService = {
  /** GET /students?page=&limit= → { data: Student[], meta: {...} } */
  findAll: async (page = 1, limit = 10): Promise<StudentResponse> => {
    const response = await api.get<WebResponse<Student[]>>(
      `/students?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      meta: response.data.meta ?? { total: 0, page, limit },
    };
  },

  /** GET /students/:id */
  findOne: async (id: string): Promise<Student> => {
    const response = await api.get<WebResponse<Student>>(`/students/${id}`);
    return response.data.data;
  },

  /** POST /students */
  create: async (payload: CreateStudentPayload): Promise<Student> => {
    const response = await api.post<WebResponse<Student>>("/students", payload);
    return response.data.data;
  },

  /** PUT /students/:id */
  update: async (
    id: string,
    payload: UpdateStudentPayload,
  ): Promise<Student> => {
    const response = await api.put<WebResponse<Student>>(
      `/students/${id}`,
      payload,
    );
    return response.data.data;
  },

  /** DELETE /students/:id */
  remove: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<WebResponse<{ message: string }>>(
      `/students/${id}`,
    );
    return response.data.data;
  },
};
