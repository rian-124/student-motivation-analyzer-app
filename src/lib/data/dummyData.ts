export const GLOBAL_STATS = {
  totalStudents: 124,
  activeDosen: 16,
  averageMotivation: 78,
  motivationImprovement: 12,
};

export const CLASS_DATA = [
  { label: "2021-A", value: 85, students: 42 },
  { label: "2021-B", value: 72, students: 38 },
  { label: "2022-A", value: 90, students: 45 },
  { label: "2022-B", value: 65, students: 30 },
  { label: "2022-C", value: 78, students: 40 },
];

export const MOTIVATION_DISTRIBUTION = {
  global: [
    { category: "Motivasi Tinggi", value: 57, fill: "#10b981" },
    { category: "Motivasi Sedang", value: 29, fill: "#f59e0b" },
    { category: "Motivasi Rendah", value: 14, fill: "#f43f5e" },
  ],
  classes: {
    "2021-A": [
      { category: "Motivasi Tinggi", value: 75, fill: "#10b981" },
      { category: "Motivasi Sedang", value: 20, fill: "#f59e0b" },
      { category: "Motivasi Rendah", value: 5, fill: "#f43f5e" },
    ],
    "2021-B": [
      { category: "Motivasi Tinggi", value: 45, fill: "#10b981" },
      { category: "Motivasi Sedang", value: 40, fill: "#f59e0b" },
      { category: "Motivasi Rendah", value: 15, fill: "#f43f5e" },
    ],
  }
};

export const STUDENT_RESULTS = {
  "4": { // Andi Pratama
    summary: {
      score: 84,
      status: "Tinggi",
      dominant: "Intrinsik",
    },
    distribution: [
      { category: "Intrinsik", value: 70, fill: "#5841EA" },
      { category: "Ekstrinsik", value: 20, fill: "#94a3b8" },
      { category: "Amotivasi", value: 10, fill: "#f43f5e" },
    ],
    history: [
      { date: "12 Apr", score: 78 },
      { date: "15 Apr", score: 80 },
      { date: "19 Apr", score: 84 },
    ]
  },
  "5": { // Rizky Fauzan
    summary: {
      score: 45,
      status: "Rendah",
      dominant: "Amotivasi",
    },
    distribution: [
      { category: "Intrinsik", value: 20, fill: "#5841EA" },
      { category: "Ekstrinsik", value: 30, fill: "#94a3b8" },
      { category: "Amotivasi", value: 50, fill: "#f43f5e" },
    ],
    history: [
      { date: "12 Apr", score: 55 },
      { date: "15 Apr", score: 50 },
      { date: "19 Apr", score: 45 },
    ]
  }
};
