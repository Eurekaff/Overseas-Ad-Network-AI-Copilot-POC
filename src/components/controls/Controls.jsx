import { Sparkles } from "lucide-react";

export function Segment({ label, value, onChange, options }) {
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

export function SelectField({ label, value, options, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function DateField({ label, value, onChange }) {
  return (
    <label className="field compact">
      <span>{label}</span>
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function FilterBar({ items, cta, onRun }) {
  return (
    <section className="filterBar full">
      <div className="filterGrid">
        {items.map(([label, value]) => <FilterPill key={label} label={label} value={value} />)}
      </div>
      <button className="primaryAction" data-testid="run-diagnosis" onClick={onRun}><Sparkles size={16} />{cta}</button>
    </section>
  );
}

export function FilterPill({ label, value }) {
  return (
    <div className="filterPill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
