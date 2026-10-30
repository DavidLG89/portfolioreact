import PageHeading from '../components/common/PageHeading.jsx';

const pages = [
  { name: 'Sidebar' },
  { name: 'HomePage', children: [{ name: 'MemberCard × 4' }] },
  { name: 'ProfilePage', children: [{ name: 'PageHeading' }] },
  { name: 'CatalogPage', children: [{ name: 'PageHeading' }] },
  { name: 'PublicApiPage', children: [{ name: 'PageHeading' }] },
  { name: 'ComponentTreePage', children: [{ name: 'PageHeading' }] },
  { name: 'JournalPage', children: [{ name: 'PageHeading' }] },
  { name: 'NotFoundPage', children: [{ name: 'PageHeading' }] },
];

function renderBranch(component) {
  return (
    <li className="render-tree-item" key={component.name}>
      <span className="render-tree-node">{component.name}</span>
      {component.children && (
        <ul className="render-tree-list">
          {component.children.map(renderBranch)}
        </ul>
      )}
    </li>
  );
}

export default function ComponentTreePage() {
  return (
    <div className="page-content">
      <PageHeading eyebrow="ARQUITECTURA DE LA APP" title="ÁRBOL DE COMPONENTES">
        La barra lateral permanece visible. En el área principal se muestra una página a la vez.
      </PageHeading>
      <section className="render-tree" aria-label="Jerarquía de componentes">
        <div className="render-tree-root">App</div>
        <ul className="render-tree-list">
          {pages.map(renderBranch)}
        </ul>
      </section>
    </div>
  );
}
