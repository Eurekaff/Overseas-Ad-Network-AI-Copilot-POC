import { AlertTriangle, Cpu, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { valueMetrics } from "../../domain/fixtures.js";

export function MetricGrid({ metrics }) {
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

export function RuleMechanism({ t, rule, decomposition }) {
  return (
    <section className="panel full rulePanel">
      <PanelTitle icon={ShieldCheck} title={t.report.ruleTitle} />
      <div className="ruleSteps">
        <div>
          <span>01</span>
          <strong>{t.report.ruleTitle}</strong>
          <p>{rule}</p>
        </div>
        <div>
          <span>02</span>
          <strong>{t.report.decomposition}</strong>
          <p>{decomposition}</p>
        </div>
        <div>
          <span>03</span>
          <strong>{t.report.boundary}</strong>
          <p>{t.report.boundaryText}</p>
        </div>
      </div>
    </section>
  );
}

export function AiFitPanel({ t, wide = false }) {
  return (
    <section className={`panel ${wide ? "full" : "span5"} fitPanel`}>
      <PanelTitle icon={Cpu} title={t.report.fitTitle} />
      <ul>
        {t.report.fitItems.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="noAuto">
        <ShieldCheck size={16} />
        <span>{t.report.boundaryText}</span>
      </div>
    </section>
  );
}

export function ValueMetrics({ t, locale }) {
  return (
    <section className="panel full valuePanel">
      <div className="panelTitle spread">
        <div className="titleInline"><LineChart size={18} /><h3>{t.report.valueTitle}</h3></div>
        <span className="mockTag">{t.report.simulated}</span>
      </div>
      <div className="valueGrid">
        {valueMetrics[locale].map(([label, value, change]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <em>{change}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ActionBar({ title, actions, onAccept }) {
  return (
    <div className="actionBar">
      <strong>{title}</strong>
      <div>
        {actions.map((action, index) => (
          <button
            className={index === 0 ? "action primary" : "action"}
            key={action}
            type="button"
            data-testid={index === 3 && onAccept ? "accept-recommendation" : undefined}
            onClick={index === 3 && onAccept ? onAccept : undefined}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DiagnosisReport({ title, summary, evidence, causes, recommendations, watch, risk, t, actions, onAccept }) {
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
      <ActionBar title={t.report.actions} actions={actions} onAccept={onAccept} />
    </section>
  );
}

export function ReportBlock({ title, items, numbered }) {
  return (
    <div className="reportBlock">
      <strong>{title}</strong>
      <ul>
        {items.map((item, index) => <li key={item}>{numbered ? `${index + 1}. ` : ""}{item}</li>)}
      </ul>
    </div>
  );
}

export function PanelTitle({ icon: Icon, title }) {
  return (
    <div className="panelTitle">
      <Icon size={18} />
      <h3>{title}</h3>
    </div>
  );
}

export function DataTable({ columns, rows }) {
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

export function MultiLineChart({ data, lines, domain, compact = false }) {
  const width = 720;
  const height = 260;
  const padding = 34;
  return (
    <div className={`chartBox ${compact ? "compactChart" : ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={padding} x2={width - padding} y1={padding + i * 56} y2={padding + i * 56} className="gridLine" />
        ))}
        {lines.map(([key, label, color]) => {
          const values = data.map((d) => d[key]);
          const min = domain ? domain[0] : Math.min(...values);
          const max = domain ? domain[1] : Math.max(...values);
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

export function StatusBadge({ status, t }) {
  const label = status === "Accepted" ? t.followup.accepted : status === "Rejected" ? t.followup.rejected : t.followup.review;
  return <span className={`statusBadge ${status.replace(" ", "").toLowerCase()}`}>{label}</span>;
}
