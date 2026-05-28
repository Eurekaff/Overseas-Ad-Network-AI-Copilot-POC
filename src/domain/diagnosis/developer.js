import { daysBetween, makeTrend, riskFrom } from "./shared.js";

export function makeDeveloperView(filters, t, locale) {
  const days = daysBetween(filters.startDate, filters.endDate);
  const countryFactor = {
    Brazil: 1.18,
    Mexico: 0.96,
    Indonesia: 0.88,
    "United States": 1.05
  }[filters.country] || 1;
  const sourceFactor = filters.source.includes("B") ? 1.32 : filters.source.includes("C") ? 0.86 : 1.08;
  const placementFactor = filters.placement.includes("Interstitial") ? 0.72 : 1.1;
  let requests = Math.round(2840000 * placementFactor * Math.min(3.2, days / 1.5));
  let fillBase = 82 / sourceFactor;
  let fill = Math.max(48, fillBase - 16 * countryFactor + (filters.source.includes("C") ? 8 : 0));
  const show = filters.placement.includes("Interstitial") ? 84 : 90;
  let ecpmBase = 4.9 * (filters.placement.includes("Interstitial") ? 0.78 : 1);
  let ecpm = Math.max(2.8, ecpmBase - countryFactor * 0.24);
  let impressions = Math.round(requests * (fill / 100) * (show / 100));
  let revenue = Math.round(requests * (fill / 100) * (show / 100) * ecpm / 1000);
  let revenueBase = Math.round(requests * (fillBase / 100) * (show / 100) * ecpmBase / 1000);
  const isDefaultCase = filters.app === "Puzzle Island"
    && filters.placement === "Rewarded Video - Level Complete"
    && filters.country === "Brazil"
    && filters.source === "All Sources"
    && filters.startDate === "2026-05-20"
    && filters.endDate === "2026-05-20";
  if (isDefaultCase) {
    requests = 2840000;
    fillBase = 82;
    fill = 61;
    ecpmBase = 4.9;
    ecpm = 4.6;
    impressions = Math.round(requests * 0.61 * 0.9);
    revenueBase = 9561;
    revenue = 7840;
  }
  const revenueChange = Math.round(((revenue - revenueBase) / revenueBase) * 100);
  const fillChange = Math.round(fill - fillBase);

  return {
    rule: locale === "zh"
      ? `规则识别：${filters.country} 的广告收入变化 ${revenueChange}%，${revenueChange < -15 ? "超过 15% 下降预警阈值" : "进入观察范围"}。`
      : `Rule detection: Ad revenue in ${filters.country} changed ${revenueChange}%, ${revenueChange < -15 ? "above the 15% decline alert threshold" : "within the monitoring range"}.`,
    decomposition: locale === "zh"
      ? `指标拆解：请求量为 ${Math.round(requests / 1000)}K，Fill Rate 从 ${fillBase.toFixed(0)}% 变化至 ${fill.toFixed(0)}%；${filters.source} 是当前排查维度。`
      : `Metric decomposition: requests are ${Math.round(requests / 1000)}K and Fill Rate moved from ${fillBase.toFixed(0)}% to ${fill.toFixed(0)}%; ${filters.source} is the selected investigation dimension.`,
    metrics: [
      ["Requests", `${(requests / 1000000).toFixed(2)}M`, "+1%", "neutral"],
      ["Fill Rate", `${fill.toFixed(0)}%`, `${fillChange} pts`, fillChange < -10 ? "bad" : "neutral"],
      ["Show Rate", `${show}%`, "-2 pts", "neutral"],
      ["Impressions", `${(impressions / 1000000).toFixed(2)}M`, `${fillChange} pts`, fillChange < -10 ? "warn" : "neutral"],
      ["eCPM", `$${ecpm.toFixed(2)}`, `${Math.round(((ecpm - ecpmBase) / ecpmBase) * 100)}%`, "neutral"],
      ["Revenue", `$${(revenue / 1000).toFixed(2)}K`, `${revenueChange}%`, revenueChange < -15 ? "bad" : "warn"],
      ["Load Time", filters.source.includes("B") ? "2.6s" : "2.1s", filters.source.includes("B") ? "+0.7s" : "+0.1s", filters.source.includes("B") ? "warn" : "neutral"]
    ],
    series: makeTrend(days, [["revenue", revenueBase, revenue], ["fill", fillBase, fill], ["ecpm", ecpmBase, ecpm]]),
    sourceRows: [
      [filters.source, `${fill.toFixed(0)}%`, `$${ecpm.toFixed(2)}`, `${revenueChange}%`, riskFrom(Math.abs(revenueChange), 20, 10)],
      ["Ad Source B", "52%", "$4.80", "-28%", "High"],
      ["Ad Source C", "76%", "$4.30", "+4%", "Medium"],
      ["Ad Source A", "81%", "$4.90", "-3%", "Low"]
    ],
    report: {
      summary: isDefaultCase ? t.developer.summary : locale === "zh"
        ? `${filters.country} 的 ${filters.placement} 收入在所选时间范围内变化 ${revenueChange}%，主要由 Fill Rate 从 ${fillBase.toFixed(0)}% 变化至 ${fill.toFixed(0)}% 驱动。`
        : `${filters.placement} revenue in ${filters.country} changed by ${revenueChange}% in the selected period, mainly driven by Fill Rate moving from ${fillBase.toFixed(0)}% to ${fill.toFixed(0)}%.`,
      evidence: locale === "zh"
        ? [`所选周期：${filters.startDate} 至 ${filters.endDate}（${days} 天）。`, `请求量为 ${Math.round(requests / 1000)}K，Fill Rate 为 ${fill.toFixed(0)}%，eCPM 为 $${ecpm.toFixed(2)}。`, `当前排查广告源：${filters.source}。`]
        : [`Selected range: ${filters.startDate} to ${filters.endDate} (${days} days).`, `Requests are ${Math.round(requests / 1000)}K, Fill Rate is ${fill.toFixed(0)}%, eCPM is $${ecpm.toFixed(2)}.`, `Selected ad source: ${filters.source}.`],
      causes: locale === "zh"
        ? ["收入波动主要由填充率与广告源覆盖变化驱动。", filters.source.includes("B") ? "模拟场景中广告源 B 的响应覆盖风险更高。" : "备用广告源覆盖相对稳定，但仍需持续观察。"]
        : ["Revenue movement is primarily driven by fill rate and ad source coverage.", filters.source.includes("B") ? "Ad Source B shows higher response risk in this modeled scenario." : "Backup source coverage is relatively stable but should be monitored."],
      recommendations: locale === "zh"
        ? ["检查广告源响应错误和国家覆盖情况。", "调整瀑布流优先级前同步比较填充率与 eCPM。", "未来 24 小时观察 Revenue、Fill Rate 和 eCPM。"]
        : ["Check ad source response errors and country coverage.", "Compare fill rate and eCPM before changing waterfall priority.", "Monitor revenue, fill rate, and eCPM for the next 24 hours."],
      watch: ["Fill Rate", "Revenue", "eCPM"],
      risk: locale === "zh" ? "调整广告源优先级可能提升填充率，但也可能稀释 eCPM。" : "Changing source priority may improve fill but can dilute eCPM."
    },
    context: {
      selectedEntity: {
        app: filters.app,
        placement: filters.placement,
        country: filters.country,
        adSource: filters.source,
        timeRange: `${filters.startDate} to ${filters.endDate}`,
        userQuestion: filters.question
      },
      scenarioType: "Developer monetization question",
      metricSummary: {
        requests,
        fillRate: { baseline: `${fillBase.toFixed(0)}%`, current: `${fill.toFixed(0)}%`, change: `${fillChange} pts` },
        showRate: `${show}%`,
        ecpm: `$${ecpm.toFixed(2)}`,
        revenue: { baseline: `$${(revenueBase / 1000).toFixed(2)}K`, current: `$${(revenue / 1000).toFixed(2)}K`, change: `${revenueChange}%` }
      },
      evidence: [
        `Custom user question: ${filters.question}`,
        `Selected ad source: ${filters.source}.`,
        `Placement: ${filters.placement}.`
      ],
      requiredOutput: filters.question
    }
  };
}
