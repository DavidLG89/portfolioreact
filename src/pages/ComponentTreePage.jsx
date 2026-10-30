import PageHeading from '../components/common/PageHeading.jsx';

const componentTree = [
  {
    name: 'AppLayout',
    children: [
      { name: 'Sidebar' },
      {
        name: 'AppMain',
        children: [
          { name: 'AppTopbar' },
          {
            name: 'AppRoutes',
            children: [
              {
                name: 'Routes (una página activa)',
                children: [
                  { name: 'HomePage', children: [{ name: 'MemberCard x 4' }] },
                  {
                    name: 'ProfilePage',
                    children: [
                      { name: 'PageHeading' },
                      { name: 'RetroPaletteGame (David)' },
                      { name: 'NotFoundPage (id no válido)' },
                    ],
                  },
                  { name: 'CatalogPage', children: [{ name: 'PageHeading' }] },
                  { name: 'PublicApiPage', children: [{ name: 'PageHeading' }] },
                  { name: 'ComponentTreePage', children: [{ name: 'PageHeading' }] },
                  { name: 'JournalPage', children: [{ name: 'PageHeading' }] },
                  { name: 'NotFoundPage', children: [{ name: 'PageHeading' }] },
                ],
              },
            ],
          },
          { name: 'AppFooter' },
        ],
      },
    ],
  },
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
        La aplicación comparte la barra lateral y el marco principal; AppRoutes muestra una página a la vez.
      </PageHeading>
      <section className="render-tree" aria-label="Jerarquía de componentes">
        <div className="render-tree-root">App</div>
        <ul className="render-tree-list render-tree-root-list">
          {componentTree.map(renderBranch)}
        </ul>
      </section>
    </div>
  );
}
