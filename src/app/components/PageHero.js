export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <span className="eyebrow rise">{eyebrow}</span>}
        <h1 className="display rise rise-2">{title}</h1>
        {children && <div className="lead rise rise-3">{children}</div>}
      </div>
    </section>
  );
}
