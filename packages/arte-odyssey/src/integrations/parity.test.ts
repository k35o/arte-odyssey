import { catalog } from './json-render/catalog';
import { library } from './openui/library';

const catalogNames = catalog.componentNames;
const openuiNames = Object.keys(library.components);

const diff = (a: string[], b: string[]): string[] =>
  a.filter((name) => !b.includes(name)).sort();

describe('json-render catalog と openui library のコンポーネント整合性', () => {
  it('どちらの登録セットも空ではない', () => {
    expect(catalogNames.length).toBeGreaterThan(0);
    expect(openuiNames.length).toBeGreaterThan(0);
  });

  it('catalog と library は同一のコンポーネント名集合を登録している', () => {
    const onlyInCatalog = diff(catalogNames, openuiNames);
    const onlyInOpenui = diff(openuiNames, catalogNames);

    expect({ onlyInCatalog, onlyInOpenui }).toEqual({
      onlyInCatalog: [],
      onlyInOpenui: [],
    });
  });
});
