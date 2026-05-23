import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function extractJson(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  return JSON.parse(raw.slice(first, last + 1));
}

function buildPrompt(payload) {
  return [
    "You are an embedded AI assistant inside overseas ad network business workflows.",
    "Return strict JSON only. Do not include markdown fences.",
    "The JSON schema is:",
    JSON.stringify({
      summary: "string",
      evidence: ["string"],
      causes: ["string"],
      recommendations: ["string"],
      risk: "string",
      watch: ["string"]
    }),
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

function qwenMiddleware(env) {
  const apiKey = env.QWEN_API_KEY;
  const baseUrl = env.QWEN_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const model = env.QWEN_MODEL || "qwen-plus";

  return async (req, res, next) => {
    if (req.url !== "/api/qwen-diagnosis" || req.method !== "POST") {
      next();
      return;
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (!apiKey) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "QWEN_API_KEY is not configured." }));
      return;
    }

    try {
      const payload = JSON.parse(await readBody(req));
      const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
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
              content: buildPrompt(payload)
            }
          ],
          temperature: 0.2,
          response_format: { type: "json_object" }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        res.statusCode = response.status;
        res.end(JSON.stringify({ error: data?.message || data?.error?.message || "Qwen request failed.", raw: data }));
        return;
      }

      const content = data?.choices?.[0]?.message?.content || "";
      const report = extractJson(content);
      if (!report) {
        res.statusCode = 502;
        res.end(JSON.stringify({ error: "Qwen response was not valid JSON.", raw: content }));
        return;
      }

      res.end(JSON.stringify({ provider: "qwen", model, report }));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: error.message || "Unknown Qwen proxy error." }));
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "qwen-local-proxy",
        configureServer(server) {
          server.middlewares.use(qwenMiddleware(env));
        }
      }
    ]
  };
});
