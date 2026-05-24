import api from "@/lib/axios";
import type { WebResponse } from "@/lib/types/auth.type";
import type { Program, ProgramResponse } from "@/lib/types/program.type";

export const programsService = {
  /** GET /programs */
  findAll: async (): Promise<ProgramResponse> => {
    const response = await api.get<WebResponse<Program[]>>("/programs");
    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? { total: 0, page: 1, limit: 10 },
    };
  },

  /** GET /programs/:id */
  findOne: async (id: string): Promise<Program> => {
    const response = await api.get<WebResponse<Program>>(`/programs/${id}`);
    return response.data.data;
  },
};
