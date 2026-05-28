export function PageIntro({ title, desc }) {
  return (
    <section className="sectionHeader full">
      <div>
        <p className="eyebrow">Embedded AI Workflow</p>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </section>
  );
}
