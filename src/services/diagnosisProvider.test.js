import { expect, test, vi } from "vitest";
import { requestDiagnosis } from "./diagnosisProvider.js";

test("returns the report from the diagnosis endpoint", async () => {
  const report = { summary: "Result" };
  const fetchImpl = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ report })
  });

  await expect(requestDiagnosis({ role: "Advertiser" }, fetchImpl)).resolves.toEqual(report);
  expect(fetchImpl).toHaveBeenCalledWith("/api/qwen-diagnosis", expect.objectContaining({
    method: "POST",
    body: JSON.stringify({ role: "Advertiser" })
  }));
});

test("throws endpoint failures for the app shell to apply fallback", async () => {
  const fetchImpl = vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: "QWEN_API_KEY is not configured." })
  });

  await expect(requestDiagnosis({}, fetchImpl)).rejects.toThrow("QWEN_API_KEY is not configured.");
});
