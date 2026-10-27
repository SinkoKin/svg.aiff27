export default function SectionHead({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="section-head">
      <span className="mono section-head__label">
        <span className="section-head__index">{index}</span>
        {label}
      </span>
      {meta ? <span className="mono section-head__meta">{meta}</span> : null}
      <span className="section-head__rule" aria-hidden="true" />
    </div>
  );
}
