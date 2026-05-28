import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import App from "./App.jsx";

afterEach(() => {
  cleanup();
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

  expect(screen.getByText("AI-assisted Diagnosis Summary")).toBeInTheDocument();
});

test("renders the approved operations-console overview structure", () => {
  render(<App />);

  expect(screen.getByText("AI 辅助诊断摘要")).toBeInTheDocument();
  expect(screen.getByText("待人工确认 (5)")).toBeInTheDocument();
  expect(screen.getByText("趋势图表（模拟）")).toBeInTheDocument();
});
