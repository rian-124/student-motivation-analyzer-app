import api from "@/lib/axios";
import type { User } from "@/lib/types/auth.type";

export const userService = {
  getMe: async (): Promise<User> => {
    const response = await api.get<{ data: User }>("/users/me");
    return response.data.data;
  },
};
