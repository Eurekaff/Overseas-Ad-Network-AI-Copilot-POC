import { extractReport } from "./parser.js";
import { buildPrompt } from "./prompt.js";

export async function generateDiagnosis({
  context,
  apiKey,
  baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1",
  model = "qwen-plus",
  fetchImpl = fetch
}) {
  if (!apiKey) {
    throw new Error("QWEN_API_KEY is not configured.");
  }

  const response = await fetchImpl(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "You generate evidence-grounded assisted explanations for embedded ad network workflows."
        },
        {
          role: "user",
          content: buildPrompt(context)
        }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw Object.assign(
      new Error(data?.message || data?.error?.message || "Qwen request failed."),
      { statusCode: response.status, raw: data }
    );
  }

  const content = data?.choices?.[0]?.message?.content || "";
  const report = extractReport(content);
  if (!report) {
    throw Object.assign(new Error("Qwen response was not valid JSON."), {
      statusCode: 502,
      raw: content
    });
  }

  return { provider: "qwen", model, report };
}
