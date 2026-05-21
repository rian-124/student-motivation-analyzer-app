import api from "@/lib/axios";
import type { User, WebResponse } from "@/lib/types/auth.type";

export const userService = {
  getMe: async (): Promise<User> => {
    const response = await api.get<WebResponse<User>>("/users/me");
    return response.data.data;
  },
};
