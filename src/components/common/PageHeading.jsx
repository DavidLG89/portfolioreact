export default function PageHeading({ eyebrow, title, children }) {
  return <header className="page-heading"><span className="section-badge">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</header>;
}
