import { daysBetween, makeTrend, riskFrom } from "./shared.js";

export function makeAdvertiserView(filters, t, locale) {
  const days = daysBetween(filters.startDate, filters.endDate);
  const countryFactor = {
    "United States": 1.18,
    Brazil: 0.86,
    Indonesia: 0.72,
    Mexico: 0.79
  }[filters.country] || 1;
  const campaignFactor = filters.campaign.includes("RPG") ? 1.08 : filters.campaign.includes("Retargeting") ? 0.82 : 0.93;
  const issueFactor = filters.issue.includes("Budget") ? 0.9 : filters.issue.includes("Creative") ? 1.16 : filters.issue.includes("Conversion") ? 1.24 : 1.2;
  const daysFactor = Math.min(1.2, Math.max(0.82, 7 / days));
  let cpa = 3.05 * countryFactor * campaignFactor * issueFactor;
  let cpaBase = cpa / (1.12 + issueFactor * 0.12);
  let cvrBase = 5.1 / countryFactor;
  let cvr = Math.max(2.2, cvrBase - issueFactor * 1.1 * daysFactor);
  let roasBase = 1.86 / campaignFactor;
  let roas = Math.max(0.92, roasBase - issueFactor * 0.28);
  const ctr = filters.issue.includes("Creative") ? 2.45 : 3.0;
  let spend = Math.round(33800 * campaignFactor * countryFactor * Math.min(3.4, days / 7));
  let impressions = Math.round(12000000 * campaignFactor * Math.min(3.4, days / 7));
  const isDefaultCase = filters.account === "Galaxy Quest Studio"
    && filters.campaign === "US RPG User Acquisition"
    && filters.country === "United States"
    && filters.issue === "CPA increase / ROAS decline"
    && filters.startDate === "2026-05-14"
    && filters.endDate === "2026-05-20";
  if (isDefaultCase) {
    cpa = 3.9;
    cpaBase = 3.05;
    cvrBase = 5.1;
    cvr = 3.4;
    roasBase = 1.84;
    roas = 1.51;
    spend = 33800;
    impressions = 12000000;
  }
  const clicks = Math.round(impressions * ctr / 100);
  const cpaChange = Math.round(((cpa - cpaBase) / cpaBase) * 100);
  const roasChange = Math.round(((roas - roasBase) / roasBase) * 100);
  const cvrChange = Math.round(((cvr - cvrBase) / cvrBase) * 100);
  const impact = Math.min(78, Math.max(28, Math.round(countryFactor * issueFactor * 42)));

  return {
    rule: locale === "zh"
      ? `规则识别：${filters.country} 在所选周期 CPA 上升 ${cpaChange}%，${cpaChange > 20 ? "超过 20% 预警阈值" : "进入观察范围"}；ROAS 变化 ${roasChange}%。`
      : `Rule detection: CPA in ${filters.country} rose ${cpaChange}% in the selected period, ${cpaChange > 20 ? "above the 20% alert threshold" : "within the monitoring range"}; ROAS changed ${roasChange}%.`,
    decomposition: locale === "zh"
      ? `指标拆解：CTR 为 ${ctr.toFixed(1)}%，CVR 从 ${cvrBase.toFixed(1)}% 降至 ${cvr.toFixed(1)}%；${filters.country} 贡献 ${impact}% 的模拟影响。`
      : `Metric decomposition: CTR is ${ctr.toFixed(1)}%, while CVR moved from ${cvrBase.toFixed(1)}% to ${cvr.toFixed(1)}%; ${filters.country} contributes ${impact}% of modeled impact.`,
    metrics: [
      ["Spend", `$${(spend / 1000).toFixed(1)}K`, `${spend > 32000 ? "+" : "-"}${Math.abs(Math.round((spend - 32000) / 320))}%`, "neutral"],
      ["Impressions", `${(impressions / 1000000).toFixed(1)}M`, "+3%", "neutral"],
      ["Clicks", `${(clicks / 1000).toFixed(0)}K`, "+2%", "neutral"],
      ["CTR", `${ctr.toFixed(1)}%`, filters.issue.includes("Creative") ? "-18%" : "-1%", filters.issue.includes("Creative") ? "bad" : "neutral"],
      ["CVR", `${cvr.toFixed(1)}%`, `${cvrChange}%`, cvrChange < -15 ? "bad" : "neutral"],
      ["CPA", `$${cpa.toFixed(2)}`, `+${cpaChange}%`, cpaChange > 20 ? "bad" : "warn"],
      ["ROAS", roas.toFixed(2), `${roasChange}%`, roasChange < -12 ? "bad" : "neutral"],
      ["Budget Util.", filters.issue.includes("Budget") ? "71%" : "96%", filters.issue.includes("Budget") ? "-18%" : "+2%", filters.issue.includes("Budget") ? "bad" : "good"]
    ],
    series: makeTrend(days, [["cpa", cpaBase, cpa], ["roas", roasBase, roas], ["cvr", cvrBase, cvr]]),
    countryRows: [
      [filters.country, `$${cpa.toFixed(2)}`, `${cvr.toFixed(1)}%`, `${impact}%`, riskFrom(impact, 58, 36)],
      ["United States", `$${(3.4 * campaignFactor).toFixed(2)}`, "3.8%", "31%", "Medium"],
      ["Brazil", "$2.10", "4.8%", "18%", "Low"],
      ["Indonesia", "$1.46", "5.4%", "9%", "Low"]
    ],
    creativeRows: [
      ["Boss Battle Reward Video", `${ctr.toFixed(1)}%`, `${Math.max(2.8, cvr - 0.2).toFixed(1)}%`, `+${Math.max(9, cpaChange)}%`, riskFrom(cpaChange, 24, 12)],
      ["Hero Upgrade Interstitial", "2.7%", "4.4%", "+9%", "Medium"],
      ["Guild Raid Playable", "3.4%", "5.0%", "-2%", "Low"]
    ],
    report: {
      summary: isDefaultCase ? t.advertiser.summary : locale === "zh"
        ? `${filters.country} 在所选时间范围内 CPA 上升 ${cpaChange}%，ROAS ${roasChange}%。主要问题与 ${filters.issue} 相关，建议优先检查影响最大的国家与素材。`
        : `${filters.country} shows a ${cpaChange}% CPA increase and ${roasChange}% ROAS movement in the selected period. The main issue is related to ${filters.issue}.`,
      evidence: locale === "zh"
        ? [`所选周期：${filters.startDate} 至 ${filters.endDate}（${days} 天）。`, `CPA 从 $${cpaBase.toFixed(2)} 升至 $${cpa.toFixed(2)}；CVR 从 ${cvrBase.toFixed(1)}% 降至 ${cvr.toFixed(1)}%。`, `${filters.country} 贡献 ${impact}% 的模拟影响。`]
        : [`Selected range: ${filters.startDate} to ${filters.endDate} (${days} days).`, `CPA moved from $${cpaBase.toFixed(2)} to $${cpa.toFixed(2)}; CVR moved from ${cvrBase.toFixed(1)}% to ${cvr.toFixed(1)}%.`, `${filters.country} contributes ${impact}% of the modeled impact.`],
      causes: locale === "zh"
        ? [filters.issue.includes("Creative") ? "素材疲劳正在降低点击质量。" : "转化效率较基准周期显著走弱。", filters.issue.includes("Budget") ? "投放限制可能导致预算利用率下降。" : "需要核查流量组合与点击后的转化链路。"]
        : [filters.issue.includes("Creative") ? "Creative fatigue is reducing click quality." : "Conversion efficiency is weaker than the baseline period.", filters.issue.includes("Budget") ? "Delivery constraints may be limiting budget utilization." : "Traffic mix and post-click conversion path require review."],
      recommendations: locale === "zh"
        ? ["调整预算前先复核影响最大的地区与素材组合。", "检查落地页加载、转化回传和近期投放修改记录。", "每次仅更改一个素材或落地页变量，进行受控测试。"]
        : ["Review the top country and creative combination before changing budget.", "Check landing page loading, conversion postback, and recent campaign edits.", "Prepare a controlled test with one creative or landing page change at a time."],
      watch: ["CPA", "CVR", "ROAS"],
      risk: locale === "zh" ? "确认转化质量前不要提高预算，避免放大无效消耗。" : "Avoid increasing budget before conversion quality is confirmed."
    },
    context: {
      selectedEntity: {
        advertiser: filters.account,
        campaign: filters.campaign,
        market: filters.country,
        timeRange: `${filters.startDate} to ${filters.endDate}`,
        userQuestion: filters.question
      },
      scenarioType: filters.issue,
      metricSummary: {
        spend: `$${(spend / 1000).toFixed(1)}K`,
        ctr: `${ctr.toFixed(1)}%`,
        cvr: { baseline: `${cvrBase.toFixed(1)}%`, current: `${cvr.toFixed(1)}%`, change: `${cvrChange}%` },
        cpa: { baseline: `$${cpaBase.toFixed(2)}`, current: `$${cpa.toFixed(2)}`, change: `+${cpaChange}%` },
        roas: { baseline: roasBase.toFixed(2), current: roas.toFixed(2), change: `${roasChange}%` }
      },
      evidence: [
        `Custom user question: ${filters.question}`,
        `Country impact: ${filters.country} ${impact}%.`,
        `Creative risk: Boss Battle Reward Video ${riskFrom(cpaChange, 24, 12)}.`
      ],
      requiredOutput: filters.question
    }
  };
}
