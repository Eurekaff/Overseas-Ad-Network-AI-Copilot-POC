export function makeAdvertiserReport(t, locale) {
  return {
    summary: t.advertiser.summary,
    causes: [t.advertiser.cause1, t.advertiser.cause2],
    recommendations: [t.advertiser.rec1, t.advertiser.rec2, t.advertiser.rec3],
    evidence: locale === "zh"
      ? ["CTR 维持在 3.0%，CVR 从 5.1% 降至 3.4%。", "美国市场贡献 68% 的 CPA 上升影响。"]
      : ["CTR stayed at 3.0%, while CVR dropped from 5.1% to 3.4%.", "The US market contributed 68% of the CPA increase impact."],
    watch: ["CVR", "CPA", "ROAS"],
    risk: t.advertiser.risk
  };
}

export function makeDeveloperReport(t, locale) {
  return {
    summary: t.developer.summary,
    causes: [t.developer.cause1, t.developer.cause2],
    recommendations: [t.developer.rec1, t.developer.rec2, t.developer.rec3],
    evidence: locale === "zh"
      ? ["请求量较前日 +1%，但 Fill Rate 从 82% 降至 61%。", "广告源 B 收入影响 -28%，是主要异常来源。"]
      : ["Requests increased by 1%, but Fill Rate dropped from 82% to 61%.", "Ad Source B shows a -28% revenue impact and is the main anomaly source."],
    watch: ["Fill Rate", "Revenue", "eCPM"],
    risk: t.developer.risk
  };
}

export function makeCopilotReport(t) {
  return {
    profile: t.copilot.profileText,
    metrics: t.copilot.metricText,
    summary: t.copilot.reasonText,
    recommendations: [t.copilot.externalText],
    causes: [t.copilot.internalText],
    risk: t.copilot.riskText
  };
}

export function daysBetween(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 7;
  return Math.max(1, Math.round((end - start) / 86400000) + 1);
}

export function makeTrend(length, keys) {
  const points = Math.min(10, Math.max(5, length));
  return Array.from({ length: points }, (_, index) => {
    const ratio = points === 1 ? 1 : index / (points - 1);
    const item = { label: `D-${points - index - 1}` };
    keys.forEach(([key, start, end]) => {
      item[key] = Number((start + (end - start) * ratio).toFixed(2));
    });
    return item;
  });
}

export function riskFrom(value, high, medium) {
  if (value >= high) return "High";
  if (value >= medium) return "Medium";
  return "Low";
}
