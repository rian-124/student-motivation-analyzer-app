import api from "@/lib/axios";
import type { WebResponse } from "@/lib/types/auth.type";
import type {
  Class,
  ClassLeaderboardData,
  ClassResponse,
} from "@/lib/types/class.type";
import type { Student } from "@/lib/types/student.type";

export const classesService = {
  /** GET /classes */
  findAll: async (): Promise<ClassResponse> => {
    const response = await api.get<WebResponse<Class[]>>("/classes");
    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? { total: 0, page: 1, limit: 10 },
    };
  },

  /** GET /classes/:id */
  findOne: async (id: string): Promise<Class> => {
    const response = await api.get<WebResponse<Class>>(`/classes/${id}`);
    return response.data.data;
  },

  /** GET /classes/:id/students */
  getStudents: async (id: string): Promise<Student[]> => {
    const response = await api.get<WebResponse<Student[]>>(
      `/classes/${id}/students`,
    );
    return response.data.data;
  },

  /** GET /classes/:id/leaderboard */
  getLeaderboard: async (id: string): Promise<ClassLeaderboardData> => {
    const response = await api.get<WebResponse<ClassLeaderboardData>>(
      `/classes/${id}/leaderboard`,
    );
    return response.data.data;
  },
};
