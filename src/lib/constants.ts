export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [
    "/dashboard",
    "/manage-student",
    "/manage-lecture",
    "/graph-overall",
    "/analysis-results",
    "/analysis-result",
  ],
  LECTURER: [
    "/dashboard",
    "/manage-student",
    "/graph-overall",
    "/graph-class",
    "/analysis-results",
    "/analysis-result",
  ],
  STUDENT: [
    "/graph-class",
    "/upload-recording",
    "/analysis-result",
    "/analysis-results",
  ],
};

export const DEFAULT_PAGES: Record<string, string> = {
  ADMIN: "/dashboard",
  LECTURER: "/dashboard",
  STUDENT: "/upload-recording",
};

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  UPLOAD_RECORDING: "/upload-recording",
  MANAGE_STUDENT: "/manage-student",
  MANAGE_LECTURER: "/manage-lecture",
  ANALYSIS_RESULTS: "/analysis-results",
  GRAPH_CLASS: "/graph-class",
  GRAPH_OVERALL: "/graph-overall",
};
