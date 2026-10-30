import { useState } from 'react';
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

function TreeBranch({ component }) {
  const hasChildren = Boolean(component.children?.length);
  const [expanded, setExpanded] = useState(true);

  return (
    <li className="render-tree-item">
      {hasChildren ? (
        <button
          className="render-tree-node render-tree-toggle"
          type="button"
          aria-label={`${expanded ? 'Plegar' : 'Desplegar'} ${component.name}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          <span>{component.name}</span>
          <span className="render-tree-indicator" aria-hidden="true">{expanded ? '-' : '+'}</span>
        </button>
      ) : (
        <span className="render-tree-node">{component.name}</span>
      )}
      {hasChildren && expanded && (
        <ul className="render-tree-list">
          {component.children.map((child) => (
            <TreeBranch key={child.name} component={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ComponentTreePage() {
  const [rootExpanded, setRootExpanded] = useState(true);

  return (
    <div className="page-content">
      <PageHeading eyebrow="ARQUITECTURA DE LA APP" title="ÁRBOL DE COMPONENTES">
        La aplicación comparte la barra lateral y el marco principal; AppRoutes muestra una página a la vez.
      </PageHeading>
      <section className="render-tree" aria-label="Jerarquía de componentes">
        <button
          className="render-tree-root"
          type="button"
          aria-label={`${rootExpanded ? 'Plegar' : 'Desplegar'} App`}
          aria-expanded={rootExpanded}
          onClick={() => setRootExpanded((current) => !current)}
        >
          <span>App</span>
          <span className="render-tree-indicator" aria-hidden="true">{rootExpanded ? '-' : '+'}</span>
        </button>
        {rootExpanded && (
          <ul className="render-tree-list render-tree-root-list">
            {componentTree.map((component) => (
              <TreeBranch key={component.name} component={component} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
