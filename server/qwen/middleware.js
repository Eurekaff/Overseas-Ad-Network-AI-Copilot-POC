import { generateDiagnosis } from "./provider.js";

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

export function createQwenMiddleware(env, provider = generateDiagnosis) {
  return async (req, res, next) => {
    if (req.url !== "/api/qwen-diagnosis" || req.method !== "POST") {
      next();
      return;
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    try {
      const context = JSON.parse(await readBody(req));
      const result = await provider({
        context,
        apiKey: env.QWEN_API_KEY,
        baseUrl: env.QWEN_BASE_URL,
        model: env.QWEN_MODEL
      });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.statusCode = error.statusCode || 500;
      res.end(JSON.stringify({
        error: error.message || "Unknown Qwen proxy error.",
        ...(error.raw ? { raw: error.raw } : {})
      }));
    }
  };
}
