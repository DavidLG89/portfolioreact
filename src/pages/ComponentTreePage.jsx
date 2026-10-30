import PageHeading from '../components/common/PageHeading.jsx';

export default function ComponentTreePage() {
  const branches = [
    { parent: 'App', children: ['Sidebar', 'Routes', 'Footer'] },
    { parent: 'Routes', children: ['Home → MemberCard', 'Profile → PageHeading', 'Catalog → ResourceCard', 'PublicApi → GameCard', 'ComponentTree', 'Journal → JournalEntry'] },
  ];
  return (
    <div className="page-content">
      <PageHeading eyebrow="ARQUITECTURA DE LA APP" title="ÁRBOL DE RENDERIZADO">Estructura de componentes que corresponde a las rutas y componentes entregados.</PageHeading>
      <div className="tree-root"><div className="tree-node tree-main">React root · BrowserRouter</div>{branches.map(({ parent, children }) => <section className="tree-branch" key={parent}><div className="tree-node">{parent}</div><div className="tree-children">{children.map((child) => <div className="tree-node tree-child" key={child}>{child}</div>)}</div></section>)}</div>
    </div>
  );
}
