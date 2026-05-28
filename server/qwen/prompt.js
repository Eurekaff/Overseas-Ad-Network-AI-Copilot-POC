const reportSchema = {
  summary: "string",
  evidence: ["string"],
  causes: ["string"],
  recommendations: ["string"],
  risk: "string",
  watch: ["string"]
};

export function buildPrompt(payload) {
  return [
    "You are an embedded AI assistant inside overseas ad network business workflows.",
    "Return strict JSON only. Do not include markdown fences.",
    "The JSON schema is:",
    JSON.stringify(reportSchema),
    "Rules:",
    "- Use the requested locale.",
    "- Ground every conclusion in the provided metrics and evidence.",
    "- Do not claim that high-risk actions have been automatically executed.",
    "- Explain results after rule detection and metric decomposition; do not present AI as an autonomous platform.",
    "- Keep recommendations specific and suitable for a 5-minute product demo.",
    "Context:",
    JSON.stringify(payload, null, 2)
  ].join("\n");
}
