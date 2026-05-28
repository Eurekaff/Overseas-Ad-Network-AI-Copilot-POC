export const series = {
  advertiser: [
    { label: "D-6", cpa: 3.05, roas: 1.84, cvr: 5.1, ctr: 3.0 },
    { label: "D-5", cpa: 3.12, roas: 1.79, cvr: 4.9, ctr: 3.1 },
    { label: "D-4", cpa: 3.22, roas: 1.72, cvr: 4.5, ctr: 3.0 },
    { label: "D-3", cpa: 3.48, roas: 1.61, cvr: 4.0, ctr: 2.9 },
    { label: "D-2", cpa: 3.76, roas: 1.52, cvr: 3.7, ctr: 3.0 },
    { label: "D-1", cpa: 3.86, roas: 1.49, cvr: 3.5, ctr: 3.0 },
    { label: "D", cpa: 3.9, roas: 1.51, cvr: 3.4, ctr: 3.0 }
  ],
  developer: [
    { label: "00:00", revenue: 1680, fill: 82, ecpm: 4.9 },
    { label: "04:00", revenue: 1620, fill: 78, ecpm: 4.8 },
    { label: "08:00", revenue: 1510, fill: 72, ecpm: 4.7 },
    { label: "12:00", revenue: 1440, fill: 68, ecpm: 4.7 },
    { label: "16:00", revenue: 1370, fill: 62, ecpm: 4.6 },
    { label: "20:00", revenue: 1380, fill: 61, ecpm: 4.6 }
  ]
};

export const advertiserMetrics = [
  ["Spend", "$33.8K", "+4%", "neutral"],
  ["CTR", "3.0%", "-1%", "neutral"],
  ["CVR", "3.4%", "-33%", "bad"],
  ["CPA", "$3.90", "+28%", "bad"],
  ["ROAS", "1.51", "-18%", "bad"],
  ["Budget Util.", "96%", "+2%", "good"]
];

export const developerMetrics = [
  ["Requests", "2.84M", "+1%", "neutral"],
  ["Fill Rate", "61%", "-21 pts", "bad"],
  ["Show Rate", "90%", "-2 pts", "neutral"],
  ["eCPM", "$4.60", "-6%", "neutral"],
  ["Revenue", "$7.84K", "-18%", "bad"],
  ["Load Time", "2.3s", "+0.4s", "warn"]
];

export const valueMetrics = {
  zh: [
    ["人工排查平均耗时", "30 分钟", "基准"],
    ["AI 辅助后平均耗时", "8 分钟", "-73%"],
    ["建议采纳率", "62%", "模拟"],
    ["报告人工修改率", "35%", "模拟"],
    ["客户响应时间节省", "45%", "模拟"],
    ["AI 辅助诊断次数", "18", "本周"]
  ],
  en: [
    ["Average manual investigation", "30 min", "Baseline"],
    ["Average with AI assistance", "8 min", "-73%"],
    ["Suggestion adoption rate", "62%", "Mock"],
    ["Report manual edit rate", "35%", "Mock"],
    ["Customer response time saved", "45%", "Mock"],
    ["AI-assisted analyses", "18", "This week"]
  ]
};

export const overviewTrendSeries = [
  { label: "05-15", assisted: 54, adoption: 34, reviewed: 46 },
  { label: "05-16", assisted: 68, adoption: 47, reviewed: 52 },
  { label: "05-17", assisted: 76, adoption: 45, reviewed: 55 },
  { label: "05-18", assisted: 74, adoption: 43, reviewed: 56 },
  { label: "05-19", assisted: 80, adoption: 49, reviewed: 57 },
  { label: "05-20", assisted: 72, adoption: 51, reviewed: 54 },
  { label: "05-21", assisted: 75, adoption: 62, reviewed: 53 }
];

export const operationsQueue = {
  zh: [
    ["Galaxy Quest Studio", "美国广告组 CVR 下滑", "CPA +28%", "高"],
    ["Puzzle Island", "巴西激励视频填充下降", "收入 -18%", "高"],
    ["Nova Play Labs", "周报待发送", "今日到期", "中"]
  ],
  en: [
    ["Galaxy Quest Studio", "US ad group CVR decline", "CPA +28%", "High"],
    ["Puzzle Island", "Brazil rewarded fill loss", "Revenue -18%", "High"],
    ["Nova Play Labs", "Weekly report pending", "Due today", "Medium"]
  ]
};

export const overviewReviewQueue = {
  zh: [
    ["高", "CPA 异常波动拆解建议", "23 分钟前", "high"],
    ["中", "ROAS 低于目标拆解建议", "47 分钟前", "medium"],
    ["中", "预算消耗异常拆解建议", "1 小时前", "medium"],
    ["低", "转化率波动原因分析建议", "2 小时前", "low"],
    ["低", "广告源质量下降排查建议", "3 小时前", "low"]
  ],
  en: [
    ["High", "CPA anomaly breakdown recommendation", "23 min ago", "high"],
    ["Medium", "ROAS below-target breakdown", "47 min ago", "medium"],
    ["Medium", "Budget consumption anomaly review", "1 hr ago", "medium"],
    ["Low", "Conversion variance cause analysis", "2 hr ago", "low"],
    ["Low", "Ad-source quality decline check", "3 hr ago", "low"]
  ]
};

export const countryRows = [
  ["United States", "$3.90", "3.4%", "68%", "High"],
  ["Brazil", "$2.10", "4.8%", "12%", "Medium"],
  ["Indonesia", "$1.46", "5.4%", "7%", "Low"]
];

export const creativeRows = [
  ["Boss Battle Reward Video", "3.1%", "3.2%", "+31%", "High"],
  ["Hero Upgrade Interstitial", "2.7%", "4.4%", "+9%", "Medium"],
  ["Guild Raid Playable", "3.4%", "5.0%", "-2%", "Low"]
];

export const sourceRows = [
  ["Ad Source B", "52%", "$4.80", "-28%", "High"],
  ["Ad Source C", "76%", "$4.30", "+4%", "Medium"],
  ["Ad Source A", "81%", "$4.90", "-3%", "Low"]
];

export const followMetricData = [
  {
    id: "adv-rec-1",
    source: {
      zh: "广告主投放看板 / AI 异常解释",
      en: "Advertiser Dashboard / AI Explanation"
    },
    title: {
      zh: "检查美国落地页加载速度与转化回传",
      en: "Check US landing page load speed and conversion postback"
    },
    entity: "Galaxy Quest Studio",
    priority: "High",
    owner: "CS Team",
    window: "7d",
    status: "Needs Review",
    metrics: [
      ["CVR", "3.4%", "4.1%", "Improved"],
      ["CPA", "$3.90", "$3.31", "Improved"],
      ["ROAS", "1.51", "1.68", "Improved"]
    ]
  },
  {
    id: "dev-rec-1",
    source: {
      zh: "开发者收益看板 / AI 波动分析",
      en: "Developer Dashboard / AI Variance Analysis"
    },
    title: {
      zh: "临时提升备用广告源 C 的优先级",
      en: "Temporarily raise backup Ad Source C priority"
    },
    entity: "Puzzle Island",
    priority: "High",
    owner: "Monetization Ops",
    window: "24h",
    status: "Needs Review",
    metrics: [
      ["Fill Rate", "61%", "74%", "Improved"],
      ["Revenue", "$7.84K", "$8.92K", "Improved"],
      ["eCPM", "$4.60", "$4.55", "Monitoring"]
    ]
  }
];
