import api from "@/lib/axios";
import type { WebResponse } from "@/lib/types/auth.type";

export interface AnalyticsStats {
  totalStudents: number;
  totalAnalyses: number;
  lowMotivation: number;
  totalClasses?: number;
  classAverage?: number;
}

export interface AnalyticsCharts {
  pieChart: { name: string; value: number }[];
  barChart: { label: string; value: number }[];
}

export const analyticsService = {
  getStats: async (): Promise<AnalyticsStats> => {
    const response = await api.get<WebResponse<AnalyticsStats>>(
      "/motivation-stats/stats",
    );
    return response.data.data;
  },

  getCharts: async (): Promise<AnalyticsCharts> => {
    const response = await api.get<WebResponse<AnalyticsCharts>>(
      "/motivation-stats/charts",
    );
    return response.data.data;
  },
};
