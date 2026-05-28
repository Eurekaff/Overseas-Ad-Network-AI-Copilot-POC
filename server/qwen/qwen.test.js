import { describe, expect, test, vi } from "vitest";
import { extractReport } from "./parser.js";
import { buildPrompt } from "./prompt.js";
import { generateDiagnosis } from "./provider.js";

const report = {
  summary: "CPA increased.",
  evidence: ["CVR declined."],
  causes: ["Conversion efficiency weakened."],
  recommendations: ["Review postback."],
  risk: "Do not change budget automatically.",
  watch: ["CPA"]
};

describe("Qwen report parsing", () => {
  test("extracts valid JSON and fenced JSON reports", () => {
    expect(extractReport(JSON.stringify(report))).toEqual(report);
    expect(extractReport(`\`\`\`json\n${JSON.stringify(report)}\n\`\`\``)).toEqual(report);
  });

  test("rejects invalid or incomplete report responses", () => {
    expect(extractReport("not JSON")).toBeNull();
    expect(extractReport(JSON.stringify({ summary: "missing arrays" }))).toBeNull();
  });
});

test("prompt constrains evidence grounding and human confirmation", () => {
  const prompt = buildPrompt({ locale: "zh", evidence: ["CPA +28%"] });
  expect(prompt).toContain("Return strict JSON only");
  expect(prompt).toContain("Ground every conclusion");
  expect(prompt).toContain("high-risk actions");
  expect(prompt).toContain("CPA +28%");
});

test("provider returns a parsed report from injected fetch", async () => {
  const fetchImpl = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      choices: [{ message: { content: JSON.stringify(report) } }]
    })
  });

  const result = await generateDiagnosis({
    context: { locale: "en" },
    apiKey: "key",
    baseUrl: "https://example.test/v1/",
    model: "qwen-plus",
    fetchImpl
  });

  expect(fetchImpl).toHaveBeenCalledWith(
    "https://example.test/v1/chat/completions",
    expect.objectContaining({ method: "POST" })
  );
  expect(result).toEqual({ provider: "qwen", model: "qwen-plus", report });
});
