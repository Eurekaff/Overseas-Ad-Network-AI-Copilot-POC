export async function requestDiagnosis(context, fetchImpl = fetch) {
  const response = await fetchImpl("/api/qwen-diagnosis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(context)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || "Qwen request failed");
  }
  return data.report;
}
