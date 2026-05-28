export function buildDiagnosisContext(scenario, locale, overrides = {}) {
  const common = {
    locale,
    product: "Overseas Ad Network Embedded AI Assistant POC",
    modelUsage: "Generate an evidence-grounded AI-assisted explanation embedded in an existing business workflow.",
    ruleEnginePrinciple: "Rules identify anomalies and evidence; LLM explains and recommends actions."
  };

  if (Object.keys(overrides).length > 0) {
    return {
      ...common,
      role: scenario === "advertiser" ? "Advertiser" : scenario === "developer" ? "Developer" : "Operator",
      ...overrides
    };
  }

  if (scenario === "advertiser") {
    return {
      ...common,
      role: "Advertiser",
      scenarioType: "CPA_INCREASE_ROAS_DECLINE",
      selectedEntity: {
        advertiser: "Galaxy Quest Studio",
        campaign: "US RPG User Acquisition",
        market: "United States",
        timeRange: "Last 7 days vs previous 7 days"
      },
      metricSummary: {
        spend: { current: "$33.8K", change: "+4%" },
        ctr: { baseline: "3.0%", current: "3.0%", change: "-1%" },
        cvr: { baseline: "5.1%", current: "3.4%", change: "-33%" },
        cpa: { baseline: "$3.05", current: "$3.90", change: "+28%" },
        roas: { baseline: "1.84", current: "1.51", change: "-18%" },
        budgetUtilization: { current: "96%", change: "+2%" }
      },
      evidence: [
        "CTR remained stable while CVR dropped from 5.1% to 3.4%.",
        "The US market contributed 68% of the CPA increase impact.",
        "Boss Battle Reward Video has the highest creative-level risk."
      ],
      requiredOutput: "Explain why CPA rose and ROAS declined; include evidence, actions, risks, and watch metrics."
    };
  }

  if (scenario === "developer") {
    return {
      ...common,
      role: "Developer",
      scenarioType: "REWARDED_VIDEO_REVENUE_DECLINE",
      selectedEntity: {
        developer: "Puzzle Island Games",
        app: "Puzzle Island",
        placement: "Rewarded Video - Level Complete",
        country: "Brazil",
        adSource: "All Sources",
        timeRange: "Yesterday vs previous day"
      },
      metricSummary: {
        requests: { current: "2.84M", change: "+1%" },
        fillRate: { baseline: "82%", current: "61%", change: "-21 pts" },
        showRate: { current: "90%", change: "-2 pts" },
        ecpm: { current: "$4.60", change: "-6%" },
        revenue: { current: "$7.84K", change: "-18%" },
        loadTime: { current: "2.3s", change: "+0.4s" }
      },
      evidence: [
        "Requests increased by 1%, so traffic volume is stable.",
        "Fill Rate dropped from 82% to 61%, driving most of the revenue decline.",
        "Ad Source B has a -28% revenue impact and the strongest fill-rate anomaly."
      ],
      requiredOutput: "Explain why rewarded video revenue declined; include ad source actions, risks, and watch metrics."
    };
  }

  return {
    ...common,
    role: "Operator",
    scenarioType: "CUSTOMER_WEEKLY_REVIEW",
    selectedEntity: {
      customer: "Galaxy Quest Studio",
      linkedDiagnosis: "US RPG User Acquisition CPA increase",
      timeRange: "2026-05-14 to 2026-05-20"
    },
    metricSummary: {
      cpa: { baseline: "$3.05", current: "$3.90", change: "+28%" },
      roas: { baseline: "1.84", current: "1.51", change: "-18%" },
      cvr: { baseline: "5.1%", current: "3.4%", change: "-33%" }
    },
    evidence: [
      "CTR stayed stable but CVR dropped significantly.",
      "The main impact is concentrated in the US market.",
      "Recommendations require customer success review before any budget action."
    ],
    requiredOutput: "Generate an operator-facing weekly review. Include customer-ready wording and internal risk notes in the recommendations or risk field."
  };
}
