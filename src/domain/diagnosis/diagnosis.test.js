import { describe, expect, test } from "vitest";
import { copy } from "../copy.js";
import { makeAdvertiserView } from "./advertiser.js";
import { buildDiagnosisContext } from "./context.js";
import { makeDeveloperView } from "./developer.js";
import { daysBetween, makeTrend, riskFrom } from "./shared.js";

const advertiserFilters = {
  account: "Galaxy Quest Studio",
  campaign: "US RPG User Acquisition",
  country: "United States",
  issue: "CPA increase / ROAS decline",
  startDate: "2026-05-14",
  endDate: "2026-05-20",
  question: "Why did CPA increase?"
};

const developerFilters = {
  app: "Puzzle Island",
  placement: "Rewarded Video - Level Complete",
  country: "Brazil",
  source: "All Sources",
  startDate: "2026-05-20",
  endDate: "2026-05-20",
  question: "Why did revenue decline?"
};

describe("diagnosis shared calculations", () => {
  test("calculates inclusive date periods and risk thresholds", () => {
    expect(daysBetween("2026-05-14", "2026-05-20")).toBe(7);
    expect(riskFrom(58, 58, 36)).toBe("High");
    expect(riskFrom(36, 58, 36)).toBe("Medium");
    expect(riskFrom(35, 58, 36)).toBe("Low");
  });

  test("creates bounded trend series ending at the requested values", () => {
    const trend = makeTrend(7, [["cpa", 3.05, 3.9]]);
    expect(trend).toHaveLength(7);
    expect(trend[0].cpa).toBe(3.05);
    expect(trend[6].cpa).toBe(3.9);
  });
});

test("keeps the advertiser default demo diagnosis values and evidence", () => {
  const view = makeAdvertiserView(advertiserFilters, copy.zh, "zh");
  expect(view.metrics).toContainEqual(["CPA", "$3.90", "+28%", "bad"]);
  expect(view.metrics).toContainEqual(["CVR", "3.4%", "-33%", "bad"]);
  expect(view.report.summary).toContain("CPA 上升 28%");
  expect(view.context.selectedEntity.campaign).toBe("US RPG User Acquisition");
});

test("keeps the developer default demo diagnosis values and evidence", () => {
  const view = makeDeveloperView(developerFilters, copy.zh, "zh");
  expect(view.metrics).toContainEqual(["Revenue", "$7.84K", "-18%", "bad"]);
  expect(view.metrics).toContainEqual(["Fill Rate", "61%", "-21 pts", "bad"]);
  expect(view.report.summary).toContain("广告收入下降 18%");
  expect(view.context.selectedEntity.country).toBe("Brazil");
});

test("builds the three provider scenario contexts with role evidence", () => {
  const advertiser = buildDiagnosisContext("advertiser", "en");
  const developer = buildDiagnosisContext("developer", "en");
  const operator = buildDiagnosisContext("copilot", "zh");
  expect(advertiser.role).toBe("Advertiser");
  expect(advertiser.evidence).toContain("The US market contributed 68% of the CPA increase impact.");
  expect(developer.role).toBe("Developer");
  expect(developer.metricSummary.fillRate.current).toBe("61%");
  expect(operator.role).toBe("Operator");
  expect(operator.scenarioType).toBe("CUSTOMER_WEEKLY_REVIEW");
});
