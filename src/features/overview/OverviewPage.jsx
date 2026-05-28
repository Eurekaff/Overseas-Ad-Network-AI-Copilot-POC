import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Filter,
  LineChart,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRound
} from "lucide-react";
import { MultiLineChart, PanelTitle } from "../../components/data-display/DataDisplay.jsx";
import { overviewReviewQueue, overviewTrendSeries, valueMetrics } from "../../domain/fixtures.js";

export function OverviewPage({ t, locale, setPage }) {
  const stats = [
    [t.overview.anomalies, "6", AlertTriangle, "+2", "increase"],
    [t.overview.reports, "18", ClipboardCheck, "-3", "decrease"],
    [t.overview.review, "5", CheckCircle2, "+1", "increase"],
    [t.overview.monitoring, "12", LineChart, "-2", "decrease"]
  ];
  const flowIcons = [Database, Filter, Sparkles, UserRound, LineChart];
  const flowDescriptions = locale === "zh"
    ? ["业务数据先发现问题", "规则先识别与拆解异常", "AI 辅助解释、写作和沟通", "关键结论需要人工确认", "对结果进行指标回看"]
    : ["Business data surfaces issues", "Rules detect and decompose anomalies", "AI explains and drafts communication", "People approve key conclusions", "Measure outcomes with metrics"];

  return (
    <div className="pageGrid overviewDashboard">
      <section className="panel overviewSummary full">
        <div className="overviewNarrative">
          <h2>{t.overview.title}</h2>
          <p>{t.overview.desc}</p>
        </div>
        <div className="overviewStats">
          {stats.map(([label, value, Icon, delta, direction]) => (
            <div className="overviewStat" key={label}>
              <div className="overviewStatLabel"><Icon size={19} /><span>{label}</span></div>
              <strong>{value}</strong>
              <em className={direction}>{locale === "zh" ? "较昨日" : "vs yesterday"} <b>{delta}</b></em>
            </div>
          ))}
        </div>
      </section>

      <section className="panel span7 overviewFlow">
        <PanelTitle icon={RefreshCw} title={t.overview.flowTitle} />
        <div className="journey">
          {t.overview.flow.map((item, index) => {
            const Icon = flowIcons[index];
            return (
              <div className={`journeyStep ${index === 0 ? "active" : ""}`} key={item}>
                <span>{index + 1}</span>
                <Icon size={28} />
                <strong>{item}</strong>
                <p>{flowDescriptions[index]}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel span5 overviewQueue">
        <div className="panelTitle spread">
          <h3>{t.overview.reviewQueue}</h3>
          <button type="button" className="textAction" onClick={() => setPage("copilot")}>{t.overview.viewAll}</button>
        </div>
        <div className="queueList">
          {overviewReviewQueue[locale].map(([priority, issue, time, tone]) => (
            <div className="queueRow" key={issue}>
              <span className={`priority ${tone}`}>{priority}</span>
              <strong>{issue}</strong>
              <time>{time}</time>
            </div>
          ))}
        </div>
        <button type="button" className="queueAction" onClick={() => setPage("copilot")}>
          {locale === "zh" ? "前往人工确认工作台" : "Go to human-review workbench"}
        </button>
      </section>

      <section className="panel span7 overviewTrend">
        <PanelTitle icon={LineChart} title={t.overview.chartTitle} />
        <div className="compactValues">
          {valueMetrics[locale].slice(0, 4).map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <p className="chartCaption">{t.overview.chartLabel}</p>
        <MultiLineChart data={overviewTrendSeries} domain={[0, 100]} compact lines={[
          ["assisted", locale === "zh" ? "辅助覆盖率" : "Coverage", "#176e69"],
          ["adoption", locale === "zh" ? "建议采纳率" : "Adoption", "#9dc342"],
          ["reviewed", locale === "zh" ? "人工复核率" : "Review", "#ccd878"]
        ]} />
      </section>

      <section className="panel span5 collaborationPanel">
        <PanelTitle icon={ShieldCheck} title={t.overview.collaborationTitle} />
        <div className="collaborationCallout">
          <ShieldCheck size={30} />
          <div>
            <strong>{locale === "zh" ? "关键决策，人工确认" : "Key decisions need human approval"}</strong>
            <p>{t.report.boundaryText}</p>
          </div>
        </div>
        <div className="compactPrinciples">
          {t.overview.principles.map((principle, index) => (
            <div key={principle}><span>{index + 1}</span><strong>{principle}</strong></div>
          ))}
        </div>
      </section>
    </div>
  );
}
