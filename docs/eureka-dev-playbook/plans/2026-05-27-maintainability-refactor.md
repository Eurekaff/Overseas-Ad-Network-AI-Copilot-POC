# POC Maintainability Refactor Implementation Plan

> **For agentic workers:** Use eureka-dev-playbook:subagent-driven-development for independent high-risk or broad tasks, or eureka-dev-playbook:executing-plans for inline execution. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the embedded AI assistant POC into clear frontend and Qwen-provider modules with an automated quality baseline, and implement the approved light operations-console redesign while preserving the existing business scope and demo flow.

**Architecture:** Keep React state orchestration in a small application shell, move page composition into feature modules, move reusable rendering into components, and move deterministic mock/diagnosis work into pure domain modules. Move Qwen prompt, parsing, network access, and middleware out of Vite configuration into injectable server modules; retain app-level mock fallback behavior. Implement the selected light operations-console direction through shared CSS tokens and carefully scoped overview composition changes, not through new business features.

**Tech Stack:** React 19, Vite 7, Vitest, Testing Library, jsdom, ESLint 9, local Vite middleware, Qwen compatible chat completions endpoint.

---

## Guardrails

- Preserve the existing five-page navigation, business copy/content scope, default mock scenario numbers, accepted-recommendation follow-up behavior, and fallback notice.
- Treat `/Users/eureka/.codex/generated_images/019e691e-d619-7a10-ace9-30a972b442cd/ig_0600368c6b99789f016a16d6b7cb148196830ecdd6374a7419.png` as the approved visual reference.
- Update `src/styles.css` as the shared design-system surface for warm white canvas, forest sidebar, restrained lime action state, teal data accents, low-shadow panels, spacing and responsive behavior.
- The concept image contains layout inspiration only; do not introduce queue records, metrics or claims absent from current fixtures and copy.
- Do not add routing, state-management libraries, schema libraries, login, real ad data, or new product capability.
- For extraction tasks below, moving the named existing symbols verbatim from `src/App.jsx` into the named modules is the implementation; do not silently rewrite their content.
- This plan does not authorize commits. Keep changes unstaged unless the user separately requests git delivery.

## File Map

| File | Responsibility |
| --- | --- |
| `src/app/App.jsx` | Global language, role, page, reports, provider notice, and recommendation-status orchestration |
| `src/app/navigation.js` | Navigation configuration from translated labels |
| `src/components/controls/Controls.jsx` | `Segment`, `SelectField`, `DateField`, `FilterBar`, `FilterPill` |
| `src/components/data-display/DataDisplay.jsx` | Metrics, report, data-table, chart, status, value and rule display components |
| `src/components/layout/PageIntro.jsx` | Shared feature page heading |
| `src/domain/copy.js` | Exact `copy` translation object extracted from existing `App.jsx` |
| `src/domain/fixtures.js` | Exact static series/metrics/table/follow-up fixture objects extracted from existing `App.jsx` |
| `src/domain/diagnosis/shared.js` | Date-period, trend, risk and static report helpers |
| `src/domain/diagnosis/advertiser.js` | Advertiser filter-to-view calculation |
| `src/domain/diagnosis/developer.js` | Developer filter-to-view calculation |
| `src/domain/diagnosis/context.js` | Provider context builder |
| `src/features/*/*.jsx` | Existing five page compositions and local filter state |
| `src/services/diagnosisProvider.js` | Browser HTTP adapter only |
| `server/qwen/prompt.js` | Prompt/schema instruction construction |
| `server/qwen/parser.js` | Model report extraction and minimal contract validation |
| `server/qwen/provider.js` | Injectable DashScope-compatible API call |
| `server/qwen/middleware.js` | Vite HTTP middleware adapter |
| `vite.config.js` | Vite plugin wiring only |
| `eslint.config.js`, `vitest.config.js`, `src/test/setup.js` | Test/lint quality baseline |
| `src/styles.css` | Approved light operations-console tokens, component appearance and responsive layout |

### Task 1: Establish Test And Lint Tooling

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`
- Create: `eslint.config.js`

- [ ] **Step 1: Install the scoped development dependencies**

Run:

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh
```

Expected: `package.json` and `package-lock.json` include only the test/lint development dependencies in addition to existing packages.

- [ ] **Step 2: Add executable quality scripts**

Modify the scripts object in `package.json` to exactly include:

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0",
    "lint": "eslint .",
    "test": "vitest run"
  }
}
```

- [ ] **Step 3: Add Vitest browser-DOM configuration**

Create `vitest.config.js`:

```js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"]
  }
});
```

Create `src/test/setup.js`:

```js
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add minimal lint configuration**

Create `eslint.config.js`:

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
    }
  }
];
```

- [ ] **Step 5: Verify the tooling itself can execute before refactor tests exist**

Run:

```bash
npm run test -- --passWithNoTests
npm run build
```

Expected: test runner exits successfully with no tests collected, and the pre-refactor app still builds. `npm run lint` is intentionally deferred until extraction removes currently problematic mixed-module patterns.

### Task 2: Extract And Lock Deterministic Diagnosis Domain Behavior

**Files:**
- Create: `src/domain/copy.js`
- Create: `src/domain/fixtures.js`
- Create: `src/domain/diagnosis/shared.js`
- Create: `src/domain/diagnosis/advertiser.js`
- Create: `src/domain/diagnosis/developer.js`
- Create: `src/domain/diagnosis/context.js`
- Create: `src/domain/diagnosis/diagnosis.test.js`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write failing tests for the new pure-domain API**

Create `src/domain/diagnosis/diagnosis.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify RED due to missing extracted modules**

Run:

```bash
npx vitest run src/domain/diagnosis/diagnosis.test.js
```

Expected: FAIL because `src/domain/copy.js` and the `src/domain/diagnosis/*.js` API do not yet exist.

- [ ] **Step 3: Extract unchanged domain data and pure functions**

Perform this mechanical move manifest. Copy each full declaration from the current `src/App.jsx` into its destination without changing its initializer/body, and change only the declaration prefix from `const` or `function` to `export const` or `export function`:

| Current source symbol | Destination |
| --- | --- |
| `const copy` at lines 27-370 | `src/domain/copy.js` as `export const copy` |
| `const series`, `advertiserMetrics`, `developerMetrics`, `valueMetrics`, `operationsQueue`, `countryRows`, `creativeRows`, `sourceRows`, `followMetricData` at lines 372-503 | `src/domain/fixtures.js`, each prefixed with `export` |
| `makeAdvertiserReport`, `makeDeveloperReport`, `makeCopilotReport`, `daysBetween`, `makeTrend`, `riskFrom` at lines 1194-1254 | `src/domain/diagnosis/shared.js`, each prefixed with `export` |
| `makeAdvertiserView` at lines 1256-1367 | `src/domain/diagnosis/advertiser.js` as `export function makeAdvertiserView` |
| `makeDeveloperView` at lines 1369-1471 | `src/domain/diagnosis/developer.js` as `export function makeDeveloperView` |
| `buildDiagnosisContext` at lines 1473-1568 | `src/domain/diagnosis/context.js` as `export function buildDiagnosisContext` |

Add the only dependencies required by moved view functions:

```js
// src/domain/diagnosis/advertiser.js and src/domain/diagnosis/developer.js
import { daysBetween, makeTrend, riskFrom } from "./shared.js";
```

Remove only the moved declarations/functions from `src/App.jsx` and import the same names from their destination modules so the original UI remains runnable during the remainder of extraction:

```js
import { copy } from "./domain/copy.js";
import { followMetricData, operationsQueue, valueMetrics } from "./domain/fixtures.js";
import { makeAdvertiserView } from "./domain/diagnosis/advertiser.js";
import { buildDiagnosisContext } from "./domain/diagnosis/context.js";
import { makeDeveloperView } from "./domain/diagnosis/developer.js";
import { makeAdvertiserReport, makeCopilotReport, makeDeveloperReport } from "./domain/diagnosis/shared.js";
```

Do not carry unused extracted fixture exports back into `App.jsx`; `series`, `advertiserMetrics`, `developerMetrics`, `countryRows`, `creativeRows`, and `sourceRows` are currently unconsumed constants and should stay isolated in fixtures without adding behavior.

- [ ] **Step 4: Run tests and build to verify GREEN**

Run:

```bash
npx vitest run src/domain/diagnosis/diagnosis.test.js
npm run build
```

Expected: the domain test file passes and the unchanged rendered app builds using imported domain modules.

### Task 3: Extract And Test The Qwen Server Boundary

**Files:**
- Create: `server/qwen/parser.js`
- Create: `server/qwen/prompt.js`
- Create: `server/qwen/provider.js`
- Create: `server/qwen/middleware.js`
- Create: `server/qwen/qwen.test.js`
- Modify: `vite.config.js`

- [ ] **Step 1: Write failing tests for parser, prompt, and injectable provider**

Create `server/qwen/qwen.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify RED due to missing server modules**

Run:

```bash
npx vitest run server/qwen/qwen.test.js
```

Expected: FAIL because the new `server/qwen/*.js` modules do not exist.

- [ ] **Step 3: Implement prompt and strict report parsing**

Create `server/qwen/prompt.js`:

```js
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
```

Create `server/qwen/parser.js`:

```js
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
    const hasArrays = requiredArrayFields.every((field) => Array.isArray(report[field]) && report[field].every((item) => typeof item === "string"));
    return hasStrings && hasArrays ? report : null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Implement injectable provider and HTTP adapter**

Create `server/qwen/provider.js`:

```js
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
```

Create `server/qwen/middleware.js`:

```js
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
```

- [ ] **Step 5: Reduce Vite config to assembly only**

Replace the Qwen implementation in `vite.config.js` with:

```js
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createQwenMiddleware } from "./server/qwen/middleware.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "qwen-local-proxy",
        configureServer(server) {
          server.middlewares.use(createQwenMiddleware(env));
        }
      }
    ]
  };
});
```

- [ ] **Step 6: Run tests and build to verify GREEN**

Run:

```bash
npx vitest run server/qwen/qwen.test.js
npm run build
```

Expected: parser/prompt/provider tests pass and Vite loads the extracted middleware during build configuration.

### Task 4: Introduce The Browser Diagnosis Service

**Files:**
- Create: `src/services/diagnosisProvider.js`
- Create: `src/services/diagnosisProvider.test.js`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write a failing service contract test**

Create `src/services/diagnosisProvider.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify RED**

Run:

```bash
npx vitest run src/services/diagnosisProvider.test.js
```

Expected: FAIL because `requestDiagnosis` has not yet been extracted.

- [ ] **Step 3: Implement the browser-only service**

Create `src/services/diagnosisProvider.js`:

```js
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
```

Update the existing application shell logic in `src/App.jsx` to import the service and remove direct `fetch` use:

```js
import { requestDiagnosis } from "./services/diagnosisProvider.js";

async function runQwenDiagnosis(scenario, fallback, contextOverrides = {}) {
  setProviderState({ status: "loading", label: t.generation.loading });
  try {
    const report = await requestDiagnosis(buildDiagnosisContext(scenario, locale, contextOverrides));
    setReports((prev) => ({ ...prev, [scenario]: report }));
    setProviderState({ status: "success", label: t.generation.success });
  } catch {
    setReports((prev) => ({ ...prev, [scenario]: fallback }));
    setProviderState({ status: "error", label: t.generation.fallback });
  }
}
```

- [ ] **Step 4: Run service tests and build to verify GREEN**

Run:

```bash
npx vitest run src/services/diagnosisProvider.test.js
npm run build
```

Expected: service tests pass and the current monolithic UI still builds through the service.

### Task 5: Split Shared UI, Features, And App Shell Without Behavior Changes

**Files:**
- Create: `src/app/App.jsx`
- Create: `src/app/navigation.js`
- Create: `src/components/controls/Controls.jsx`
- Create: `src/components/data-display/DataDisplay.jsx`
- Create: `src/components/layout/PageIntro.jsx`
- Create: `src/features/overview/OverviewPage.jsx`
- Create: `src/features/advertiser/AdvertiserPage.jsx`
- Create: `src/features/developer/DeveloperPage.jsx`
- Create: `src/features/operations/OperationsPage.jsx`
- Create: `src/features/followup/FollowupPage.jsx`
- Create: `src/app/App.test.jsx`
- Modify: `src/main.jsx`
- Delete: `src/App.jsx`

- [ ] **Step 1: Write failing app-level tests against the new app-shell boundary**

Create `src/app/App.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import App from "./App.jsx";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("shows mock fallback when the embedded diagnosis endpoint fails", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: "no key" })
  }));
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByTestId("nav-advertiser"));
  await user.click(screen.getByTestId("run-diagnosis"));

  expect(await screen.findByText("生成暂不可用，已展示模拟辅助结果")).toBeInTheDocument();
  expect(screen.getByText(/近 7 日 CPA 上升 28%/)).toBeInTheDocument();
});

test("accepts an advertiser recommendation and opens follow-up tracking", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByTestId("nav-advertiser"));
  await user.click(screen.getByTestId("accept-recommendation"));

  expect(screen.getByText("建议闭环追踪")).toBeInTheDocument();
  expect(screen.getByText("已采纳")).toBeInTheDocument();
});

test("switches the experience to English", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByTestId("segment-en"));
  expect(screen.getByText("Business Workflow Efficiency Overview")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify RED due to absent `src/app/App.jsx`**

Run:

```bash
npx vitest run src/app/App.test.jsx
```

Expected: FAIL because the new app-shell module does not exist.

- [ ] **Step 3: Move shared UI functions without changing markup or CSS class names**

Perform this literal component move manifest. Change the leading `function` keyword only to `export function`; retain the complete JSX body, `data-testid` attributes, class names, button wiring, strings and SVG drawing logic:

| Current source symbol | Destination |
| --- | --- |
| `Segment`, `SelectField`, `DateField`, `FilterBar`, `FilterPill` | `src/components/controls/Controls.jsx` |
| `PageIntro` | `src/components/layout/PageIntro.jsx` |
| `MetricGrid`, `RuleMechanism`, `AiFitPanel`, `ValueMetrics`, `ActionBar`, `DiagnosisReport`, `ReportBlock`, `PanelTitle`, `DataTable`, `MultiLineChart`, `StatusBadge` | `src/components/data-display/DataDisplay.jsx` |

Add only these non-feature dependencies after moving:

```jsx
// src/components/controls/Controls.jsx
import { Sparkles } from "lucide-react";

// src/components/data-display/DataDisplay.jsx
import { AlertTriangle, Cpu, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { valueMetrics } from "../../domain/fixtures.js";
```

The implementation is a literal extraction: keep the current JSX, event wiring, `data-testid` attributes, class names, strings, and SVG rendering unchanged.

- [ ] **Step 4: Move feature pages and preserve their props**

Perform this literal feature move manifest. Retain each full JSX body and props; apply only the stated export rename and imports required by identifiers used in that body:

| Current source symbol | Destination and exported name |
| --- | --- |
| `Overview` at lines 631-699 | `src/features/overview/OverviewPage.jsx` as `OverviewPage` |
| `AdvertiserPage` at lines 701-770 | `src/features/advertiser/AdvertiserPage.jsx` as `AdvertiserPage` |
| `DeveloperPage` at lines 772-837 | `src/features/developer/DeveloperPage.jsx` as `DeveloperPage` |
| `CopilotPage` at lines 839-912 | `src/features/operations/OperationsPage.jsx` as `OperationsPage` |
| `FollowupPage` at lines 914-950 | `src/features/followup/FollowupPage.jsx` as `FollowupPage` |

Required feature-domain imports are:

```jsx
// src/features/advertiser/AdvertiserPage.jsx
import { makeAdvertiserView } from "../../domain/diagnosis/advertiser.js";

// src/features/developer/DeveloperPage.jsx
import { makeDeveloperView } from "../../domain/diagnosis/developer.js";

// src/features/operations/OperationsPage.jsx
import { makeCopilotReport } from "../../domain/diagnosis/shared.js";
import { operationsQueue } from "../../domain/fixtures.js";

// src/features/followup/FollowupPage.jsx
import { followMetricData } from "../../domain/fixtures.js";
```

For each feature file, add the icon and shared control/data-display/layout imports required by the identifiers in its moved JSX. No feature may directly import `requestDiagnosis`; that remains app-shell orchestration.

- [ ] **Step 5: Create the thin application shell**

Create `src/app/navigation.js`:

```js
import { Activity, Bot, ClipboardCheck, Target, Video } from "lucide-react";

export function makeNavigation(t) {
  return [
    ["overview", t.nav.overview, Activity],
    ["advertiser", t.nav.advertiser, Target],
    ["developer", t.nav.developer, Video],
    ["copilot", t.nav.copilot, Bot],
    ["followup", t.nav.followup, ClipboardCheck]
  ];
}
```

Create `src/app/App.jsx` by moving the exact app-shell JSX and state management from the current `App` function, with these module imports:

```jsx
import { Check, Globe2, RefreshCw, ShieldCheck, Sparkles, UserRoundCog } from "lucide-react";
import { useState } from "react";
import { Segment } from "../components/controls/Controls.jsx";
import { copy } from "../domain/copy.js";
import { buildDiagnosisContext } from "../domain/diagnosis/context.js";
import { followMetricData } from "../domain/fixtures.js";
import { AdvertiserPage } from "../features/advertiser/AdvertiserPage.jsx";
import { DeveloperPage } from "../features/developer/DeveloperPage.jsx";
import { FollowupPage } from "../features/followup/FollowupPage.jsx";
import { OperationsPage } from "../features/operations/OperationsPage.jsx";
import { OverviewPage } from "../features/overview/OverviewPage.jsx";
import { requestDiagnosis } from "../services/diagnosisProvider.js";
import { makeNavigation } from "./navigation.js";
```

Within that moved function:

- Use `const nav = makeNavigation(t);`.
- Use the Task 4 `runQwenDiagnosis` body.
- Replace page constructors only by the renamed imports: `<OverviewPage />` and `<OperationsPage />`.
- Render page selection directly rather than retaining the current unnecessary `useMemo`; it carries no expensive computation and currently captures a newly created callback on every render.
- Preserve all existing global shell JSX and `data-testid` attributes.

Update `src/main.jsx`:

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Delete `src/App.jsx` only after every moved export is imported from its destination and `rg "from \"./App.jsx\"|src/App.jsx"` shows no remaining dependency.

- [ ] **Step 6: Run app tests and complete verification for the split**

Run:

```bash
npx vitest run src/app/App.test.jsx
npm run test
npm run build
```

Expected: app interaction tests pass, all earlier domain/server/service tests pass, and the module-split application builds without changing UI class names or style imports.

### Task 6: Implement The Approved Light Operations-Console Surface

**Files:**
- Modify: `src/styles.css`
- Modify: `src/features/overview/OverviewPage.jsx` only if required to group existing blocks in the approved first-viewport hierarchy

- [ ] **Step 1: Record the approved concept and the pre-change browser baseline**

Use the selected concept image:

```text
/Users/eureka/.codex/generated_images/019e691e-d619-7a10-ace9-30a972b442cd/ig_0600368c6b99789f016a16d6b7cb148196830ecdd6374a7419.png
```

Retain the pre-change screenshot already taken from `http://localhost:5173/` as baseline evidence. Compare the concept and baseline against these concrete points:

- warm clean canvas versus current grid background;
- compact title/tool controls versus current oversized header;
- executive summary plus KPI hierarchy versus equal-weight panels;
- low-shadow bordered card system and restrained accent use;
- readable desktop and narrow-screen behavior.

- [ ] **Step 2: Implement shared visual tokens and component styling**

Update `src/styles.css` without changing data or interaction behavior:

- Introduce CSS custom properties for canvas, sidebar, surface, border, text, muted text, lime action, teal accent, warning/success colors, radius and shadow.
- Remove the background grid from `body` and use a warm off-white application canvas.
- Refine the sidebar, selected navigation, top controls, KPI cards, panels, tables, charts, report blocks and follow-up states to conform to the concept.
- Reduce excess top-header visual dominance while preserving all title and switch content.
- Maintain semantic focus/hover states and adequate contrast.
- Adjust responsive rules so side navigation, panels, controls and primary actions remain usable at narrow viewport.

- [ ] **Step 3: Make only the minimal Overview composition adjustment needed for hierarchy**

If CSS alone cannot represent the selected overview hierarchy, adjust `src/features/overview/OverviewPage.jsx` only by reordering or grouping its existing blocks. Keep existing translated labels and fixture values; do not invent a pending queue, new chart or new KPI merely because the concept contains one.

- [ ] **Step 4: Capture implementation screenshots for later fidelity verification**

After the visual edits are applied, use the Browser plugin to capture:

- Overview at desktop viewport.
- Advertiser diagnosis after navigating from Overview.
- Overview or Advertiser at a narrow viewport.

Expected: screenshot evidence is available for the final reference-versus-render comparison and shows no clipping, overlay or inaccessible action.

### Task 7: Make The Quality Baseline Clean And Document It

**Files:**
- Modify: `README.md`
- Modify: extracted source/test files only if ESLint identifies narrowly scoped issues

- [ ] **Step 1: Run lint and make only required code corrections**

Run:

```bash
npm run lint
```

Expected initially: either PASS or focused errors such as unused imports from the extraction. Fix each reported source/test issue by removing only the unused import/variable or satisfying an applicable hooks rule; do not perform general reformatting or product changes. Re-run until exit code is `0`.

- [ ] **Step 2: Document the new module boundaries, visual direction and commands**

Append to `README.md` below the local running/build instructions:

````markdown
## 工程结构

- `src/app/`：应用壳与全局交互状态。
- `src/features/`：广告主、开发者、运营与闭环追踪页面。
- `src/components/`：跨页面复用的展示与输入组件。
- `src/domain/`：文案、模拟数据和可测试的诊断计算。
- `src/services/`：浏览器端诊断请求适配。
- `server/qwen/`：本地 Qwen prompt、响应解析、provider 和 Vite 中间件。

Qwen 接入仍为可选增强。未配置 `QWEN_API_KEY` 或请求失败时，页面会继续展示稳定的模拟诊断结果并标明回退状态。

界面采用明亮运营控制台方向：暖白工作区、深森林绿侧栏、克制的酸橙操作强调与统一的证据/人工确认层级。

## 工程验证

```bash
npm run lint
npm run test
npm run build
```
````

- [ ] **Step 3: Run the complete command quality baseline**

Run:

```bash
npm run lint
npm run test
npm run build
```

Expected: lint has zero errors, Vitest reports all domain/server/service/app tests passing, and Vite completes a production build.

### Task 8: Perform Rendered Demo And Fidelity Verification

**Files:**
- No intended code changes; correct only verified regressions within already refactored modules if discovered.

- [ ] **Step 1: Load the Browser testing workflow before browser interaction**

Read and follow:

```text
/Users/eureka/.codex/plugins/cache/openai-bundled/browser/26.519.81530/skills/browser/SKILL.md
/Users/eureka/.codex/plugins/cache/openai-curated/build-web-apps/603a6e80/skills/frontend-testing-debugging/SKILL.md
```

- [ ] **Step 2: Start the local app and inspect the primary flow in the in-app Browser plugin**

Run:

```bash
npm run dev
```

Open its reported local URL in Browser and verify:

1. Overview renders the three workflow entry cards and opens Advertiser Diagnosis.
2. Clicking `生成 AI 解释` without a configured key produces the Chinese mock fallback notice and keeps the report visible.
3. Clicking `标记建议已采纳` opens `建议闭环追踪` with `已采纳` visible for the advertiser item.
4. Switching to `English` displays `Business Workflow Efficiency Overview` or the corresponding English page title.
5. Operations navigation displays the report-assistance task templates and existing report output.
6. At a narrow viewport, there is no blocking horizontal overflow or inaccessible primary action in the tested flow.

Use `view_image` on both the approved concept and the latest desktop implementation screenshot. Keep a short fidelity ledger covering at least: palette, sidebar/header hierarchy, panel/container style, KPI/workflow density, typography/spacing, and narrow-screen behavior.

Expected: the approved five-minute demo behavior remains usable; no console-breaking errors appear; visual differences from the concept are either corrected or documented as deliberate because existing product data must be retained.

- [ ] **Step 3: Stop the development server and run final fresh verification**

Stop the `npm run dev` process, then run:

```bash
npm run lint
npm run test
npm run build
git diff --stat
git status --short --branch
```

Expected: all three quality commands succeed; the diff contains the approved refactor, tests, lint/tooling, README, design document and plan document only, with no generated `dist/` tracked.

## Plan Self-Review

- **Spec coverage:** Tasks 2, 4 and 5 cover frontend modularization and fallback/closed-loop behavior; Task 3 covers provider extraction; Task 1 and Task 7 cover Vitest/ESLint/build and README; Task 6 implements the approved visual direction; Task 8 covers rendered demo and concept fidelity verification.
- **Scope check:** All work remains within a single maintainability and approved-visual refactor; it does not add product capability, new routes or new state systems.
- **Contract consistency:** The front-end service resolves `report`; the app shell owns fallback; server provider resolves `{ provider, model, report }`; middleware exposes that result under the existing `/api/qwen-diagnosis` endpoint.
- **Test-first checkpoints:** Each newly testable extraction boundary is first imported by a focused test that must fail because its destination module does not exist, then created from current behavior and re-run green.
- **Mechanical extraction detail:** Large translations and JSX bodies are intentionally referenced through exact existing symbols and source positions instead of being transcribed into this plan; execution moves those bodies verbatim and tests protect observable behavior.
