import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cpu,
  FileText,
  Globe2,
  LineChart,
  MessageSquareText,
  MonitorCheck,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCog,
  Users,
  Video
} from "lucide-react";
import React, { useMemo, useState } from "react";

const copy = {
  zh: {
    appName: "海外广告联盟 AI 诊断与提效平台",
    appShort: "Ad Network AI Copilot",
    subtitle: "海外投放与流量变现健康度工作台",
    mockDate: "数据日期：2026-05-21",
    role: "角色",
    language: "语言",
    roles: {
      advertiser: "广告主",
      developer: "开发者",
      operator: "内部运营"
    },
    generation: {
      loading: "正在生成诊断报告...",
      success: "诊断报告已更新",
      fallback: "生成暂不可用，已展示最近一次报告"
    },
    nav: {
      overview: "总览",
      advertiser: "广告主诊断",
      developer: "开发者诊断",
      copilot: "运营 Copilot",
      followup: "闭环追踪"
    },
    overview: {
      title: "今日诊断工作台",
      desc: "集中查看广告主投放、开发者变现和客户运营中的关键异常，快速定位影响范围并推进处理。",
      anomalies: "待处理异常",
      reports: "诊断报告",
      review: "待处理建议",
      monitoring: "观察中指标",
      flowTitle: "处理进展",
      flow: ["发现异常", "定位影响", "查看建议", "推进处理", "效果回看"],
      roleTitle: "三类核心用户",
      advertiserDesc: "诊断 CPA、ROAS、预算利用率和素材衰退。",
      developerDesc: "诊断广告收入、填充率、eCPM 和广告源异常。",
      operatorDesc: "生成周报、异常复盘、对外话术和内部备注。"
    },
    filters: {
      account: "广告账户",
      campaign: "广告计划",
      app: "App",
      placement: "广告位",
      country: "国家 / 地区",
      source: "广告源",
      range: "时间范围",
      issue: "问题类型",
      task: "任务模板",
      context: "关联上下文",
      output: "输出语言",
      extra: "补充要求"
    },
    advertiser: {
      title: "广告主投放诊断",
      desc: "案例：海外手游广告主在美国市场近 7 日 CPA 上升、ROAS 下降。",
      account: "Galaxy Quest Studio",
      campaign: "US RPG User Acquisition",
      range: "近 7 日 vs 前 7 日",
      issue: "CPA 上升 / ROAS 下降",
      trends: "核心趋势",
      breakdown: "维度拆解",
      country: "国家表现",
      creative: "素材表现",
      report: "诊断报告",
      run: "生成诊断",
      summary: "近 7 日 CPA 上升 28%，ROAS 下降 18%。CTR 基本稳定，但 CVR 从 5.1% 降至 3.4%，主要影响来自美国市场的 Boss Battle Reward Video 素材。",
      cause1: "CVR 显著下降，问题更可能发生在落地页、转化回传或用户匹配环节。",
      cause2: "核心素材进入疲劳期，点击质量下降，但 CTR 尚未明显下滑。",
      rec1: "优先检查美国落地页加载速度与转化回传链路。",
      rec2: "测试与素材卖点一致性更强的落地页版本。",
      rec3: "为 Boss Battle Reward Video 准备 2 个新素材变体，观察 48 小时 CVR。",
      risk: "在确认转化回传前，不建议直接提高预算，避免放大无效消耗。"
    },
    developer: {
      title: "开发者收益诊断",
      desc: "案例：巴西地区激励视频广告收入下降，请求量稳定但填充率下滑。",
      app: "Puzzle Island",
      placement: "Rewarded Video - Level Complete",
      country: "Brazil",
      source: "All Sources",
      range: "昨日 vs 前日",
      trends: "收益趋势",
      breakdown: "维度拆解",
      sources: "广告源表现",
      report: "诊断报告",
      run: "生成诊断",
      summary: "昨日广告收入下降 18%，主要来自巴西地区激励视频广告位。请求量基本稳定，但填充率从 82% 降至 61%，广告源 B 填充下降明显。",
      cause1: "请求量稳定说明流量侧未明显萎缩，收入下降主要由填充率下降驱动。",
      cause2: "广告源 B 在巴西的返回率异常，可能与预算覆盖或国家定向有关。",
      rec1: "检查广告源 B 的预算覆盖、国家定向和返回错误。",
      rec2: "临时提升备用广告源 C 的优先级，降低填充缺口。",
      rec3: "观察未来 24 小时 Fill Rate、Revenue 和 eCPM 是否恢复。",
      risk: "调整瀑布流优先级可能影响 eCPM，需要同步观察收入和单价。"
    },
    copilot: {
      title: "内部运营 Copilot",
      desc: "任务模板优先，自由输入辅助。复用诊断结果生成周报、异常复盘和对外沟通材料。",
      weekly: "生成客户周报",
      review: "生成异常复盘",
      message: "生成对外沟通话术",
      ticket: "总结工单并给出处理建议",
      placeholder: "例如：语气更适合对客户 CEO 汇报，压缩为 3 个要点。",
      generate: "生成内容",
      profile: "客户画像",
      metrics: "核心变化",
      reasons: "异常原因",
      external: "对外沟通话术",
      internal: "内部备注",
      risk: "风险提醒",
      profileText: "Galaxy Quest Studio 是海外手游广告主，当前重点投放美国 RPG 买量计划，目标为提升付费转化和 7 日 ROAS。",
      metricText: "本周 CPA 上升 28%，ROAS 下降 18%，主要由 CVR 从 5.1% 下滑至 3.4% 导致。",
      reasonText: "CTR 基本稳定，说明点击吸引力未显著恶化；CVR 下滑更可能与落地页、转化回传或用户匹配有关。",
      externalText: "我们已定位到本周成本上升主要来自美国市场转化率波动，建议先检查落地页加载和转化回传链路，同时准备新的素材与落地页组合测试。",
      internalText: "建议客户成功团队先确认 MMP 回传延迟和落地页变更记录，再讨论预算调整。",
      riskText: "不要在转化链路未确认前承诺预算放量效果。"
    },
    followup: {
      title: "建议闭环追踪",
      desc: "跟进优化建议的处理状态，查看关键指标在 24 小时或 7 天内的变化。",
      status: "状态",
      source: "来源",
      priority: "优先级",
      owner: "负责人",
      window: "观察窗口",
      before: "采纳前",
      after: "当前",
      result: "结果",
      improved: "改善",
      monitoring: "观察中",
      accepted: "已采纳",
      rejected: "暂不采纳",
      review: "需要复核",
      markAccepted: "标记采纳",
      markReview: "标记复核",
      markRejected: "暂不采纳"
    },
    report: {
      evidence: "证据数据",
      causes: "可能原因",
      recommendations: "建议动作",
      risk: "风险提示",
      watch: "后续观察指标",
      confidence: "置信度",
      high: "高",
      medium: "中",
      manual: "需要复核"
    }
  },
  en: {
    appName: "Overseas Ad Network AI Diagnosis Platform",
    appShort: "Ad Network AI Copilot",
    subtitle: "Campaign and monetization health workspace",
    mockDate: "Data date: 2026-05-21",
    role: "Role",
    language: "Language",
    roles: {
      advertiser: "Advertiser",
      developer: "Developer",
      operator: "Operator"
    },
    generation: {
      loading: "Generating diagnosis report...",
      success: "Diagnosis report updated",
      fallback: "Generation is temporarily unavailable. Showing the latest saved report."
    },
    nav: {
      overview: "Overview",
      advertiser: "Advertiser Diagnosis",
      developer: "Developer Diagnosis",
      copilot: "Operation Copilot",
      followup: "Follow-up Tracker"
    },
    overview: {
      title: "Diagnosis Workbench",
      desc: "Monitor advertiser performance, developer monetization, and customer operations in one workspace, then move issues from detection to recovery.",
      anomalies: "Open anomalies",
      reports: "Diagnosis reports",
      review: "Pending actions",
      monitoring: "Metrics monitored",
      flowTitle: "Issue progress",
      flow: ["Detect issue", "Scope impact", "Review actions", "Move forward", "Track recovery"],
      roleTitle: "Core users",
      advertiserDesc: "Diagnose CPA, ROAS, budget utilization, and creative fatigue.",
      developerDesc: "Diagnose revenue, fill rate, eCPM, and ad source issues.",
      operatorDesc: "Generate weekly reports, incident reviews, external messages, and internal notes."
    },
    filters: {
      account: "Ad account",
      campaign: "Campaign",
      app: "App",
      placement: "Placement",
      country: "Country / Region",
      source: "Ad source",
      range: "Time range",
      issue: "Issue type",
      task: "Task template",
      context: "Linked context",
      output: "Output language",
      extra: "Extra instruction"
    },
    advertiser: {
      title: "Advertiser Performance Diagnosis",
      desc: "Case: a mobile game advertiser sees CPA increase and ROAS decline in the US market over the last 7 days.",
      account: "Galaxy Quest Studio",
      campaign: "US RPG User Acquisition",
      range: "Last 7 days vs previous 7 days",
      issue: "CPA increase / ROAS decline",
      trends: "Core trends",
      breakdown: "Dimension breakdown",
      country: "Country performance",
      creative: "Creative performance",
      report: "Diagnosis report",
      run: "Generate diagnosis",
      summary: "CPA increased by 28% and ROAS declined by 18% over the last 7 days. CTR stayed stable, while CVR dropped from 5.1% to 3.4%. The main impact comes from the Boss Battle Reward Video creative in the US.",
      cause1: "CVR declined significantly, so the issue is more likely in landing page performance, conversion postback, or audience match.",
      cause2: "The core creative is entering fatigue. Click quality is weakening even though CTR has not dropped sharply.",
      rec1: "Check US landing page load speed and conversion postback first.",
      rec2: "Test a landing page version that better matches the creative promise.",
      rec3: "Prepare two new variants for Boss Battle Reward Video and monitor CVR for 48 hours.",
      risk: "Do not increase budget before conversion tracking is verified, otherwise inefficient spend may be amplified."
    },
    developer: {
      title: "Developer Revenue Diagnosis",
      desc: "Case: rewarded video revenue in Brazil declines while request volume stays stable and fill rate drops.",
      app: "Puzzle Island",
      placement: "Rewarded Video - Level Complete",
      country: "Brazil",
      source: "All Sources",
      range: "Yesterday vs previous day",
      trends: "Revenue trends",
      breakdown: "Dimension breakdown",
      sources: "Ad source performance",
      report: "Diagnosis report",
      run: "Generate diagnosis",
      summary: "Yesterday's ad revenue declined by 18%, mainly from the rewarded video placement in Brazil. Requests were stable, but fill rate dropped from 82% to 61%, with Ad Source B showing the sharpest fill decline.",
      cause1: "Stable requests indicate the traffic side is not shrinking. Revenue decline is mainly driven by fill rate loss.",
      cause2: "Ad Source B has abnormal response coverage in Brazil, possibly related to budget coverage or geo targeting.",
      rec1: "Check Ad Source B budget coverage, geo targeting, and response errors.",
      rec2: "Temporarily raise backup Ad Source C priority to reduce the fill gap.",
      rec3: "Monitor Fill Rate, Revenue, and eCPM over the next 24 hours.",
      risk: "Changing waterfall priority may affect eCPM, so revenue and price should be monitored together."
    },
    copilot: {
      title: "Operation Copilot",
      desc: "Template-first tasks with optional free input. It reuses diagnosis results to generate weekly reports, incident reviews, and customer-ready messages.",
      weekly: "Generate weekly report",
      review: "Generate incident review",
      message: "Generate external message",
      ticket: "Summarize ticket with action plan",
      placeholder: "Example: make it suitable for a customer CEO and compress into 3 bullets.",
      generate: "Generate content",
      profile: "Customer profile",
      metrics: "Core changes",
      reasons: "Root cause summary",
      external: "External message",
      internal: "Internal notes",
      risk: "Risk reminder",
      profileText: "Galaxy Quest Studio is a mobile game advertiser focused on US RPG user acquisition, paid conversion, and D7 ROAS.",
      metricText: "This week CPA increased by 28% and ROAS declined by 18%, mainly driven by CVR dropping from 5.1% to 3.4%.",
      reasonText: "CTR stayed stable, so click appeal has not clearly deteriorated. CVR loss points more toward landing page, postback, or audience match issues.",
      externalText: "We have identified that this week's cost increase is mainly related to conversion rate volatility in the US market. We recommend checking landing page loading and conversion postback first, while preparing new creative and landing page combinations for testing.",
      internalText: "Customer success should verify MMP postback delay and landing page change logs before discussing any budget adjustment.",
      riskText: "Do not promise scaling impact before the conversion path is confirmed."
    },
    followup: {
      title: "Recommendation Follow-up Tracker",
      desc: "Track recommendation status and review key metric movement over the next 24 hours or 7 days.",
      status: "Status",
      source: "Source",
      priority: "Priority",
      owner: "Owner",
      window: "Window",
      before: "Before",
      after: "Current",
      result: "Result",
      improved: "Improved",
      monitoring: "Monitoring",
      accepted: "Accepted",
      rejected: "Rejected",
      review: "Needs Review",
      markAccepted: "Accept",
      markReview: "Needs review",
      markRejected: "Reject"
    },
    report: {
      evidence: "Evidence",
      causes: "Possible causes",
      recommendations: "Recommendations",
      risk: "Risk",
      watch: "Watch metrics",
      confidence: "Confidence",
      high: "High",
      medium: "Medium",
      manual: "Human review required"
    }
  }
};

const series = {
  advertiser: [
    { label: "D-6", cpa: 3.05, roas: 1.84, cvr: 5.1, ctr: 3.0 },
    { label: "D-5", cpa: 3.12, roas: 1.79, cvr: 4.9, ctr: 3.1 },
    { label: "D-4", cpa: 3.22, roas: 1.72, cvr: 4.5, ctr: 3.0 },
    { label: "D-3", cpa: 3.48, roas: 1.61, cvr: 4.0, ctr: 2.9 },
    { label: "D-2", cpa: 3.76, roas: 1.52, cvr: 3.7, ctr: 3.0 },
    { label: "D-1", cpa: 3.86, roas: 1.49, cvr: 3.5, ctr: 3.0 },
    { label: "D", cpa: 3.9, roas: 1.51, cvr: 3.4, ctr: 3.0 }
  ],
  developer: [
    { label: "00:00", revenue: 1680, fill: 82, ecpm: 4.9 },
    { label: "04:00", revenue: 1620, fill: 78, ecpm: 4.8 },
    { label: "08:00", revenue: 1510, fill: 72, ecpm: 4.7 },
    { label: "12:00", revenue: 1440, fill: 68, ecpm: 4.7 },
    { label: "16:00", revenue: 1370, fill: 62, ecpm: 4.6 },
    { label: "20:00", revenue: 1380, fill: 61, ecpm: 4.6 }
  ]
};

const advertiserMetrics = [
  ["Spend", "$33.8K", "+4%", "neutral"],
  ["CTR", "3.0%", "-1%", "neutral"],
  ["CVR", "3.4%", "-33%", "bad"],
  ["CPA", "$3.90", "+28%", "bad"],
  ["ROAS", "1.51", "-18%", "bad"],
  ["Budget Util.", "96%", "+2%", "good"]
];

const developerMetrics = [
  ["Requests", "2.84M", "+1%", "neutral"],
  ["Fill Rate", "61%", "-21 pts", "bad"],
  ["Show Rate", "90%", "-2 pts", "neutral"],
  ["eCPM", "$4.60", "-6%", "neutral"],
  ["Revenue", "$7.84K", "-18%", "bad"],
  ["Load Time", "2.3s", "+0.4s", "warn"]
];

const countryRows = [
  ["United States", "$3.90", "3.4%", "68%", "High"],
  ["Brazil", "$2.10", "4.8%", "12%", "Medium"],
  ["Indonesia", "$1.46", "5.4%", "7%", "Low"]
];

const creativeRows = [
  ["Boss Battle Reward Video", "3.1%", "3.2%", "+31%", "High"],
  ["Hero Upgrade Interstitial", "2.7%", "4.4%", "+9%", "Medium"],
  ["Guild Raid Playable", "3.4%", "5.0%", "-2%", "Low"]
];

const sourceRows = [
  ["Ad Source B", "52%", "$4.80", "-28%", "High"],
  ["Ad Source C", "76%", "$4.30", "+4%", "Medium"],
  ["Ad Source A", "81%", "$4.90", "-3%", "Low"]
];

const followMetricData = [
  {
    id: "adv-rec-1",
    source: "Advertiser Diagnosis",
    title: {
      zh: "检查美国落地页加载速度与转化回传",
      en: "Check US landing page load speed and conversion postback"
    },
    entity: "Galaxy Quest Studio",
    priority: "High",
    owner: "CS Team",
    window: "7d",
    status: "Needs Review",
    metrics: [
      ["CVR", "3.4%", "4.1%", "Improved"],
      ["CPA", "$3.90", "$3.31", "Improved"],
      ["ROAS", "1.51", "1.68", "Improved"]
    ]
  },
  {
    id: "dev-rec-1",
    source: "Developer Diagnosis",
    title: {
      zh: "临时提升备用广告源 C 的优先级",
      en: "Temporarily raise backup Ad Source C priority"
    },
    entity: "Puzzle Island",
    priority: "High",
    owner: "Monetization Ops",
    window: "24h",
    status: "Needs Review",
    metrics: [
      ["Fill Rate", "61%", "74%", "Improved"],
      ["Revenue", "$7.84K", "$8.92K", "Improved"],
      ["eCPM", "$4.60", "$4.55", "Monitoring"]
    ]
  }
];

function App() {
  const [locale, setLocale] = useState("zh");
  const [role, setRole] = useState("advertiser");
  const [page, setPage] = useState("overview");
  const [task, setTask] = useState("weekly");
  const [providerState, setProviderState] = useState({ status: "idle", label: "" });
  const [reports, setReports] = useState({});
  const [recStatus, setRecStatus] = useState(
    Object.fromEntries(followMetricData.map((item) => [item.id, item.status]))
  );
  const t = copy[locale];

  const nav = [
    ["overview", t.nav.overview, Activity],
    ["advertiser", t.nav.advertiser, Target],
    ["developer", t.nav.developer, Video],
    ["copilot", t.nav.copilot, Bot],
    ["followup", t.nav.followup, ClipboardCheck]
  ];

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    if (nextRole === "advertiser") setPage("advertiser");
    if (nextRole === "developer") setPage("developer");
    if (nextRole === "operator") setPage("copilot");
  }

  async function runQwenDiagnosis(scenario, fallback, contextOverrides = {}) {
    setProviderState({ status: "loading", label: t.generation.loading });
    try {
      const response = await fetch("/api/qwen-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildDiagnosisContext(scenario, locale, contextOverrides))
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Qwen request failed");
      setReports((prev) => ({ ...prev, [scenario]: data.report }));
      setProviderState({ status: "success", label: t.generation.success });
    } catch (error) {
      setReports((prev) => ({ ...prev, [scenario]: fallback }));
      setProviderState({ status: "error", label: t.generation.fallback });
    }
  }

  const content = useMemo(() => {
    if (page === "advertiser") return <AdvertiserPage t={t} locale={locale} report={reports.advertiser} runQwenDiagnosis={runQwenDiagnosis} setPage={setPage} setRecStatus={setRecStatus} />;
    if (page === "developer") return <DeveloperPage t={t} locale={locale} report={reports.developer} runQwenDiagnosis={runQwenDiagnosis} setPage={setPage} setRecStatus={setRecStatus} />;
    if (page === "copilot") return <CopilotPage t={t} task={task} setTask={setTask} report={reports.copilot} runQwenDiagnosis={runQwenDiagnosis} />;
    if (page === "followup") return <FollowupPage t={t} locale={locale} recStatus={recStatus} setRecStatus={setRecStatus} />;
    return <Overview t={t} locale={locale} setRole={setRole} setPage={setPage} />;
  }, [page, t, locale, task, recStatus, reports, providerState]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark"><Sparkles size={20} /></div>
          <div>
            <strong>{t.appShort}</strong>
            <span>POC</span>
          </div>
        </div>
        <nav>
          {nav.map(([id, label, Icon]) => (
            <button key={id} data-testid={`nav-${id}`} className={`navItem ${page === id ? "active" : ""}`} onClick={() => setPage(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{t.appName}</h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="topControls">
            <Segment label={t.role} value={role} onChange={handleRoleChange} options={[
              ["advertiser", t.roles.advertiser],
              ["developer", t.roles.developer],
              ["operator", t.roles.operator]
            ]} />
            <Segment label={t.language} value={locale} onChange={setLocale} options={[
              ["zh", "中文"],
              ["en", "English"]
            ]} />
          </div>
        </header>
        <section className="metaStrip">
          <span><Globe2 size={15} />{t.mockDate}</span>
          <span><UserRoundCog size={15} />{t.roles[role]}</span>
        </section>
        {providerState.status !== "idle" && (
          <div className={`generationNotice ${providerState.status}`} data-testid="generation-notice" data-status={providerState.status} role="status" aria-live="polite">
            {providerState.status === "loading" ? <RefreshCw size={16} className="spinIcon" /> : <Check size={16} />}
            <span>{providerState.label}</span>
          </div>
        )}
        {content}
      </main>
    </div>
  );
}

function Segment({ label, value, onChange, options }) {
  return (
    <div className="segmentWrap">
      <span>{label}</span>
      <div className="segment">
        {options.map(([id, text]) => (
          <button key={id} data-testid={`segment-${id}`} className={value === id ? "selected" : ""} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function Overview({ t, setRole, setPage }) {
  const stats = [
    [t.overview.anomalies, "6", AlertTriangle],
    [t.overview.reports, "18", FileText],
    [t.overview.review, "5", ClipboardCheck],
    [t.overview.monitoring, "12", LineChart]
  ];
  const roles = [
    ["advertiser", t.roles.advertiser, t.overview.advertiserDesc, Target, "advertiser"],
    ["developer", t.roles.developer, t.overview.developerDesc, Users, "developer"],
    ["operator", t.roles.operator, t.overview.operatorDesc, MessageSquareText, "copilot"]
  ];

  return (
    <div className="pageGrid">
      <section className="sectionHeader full">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>{t.overview.title}</h2>
          <p>{t.overview.desc}</p>
        </div>
      </section>
      <div className="statGrid full">
        {stats.map(([label, value, Icon]) => (
          <div className="stat" key={label}>
            <Icon size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <section className="panel span7">
        <PanelTitle icon={RefreshCw} title={t.overview.flowTitle} />
        <div className="flow">
          {t.overview.flow.map((item, index) => (
            <div className="flowStep" key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
              {index < t.overview.flow.length - 1 && <ChevronRight size={18} />}
            </div>
          ))}
        </div>
      </section>
      <section className="panel span5">
        <PanelTitle icon={Users} title={t.overview.roleTitle} />
        <div className="roleCards">
          {roles.map(([id, title, desc, Icon, target]) => (
            <button className="roleCard" key={id} onClick={() => { setRole(id); setPage(target); }}>
              <Icon size={19} />
              <div>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function AdvertiserPage({ t, locale, report, runQwenDiagnosis, setPage, setRecStatus }) {
  const [filters, setFilters] = useState({
    account: "Galaxy Quest Studio",
    campaign: "US RPG User Acquisition",
    country: "United States",
    issue: "CPA increase / ROAS decline",
    startDate: "2026-05-14",
    endDate: "2026-05-20",
    question: locale === "zh" ? "为什么 CPA 上升？请按地区、素材和转化链路拆解。" : "Why did CPA increase? Break it down by country, creative, and conversion path."
  });
  const view = makeAdvertiserView(filters, t, locale);
  const fallback = view.report;
  const activeReport = report || fallback;
  return (
    <div className="pageGrid">
      <PageIntro title={t.advertiser.title} desc={t.advertiser.desc} />
      <section className="controlPanel full">
        <SelectField label={t.filters.account} value={filters.account} options={["Galaxy Quest Studio", "Nova Play Labs", "Dragon Forge Games"]} onChange={(account) => setFilters((prev) => ({ ...prev, account }))} />
        <SelectField label={t.filters.campaign} value={filters.campaign} options={["US RPG User Acquisition", "BR Casual Purchase", "ID Action Retargeting"]} onChange={(campaign) => setFilters((prev) => ({ ...prev, campaign }))} />
        <SelectField label={t.filters.country} value={filters.country} options={["United States", "Brazil", "Indonesia", "Mexico"]} onChange={(country) => setFilters((prev) => ({ ...prev, country }))} />
        <SelectField label={t.filters.issue} value={filters.issue} options={["CPA increase / ROAS decline", "Budget underdelivery", "Creative fatigue", "Conversion anomaly"]} onChange={(issue) => setFilters((prev) => ({ ...prev, issue }))} />
        <DateField label="Start" value={filters.startDate} onChange={(startDate) => setFilters((prev) => ({ ...prev, startDate }))} />
        <DateField label="End" value={filters.endDate} onChange={(endDate) => setFilters((prev) => ({ ...prev, endDate }))} />
        <div className="chatInput">
          <label>{locale === "zh" ? "自定义问题" : "Custom question"}</label>
          <textarea value={filters.question} onChange={(event) => setFilters((prev) => ({ ...prev, question: event.target.value }))} />
        </div>
        <button className="primaryAction" data-testid="run-diagnosis" onClick={() => runQwenDiagnosis("advertiser", fallback, view.context)}><Sparkles size={16} />{t.advertiser.run}</button>
      </section>
      <MetricGrid metrics={view.metrics} />
      <section className="panel span7">
        <PanelTitle icon={LineChart} title={t.advertiser.trends} />
        <MultiLineChart data={view.series} lines={[
          ["cpa", "CPA", "#c2410c"],
          ["roas", "ROAS", "#047857"],
          ["cvr", "CVR", "#1d4ed8"]
        ]} />
      </section>
      <section className="panel span5">
        <PanelTitle icon={BarChart3} title={t.advertiser.country} />
        <DataTable columns={["Country", "CPA", "CVR", "Impact", "Risk"]} rows={view.countryRows} />
      </section>
      <section className="panel span5">
        <PanelTitle icon={MonitorCheck} title={t.advertiser.creative} />
        <DataTable columns={["Creative", "CTR", "CVR", "CPA", "Risk"]} rows={view.creativeRows} />
      </section>
      <DiagnosisReport
        title={t.advertiser.report}
        summary={activeReport.summary}
        causes={activeReport.causes}
        recommendations={activeReport.recommendations}
        evidence={activeReport.evidence}
        watch={activeReport.watch}
        risk={activeReport.risk}
        t={t}
        onAccept={() => {
          setRecStatus((prev) => ({ ...prev, "adv-rec-1": "Accepted" }));
          setPage("followup");
        }}
      />
    </div>
  );
}

function DeveloperPage({ t, locale, report, runQwenDiagnosis, setPage, setRecStatus }) {
  const [filters, setFilters] = useState({
    app: "Puzzle Island",
    placement: "Rewarded Video - Level Complete",
    country: "Brazil",
    source: "All Sources",
    startDate: "2026-05-20",
    endDate: "2026-05-20",
    question: locale === "zh" ? "为什么激励视频收入下降？请按请求量、填充率、展示率和 eCPM 拆解。" : "Why did rewarded video revenue decline? Break it down by requests, fill rate, show rate, and eCPM."
  });
  const view = makeDeveloperView(filters, t, locale);
  const fallback = view.report;
  const activeReport = report || fallback;
  return (
    <div className="pageGrid">
      <PageIntro title={t.developer.title} desc={t.developer.desc} />
      <section className="controlPanel full">
        <SelectField label={t.filters.app} value={filters.app} options={["Puzzle Island", "Merge Chef", "Sky Runner"]} onChange={(app) => setFilters((prev) => ({ ...prev, app }))} />
        <SelectField label={t.filters.placement} value={filters.placement} options={["Rewarded Video - Level Complete", "Interstitial - Game Over", "Rewarded Video - Daily Bonus"]} onChange={(placement) => setFilters((prev) => ({ ...prev, placement }))} />
        <SelectField label={t.filters.country} value={filters.country} options={["Brazil", "Mexico", "Indonesia", "United States"]} onChange={(country) => setFilters((prev) => ({ ...prev, country }))} />
        <SelectField label={t.filters.source} value={filters.source} options={["All Sources", "Ad Source A", "Ad Source B", "Ad Source C"]} onChange={(source) => setFilters((prev) => ({ ...prev, source }))} />
        <DateField label="Start" value={filters.startDate} onChange={(startDate) => setFilters((prev) => ({ ...prev, startDate }))} />
        <DateField label="End" value={filters.endDate} onChange={(endDate) => setFilters((prev) => ({ ...prev, endDate }))} />
        <div className="chatInput">
          <label>{locale === "zh" ? "自定义问题" : "Custom question"}</label>
          <textarea value={filters.question} onChange={(event) => setFilters((prev) => ({ ...prev, question: event.target.value }))} />
        </div>
        <button className="primaryAction" data-testid="run-diagnosis" onClick={() => runQwenDiagnosis("developer", fallback, view.context)}><Sparkles size={16} />{t.developer.run}</button>
      </section>
      <MetricGrid metrics={view.metrics} />
      <section className="panel span7">
        <PanelTitle icon={LineChart} title={t.developer.trends} />
        <MultiLineChart data={view.series} lines={[
          ["revenue", "Revenue", "#0f766e"],
          ["fill", "Fill Rate", "#c2410c"],
          ["ecpm", "eCPM", "#1d4ed8"]
        ]} />
      </section>
      <section className="panel span5">
        <PanelTitle icon={BarChart3} title={t.developer.sources} />
        <DataTable columns={["Ad Source", "Fill Rate", "eCPM", "Revenue", "Impact"]} rows={view.sourceRows} />
      </section>
      <DiagnosisReport
        title={t.developer.report}
        summary={activeReport.summary}
        causes={activeReport.causes}
        recommendations={activeReport.recommendations}
        evidence={activeReport.evidence}
        watch={activeReport.watch}
        risk={activeReport.risk}
        t={t}
        onAccept={() => {
          setRecStatus((prev) => ({ ...prev, "dev-rec-1": "Accepted" }));
          setPage("followup");
        }}
      />
    </div>
  );
}

function CopilotPage({ t, task, setTask, report, runQwenDiagnosis }) {
  const fallback = makeCopilotReport(t);
  const activeReport = report || fallback;
  const tasks = [
    ["weekly", t.copilot.weekly, FileText],
    ["review", t.copilot.review, AlertTriangle],
    ["message", t.copilot.message, Send],
    ["ticket", t.copilot.ticket, ClipboardCheck]
  ];
  return (
    <div className="pageGrid">
      <PageIntro title={t.copilot.title} desc={t.copilot.desc} />
      <section className="panel span4">
        <PanelTitle icon={Bot} title={t.filters.task} />
        <div className="taskList">
          {tasks.map(([id, label, Icon]) => (
            <button className={`taskButton ${task === id ? "active" : ""}`} key={id} onClick={() => setTask(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="panel span8">
        <PanelTitle icon={MessageSquareText} title="Context" />
        <div className="copilotInputs">
          <FilterPill label={t.filters.context} value="Galaxy Quest Studio / CPA Diagnosis" />
          <FilterPill label={t.filters.range} value="2026-05-14 - 2026-05-20" />
          <FilterPill label={t.filters.output} value="中文 / English" />
        </div>
        <textarea placeholder={t.copilot.placeholder} />
        <button className="primaryAction" onClick={() => runQwenDiagnosis("copilot", fallback)}><Sparkles size={16} />{t.copilot.generate}</button>
      </section>
      <section className="panel full">
        <PanelTitle icon={FileText} title="Generated Output" />
        <div className="copilotOutput">
          {[
            [t.copilot.profile, activeReport.profile || t.copilot.profileText],
            [t.copilot.metrics, activeReport.metrics || t.copilot.metricText],
            [t.copilot.reasons, activeReport.summary || t.copilot.reasonText],
            [t.copilot.external, activeReport.externalMessage || activeReport.recommendations?.join(" ") || t.copilot.externalText],
            [t.copilot.internal, activeReport.internalNotes || activeReport.causes?.join(" ") || t.copilot.internalText],
            [t.copilot.risk, activeReport.risk || t.copilot.riskText]
          ].map(([label, text]) => (
            <div key={label}>
              <strong>{label}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FollowupPage({ t, locale, recStatus, setRecStatus }) {
  return (
    <div className="pageGrid">
      <PageIntro title={t.followup.title} desc={t.followup.desc} />
      <section className="panel full">
        <div className="followList">
          {followMetricData.map((item) => (
            <div className="followItem" key={item.id}>
              <div className="followHead">
                <div>
                  <span className="sourceTag">{item.source}</span>
                  <h3>{item.title[locale]}</h3>
                  <p>{item.entity} · {t.followup.owner}: {item.owner} · {t.followup.window}: {item.window}</p>
                </div>
                <StatusBadge status={recStatus[item.id]} t={t} />
              </div>
              <div className="statusActions">
                <button onClick={() => setRecStatus((prev) => ({ ...prev, [item.id]: "Accepted" }))}><Check size={15} />{t.followup.markAccepted}</button>
                <button onClick={() => setRecStatus((prev) => ({ ...prev, [item.id]: "Needs Review" }))}><ShieldCheck size={15} />{t.followup.markReview}</button>
                <button onClick={() => setRecStatus((prev) => ({ ...prev, [item.id]: "Rejected" }))}><AlertTriangle size={15} />{t.followup.markRejected}</button>
              </div>
              <div className="observationGrid">
                {item.metrics.map(([metric, before, after, result]) => (
                  <div className="observation" key={metric}>
                    <span>{metric}</span>
                    <strong>{`${before} -> ${after}`}</strong>
                    <em className={result === "Improved" ? "good" : "neutral"}>{result === "Improved" ? t.followup.improved : t.followup.monitoring}</em>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PageIntro({ title, desc }) {
  return (
    <section className="sectionHeader full">
      <div>
        <p className="eyebrow">POC Module</p>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </section>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <label className="field compact">
      <span>{label}</span>
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function FilterBar({ items, cta, onRun }) {
  return (
    <section className="filterBar full">
      <div className="filterGrid">
        {items.map(([label, value]) => <FilterPill key={label} label={label} value={value} />)}
      </div>
      <button className="primaryAction" data-testid="run-diagnosis" onClick={onRun}><Sparkles size={16} />{cta}</button>
    </section>
  );
}

function FilterPill({ label, value }) {
  return (
    <div className="filterPill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MetricGrid({ metrics }) {
  return (
    <div className="metricGrid full">
      {metrics.map(([label, value, change, tone]) => (
        <div className={`metric ${tone}`} key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <em>{change}</em>
        </div>
      ))}
    </div>
  );
}

function DiagnosisReport({ title, summary, evidence, causes, recommendations, watch, risk, t, onAccept }) {
  return (
    <section className="panel span7 reportPanel">
      <PanelTitle icon={Sparkles} title={title} />
      <p className="summary">{summary}</p>
      <ReportBlock title={t.report.evidence} items={evidence} />
      <ReportBlock title={t.report.causes} items={causes} />
      <ReportBlock title={t.report.recommendations} items={recommendations} numbered />
      <div className="riskBox"><AlertTriangle size={17} />{risk}</div>
      <div className="watchList">
        <strong>{t.report.watch}</strong>
        {watch.map((item) => <span key={item}>{item}</span>)}
      </div>
      <button className="primaryAction" data-testid="accept-recommendation" onClick={onAccept}><Check size={16} />{t.followup.markAccepted}</button>
    </section>
  );
}

function ReportBlock({ title, items, numbered }) {
  return (
    <div className="reportBlock">
      <strong>{title}</strong>
      <ul>
        {items.map((item, index) => <li key={item}>{numbered ? `${index + 1}. ` : ""}{item}</li>)}
      </ul>
    </div>
  );
}

function PanelTitle({ icon: Icon, title }) {
  return (
    <div className="panelTitle">
      <Icon size={18} />
      <h3>{title}</h3>
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MultiLineChart({ data, lines }) {
  const width = 720;
  const height = 260;
  const padding = 34;
  return (
    <div className="chartBox">
      <svg viewBox={`0 0 ${width} ${height}`} role="img">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={padding} x2={width - padding} y1={padding + i * 56} y2={padding + i * 56} className="gridLine" />
        ))}
        {lines.map(([key, label, color]) => {
          const values = data.map((d) => d[key]);
          const min = Math.min(...values);
          const max = Math.max(...values);
          const points = data.map((d, index) => {
            const x = padding + (index * (width - padding * 2)) / (data.length - 1);
            const ratio = max === min ? 0.5 : (d[key] - min) / (max - min);
            const y = height - padding - ratio * (height - padding * 2);
            return `${x},${y}`;
          }).join(" ");
          return (
            <g key={key}>
              <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x={width - padding - 92} y={padding + lines.findIndex((l) => l[0] === key) * 20} fill={color} className="legend">{label}</text>
            </g>
          );
        })}
        {data.map((d, index) => (
          <text key={d.label} x={padding + (index * (width - padding * 2)) / (data.length - 1)} y={height - 8} textAnchor="middle" className="axisLabel">{d.label}</text>
        ))}
      </svg>
    </div>
  );
}

function StatusBadge({ status, t }) {
  const label = status === "Accepted" ? t.followup.accepted : status === "Rejected" ? t.followup.rejected : t.followup.review;
  return <span className={`statusBadge ${status.replace(" ", "").toLowerCase()}`}>{label}</span>;
}

function makeAdvertiserReport(t, locale) {
  return {
    summary: t.advertiser.summary,
    causes: [t.advertiser.cause1, t.advertiser.cause2],
    recommendations: [t.advertiser.rec1, t.advertiser.rec2, t.advertiser.rec3],
    evidence: locale === "zh"
      ? ["CTR 维持在 3.0%，CVR 从 5.1% 降至 3.4%。", "美国市场贡献 68% 的 CPA 上升影响。"]
      : ["CTR stayed at 3.0%, while CVR dropped from 5.1% to 3.4%.", "The US market contributed 68% of the CPA increase impact."],
    watch: ["CVR", "CPA", "ROAS"],
    risk: t.advertiser.risk
  };
}

function makeDeveloperReport(t, locale) {
  return {
    summary: t.developer.summary,
    causes: [t.developer.cause1, t.developer.cause2],
    recommendations: [t.developer.rec1, t.developer.rec2, t.developer.rec3],
    evidence: locale === "zh"
      ? ["请求量较前日 +1%，但 Fill Rate 从 82% 降至 61%。", "广告源 B 收入影响 -28%，是主要异常来源。"]
      : ["Requests increased by 1%, but Fill Rate dropped from 82% to 61%.", "Ad Source B shows a -28% revenue impact and is the main anomaly source."],
    watch: ["Fill Rate", "Revenue", "eCPM"],
    risk: t.developer.risk
  };
}

function makeCopilotReport(t) {
  return {
    profile: t.copilot.profileText,
    metrics: t.copilot.metricText,
    summary: t.copilot.reasonText,
    recommendations: [t.copilot.externalText],
    causes: [t.copilot.internalText],
    risk: t.copilot.riskText
  };
}

function daysBetween(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 7;
  return Math.max(1, Math.round((end - start) / 86400000) + 1);
}

function makeTrend(length, keys) {
  const points = Math.min(10, Math.max(5, length));
  return Array.from({ length: points }, (_, index) => {
    const ratio = points === 1 ? 1 : index / (points - 1);
    const item = { label: `D-${points - index - 1}` };
    keys.forEach(([key, start, end]) => {
      item[key] = Number((start + (end - start) * ratio).toFixed(2));
    });
    return item;
  });
}

function riskFrom(value, high, medium) {
  if (value >= high) return "High";
  if (value >= medium) return "Medium";
  return "Low";
}

function makeAdvertiserView(filters, t, locale) {
  const days = daysBetween(filters.startDate, filters.endDate);
  const countryFactor = {
    "United States": 1.18,
    Brazil: 0.86,
    Indonesia: 0.72,
    Mexico: 0.79
  }[filters.country] || 1;
  const campaignFactor = filters.campaign.includes("RPG") ? 1.08 : filters.campaign.includes("Retargeting") ? 0.82 : 0.93;
  const issueFactor = filters.issue.includes("Budget") ? 0.9 : filters.issue.includes("Creative") ? 1.16 : filters.issue.includes("Conversion") ? 1.24 : 1.2;
  const daysFactor = Math.min(1.2, Math.max(0.82, 7 / days));
  const cpa = 3.05 * countryFactor * campaignFactor * issueFactor;
  const cpaBase = cpa / (1.12 + issueFactor * 0.12);
  const cvrBase = 5.1 / countryFactor;
  const cvr = Math.max(2.2, cvrBase - issueFactor * 1.1 * daysFactor);
  const roasBase = 1.86 / campaignFactor;
  const roas = Math.max(0.92, roasBase - issueFactor * 0.28);
  const ctr = filters.issue.includes("Creative") ? 2.45 : 3.0;
  const spend = Math.round(33800 * campaignFactor * countryFactor * Math.min(3.4, days / 7));
  const cpaChange = Math.round(((cpa - cpaBase) / cpaBase) * 100);
  const roasChange = Math.round(((roas - roasBase) / roasBase) * 100);
  const cvrChange = Math.round(((cvr - cvrBase) / cvrBase) * 100);
  const impact = Math.min(78, Math.max(28, Math.round(countryFactor * issueFactor * 42)));

  return {
    metrics: [
      ["Spend", `$${(spend / 1000).toFixed(1)}K`, `${spend > 32000 ? "+" : "-"}${Math.abs(Math.round((spend - 32000) / 320))}%`, "neutral"],
      ["CTR", `${ctr.toFixed(1)}%`, filters.issue.includes("Creative") ? "-18%" : "-1%", filters.issue.includes("Creative") ? "bad" : "neutral"],
      ["CVR", `${cvr.toFixed(1)}%`, `${cvrChange}%`, cvrChange < -15 ? "bad" : "neutral"],
      ["CPA", `$${cpa.toFixed(2)}`, `+${cpaChange}%`, cpaChange > 20 ? "bad" : "warn"],
      ["ROAS", roas.toFixed(2), `${roasChange}%`, roasChange < -12 ? "bad" : "neutral"],
      ["Budget Util.", filters.issue.includes("Budget") ? "71%" : "96%", filters.issue.includes("Budget") ? "-18%" : "+2%", filters.issue.includes("Budget") ? "bad" : "good"]
    ],
    series: makeTrend(days, [["cpa", cpaBase, cpa], ["roas", roasBase, roas], ["cvr", cvrBase, cvr]]),
    countryRows: [
      [filters.country, `$${cpa.toFixed(2)}`, `${cvr.toFixed(1)}%`, `${impact}%`, riskFrom(impact, 58, 36)],
      ["United States", `$${(3.4 * campaignFactor).toFixed(2)}`, "3.8%", "31%", "Medium"],
      ["Brazil", "$2.10", "4.8%", "18%", "Low"],
      ["Indonesia", "$1.46", "5.4%", "9%", "Low"]
    ],
    creativeRows: [
      ["Boss Battle Reward Video", `${ctr.toFixed(1)}%`, `${Math.max(2.8, cvr - 0.2).toFixed(1)}%`, `+${Math.max(9, cpaChange)}%`, riskFrom(cpaChange, 24, 12)],
      ["Hero Upgrade Interstitial", "2.7%", "4.4%", "+9%", "Medium"],
      ["Guild Raid Playable", "3.4%", "5.0%", "-2%", "Low"]
    ],
    report: {
      summary: locale === "zh"
        ? `${filters.country} 在所选时间范围内 CPA 上升 ${cpaChange}%，ROAS ${roasChange}%。主要问题与 ${filters.issue} 相关，建议优先检查影响最大的国家与素材。`
        : `${filters.country} shows a ${cpaChange}% CPA increase and ${roasChange}% ROAS movement in the selected period. The main issue is related to ${filters.issue}.`,
      evidence: [
        `Selected range: ${filters.startDate} to ${filters.endDate} (${days} days).`,
        `CPA moved from $${cpaBase.toFixed(2)} to $${cpa.toFixed(2)}; CVR moved from ${cvrBase.toFixed(1)}% to ${cvr.toFixed(1)}%.`,
        `${filters.country} contributes ${impact}% of the modeled impact.`
      ],
      causes: [
        filters.issue.includes("Creative") ? "Creative fatigue is reducing click quality." : "Conversion efficiency is weaker than the baseline period.",
        filters.issue.includes("Budget") ? "Delivery constraints may be limiting budget utilization." : "Traffic mix and post-click conversion path require review."
      ],
      recommendations: [
        "Review the top country and creative combination before changing budget.",
        "Check landing page loading, conversion postback, and recent campaign edits.",
        "Prepare a controlled test with one creative or landing page change at a time."
      ],
      watch: ["CPA", "CVR", "ROAS"],
      risk: "Avoid increasing budget before conversion quality is confirmed."
    },
    context: {
      selectedEntity: {
        advertiser: filters.account,
        campaign: filters.campaign,
        market: filters.country,
        timeRange: `${filters.startDate} to ${filters.endDate}`,
        userQuestion: filters.question
      },
      scenarioType: filters.issue,
      metricSummary: {
        spend: `$${(spend / 1000).toFixed(1)}K`,
        ctr: `${ctr.toFixed(1)}%`,
        cvr: { baseline: `${cvrBase.toFixed(1)}%`, current: `${cvr.toFixed(1)}%`, change: `${cvrChange}%` },
        cpa: { baseline: `$${cpaBase.toFixed(2)}`, current: `$${cpa.toFixed(2)}`, change: `+${cpaChange}%` },
        roas: { baseline: roasBase.toFixed(2), current: roas.toFixed(2), change: `${roasChange}%` }
      },
      evidence: [
        `Custom user question: ${filters.question}`,
        `Country impact: ${filters.country} ${impact}%.`,
        `Creative risk: Boss Battle Reward Video ${riskFrom(cpaChange, 24, 12)}.`
      ],
      requiredOutput: filters.question
    }
  };
}

function makeDeveloperView(filters, t, locale) {
  const days = daysBetween(filters.startDate, filters.endDate);
  const countryFactor = {
    Brazil: 1.18,
    Mexico: 0.96,
    Indonesia: 0.88,
    "United States": 1.05
  }[filters.country] || 1;
  const sourceFactor = filters.source.includes("B") ? 1.32 : filters.source.includes("C") ? 0.86 : 1.08;
  const placementFactor = filters.placement.includes("Interstitial") ? 0.72 : 1.1;
  const requests = Math.round(2840000 * placementFactor * Math.min(3.2, days / 1.5));
  const fillBase = 82 / sourceFactor;
  const fill = Math.max(48, fillBase - 16 * countryFactor + (filters.source.includes("C") ? 8 : 0));
  const show = filters.placement.includes("Interstitial") ? 84 : 90;
  const ecpmBase = 4.9 * (filters.placement.includes("Interstitial") ? 0.78 : 1);
  const ecpm = Math.max(2.8, ecpmBase - countryFactor * 0.24);
  const revenue = Math.round(requests * (fill / 100) * (show / 100) * ecpm / 1000);
  const revenueBase = Math.round(requests * (fillBase / 100) * (show / 100) * ecpmBase / 1000);
  const revenueChange = Math.round(((revenue - revenueBase) / revenueBase) * 100);
  const fillChange = Math.round(fill - fillBase);

  return {
    metrics: [
      ["Requests", `${(requests / 1000000).toFixed(2)}M`, "+1%", "neutral"],
      ["Fill Rate", `${fill.toFixed(0)}%`, `${fillChange} pts`, fillChange < -10 ? "bad" : "neutral"],
      ["Show Rate", `${show}%`, "-2 pts", "neutral"],
      ["eCPM", `$${ecpm.toFixed(2)}`, `${Math.round(((ecpm - ecpmBase) / ecpmBase) * 100)}%`, "neutral"],
      ["Revenue", `$${(revenue / 1000).toFixed(2)}K`, `${revenueChange}%`, revenueChange < -15 ? "bad" : "warn"],
      ["Load Time", filters.source.includes("B") ? "2.6s" : "2.1s", filters.source.includes("B") ? "+0.7s" : "+0.1s", filters.source.includes("B") ? "warn" : "neutral"]
    ],
    series: makeTrend(days, [["revenue", revenueBase, revenue], ["fill", fillBase, fill], ["ecpm", ecpmBase, ecpm]]),
    sourceRows: [
      [filters.source, `${fill.toFixed(0)}%`, `$${ecpm.toFixed(2)}`, `${revenueChange}%`, riskFrom(Math.abs(revenueChange), 20, 10)],
      ["Ad Source B", "52%", "$4.80", "-28%", "High"],
      ["Ad Source C", "76%", "$4.30", "+4%", "Medium"],
      ["Ad Source A", "81%", "$4.90", "-3%", "Low"]
    ],
    report: {
      summary: locale === "zh"
        ? `${filters.country} 的 ${filters.placement} 收入在所选时间范围内变化 ${revenueChange}%，主要由 Fill Rate 从 ${fillBase.toFixed(0)}% 变化至 ${fill.toFixed(0)}% 驱动。`
        : `${filters.placement} revenue in ${filters.country} changed by ${revenueChange}% in the selected period, mainly driven by Fill Rate moving from ${fillBase.toFixed(0)}% to ${fill.toFixed(0)}%.`,
      evidence: [
        `Selected range: ${filters.startDate} to ${filters.endDate} (${days} days).`,
        `Requests are ${Math.round(requests / 1000)}K, Fill Rate is ${fill.toFixed(0)}%, eCPM is $${ecpm.toFixed(2)}.`,
        `Selected ad source: ${filters.source}.`
      ],
      causes: [
        "Revenue movement is primarily driven by fill rate and ad source coverage.",
        filters.source.includes("B") ? "Ad Source B shows higher response risk in this modeled scenario." : "Backup source coverage is relatively stable but should be monitored."
      ],
      recommendations: [
        "Check ad source response errors and country coverage.",
        "Compare fill rate and eCPM before changing waterfall priority.",
        "Monitor revenue, fill rate, and eCPM for the next 24 hours."
      ],
      watch: ["Fill Rate", "Revenue", "eCPM"],
      risk: "Changing source priority may improve fill but can dilute eCPM."
    },
    context: {
      selectedEntity: {
        app: filters.app,
        placement: filters.placement,
        country: filters.country,
        adSource: filters.source,
        timeRange: `${filters.startDate} to ${filters.endDate}`,
        userQuestion: filters.question
      },
      scenarioType: "Developer monetization question",
      metricSummary: {
        requests,
        fillRate: { baseline: `${fillBase.toFixed(0)}%`, current: `${fill.toFixed(0)}%`, change: `${fillChange} pts` },
        showRate: `${show}%`,
        ecpm: `$${ecpm.toFixed(2)}`,
        revenue: { baseline: `$${(revenueBase / 1000).toFixed(2)}K`, current: `$${(revenue / 1000).toFixed(2)}K`, change: `${revenueChange}%` }
      },
      evidence: [
        `Custom user question: ${filters.question}`,
        `Selected ad source: ${filters.source}.`,
        `Placement: ${filters.placement}.`
      ],
      requiredOutput: filters.question
    }
  };
}

function buildDiagnosisContext(scenario, locale, overrides = {}) {
  const common = {
    locale,
    product: "Overseas Ad Network AI Copilot POC",
    modelUsage: "Generate a structured diagnosis report for a B2B SaaS product demo.",
    ruleEnginePrinciple: "Rules identify anomalies and evidence; LLM explains and recommends actions."
  };

  if (Object.keys(overrides).length > 0) {
    return {
      ...common,
      role: scenario === "advertiser" ? "Advertiser" : scenario === "developer" ? "Developer" : "Operator",
      ...overrides
    };
  }

  if (scenario === "advertiser") {
    return {
      ...common,
      role: "Advertiser",
      scenarioType: "CPA_INCREASE_ROAS_DECLINE",
      selectedEntity: {
        advertiser: "Galaxy Quest Studio",
        campaign: "US RPG User Acquisition",
        market: "United States",
        timeRange: "Last 7 days vs previous 7 days"
      },
      metricSummary: {
        spend: { current: "$33.8K", change: "+4%" },
        ctr: { baseline: "3.0%", current: "3.0%", change: "-1%" },
        cvr: { baseline: "5.1%", current: "3.4%", change: "-33%" },
        cpa: { baseline: "$3.05", current: "$3.90", change: "+28%" },
        roas: { baseline: "1.84", current: "1.51", change: "-18%" },
        budgetUtilization: { current: "96%", change: "+2%" }
      },
      evidence: [
        "CTR remained stable while CVR dropped from 5.1% to 3.4%.",
        "The US market contributed 68% of the CPA increase impact.",
        "Boss Battle Reward Video has the highest creative-level risk."
      ],
      requiredOutput: "Explain why CPA rose and ROAS declined; include evidence, actions, risks, and watch metrics."
    };
  }

  if (scenario === "developer") {
    return {
      ...common,
      role: "Developer",
      scenarioType: "REWARDED_VIDEO_REVENUE_DECLINE",
      selectedEntity: {
        developer: "Puzzle Island Games",
        app: "Puzzle Island",
        placement: "Rewarded Video - Level Complete",
        country: "Brazil",
        adSource: "All Sources",
        timeRange: "Yesterday vs previous day"
      },
      metricSummary: {
        requests: { current: "2.84M", change: "+1%" },
        fillRate: { baseline: "82%", current: "61%", change: "-21 pts" },
        showRate: { current: "90%", change: "-2 pts" },
        ecpm: { current: "$4.60", change: "-6%" },
        revenue: { current: "$7.84K", change: "-18%" },
        loadTime: { current: "2.3s", change: "+0.4s" }
      },
      evidence: [
        "Requests increased by 1%, so traffic volume is stable.",
        "Fill Rate dropped from 82% to 61%, driving most of the revenue decline.",
        "Ad Source B has a -28% revenue impact and the strongest fill-rate anomaly."
      ],
      requiredOutput: "Explain why rewarded video revenue declined; include ad source actions, risks, and watch metrics."
    };
  }

  return {
    ...common,
    role: "Operator",
    scenarioType: "CUSTOMER_WEEKLY_REVIEW",
    selectedEntity: {
      customer: "Galaxy Quest Studio",
      linkedDiagnosis: "US RPG User Acquisition CPA increase",
      timeRange: "2026-05-14 to 2026-05-20"
    },
    metricSummary: {
      cpa: { baseline: "$3.05", current: "$3.90", change: "+28%" },
      roas: { baseline: "1.84", current: "1.51", change: "-18%" },
      cvr: { baseline: "5.1%", current: "3.4%", change: "-33%" }
    },
    evidence: [
      "CTR stayed stable but CVR dropped significantly.",
      "The main impact is concentrated in the US market.",
      "Recommendations require customer success review before any budget action."
    ],
    requiredOutput: "Generate an operator-facing weekly review. Include customer-ready wording and internal risk notes in the recommendations or risk field."
  };
}

export default App;
