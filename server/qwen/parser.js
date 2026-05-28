const requiredStringFields = ["summary", "risk"];
const requiredArrayFields = ["evidence", "causes", "recommendations", "watch"];

export function extractReport(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;

  try {
    const report = JSON.parse(raw.slice(first, last + 1));
    const hasStrings = requiredStringFields.every((field) => typeof report[field] === "string");
    const hasArrays = requiredArrayFields.every((field) =>
      Array.isArray(report[field]) && report[field].every((item) => typeof item === "string")
    );
    return hasStrings && hasArrays ? report : null;
  } catch {
    return null;
  }
}
