import { Project } from 'ts-morph';
import type { ImportsMap } from 'unplugin-auto-import/types';
export interface AutoImportOptions {
  path?: string;
  pkgName: string;
  alias?: (name: string) => string;
  excludes?: (string | RegExp)[];
}

const project = new Project();

const exclude = (name: string, excludes?: (string | RegExp)[]) => {
  if (!excludes) return false;
  return excludes.some(exclude => exclude instanceof RegExp ? exclude.test(name) : exclude === name);
}

export const autoImport = ({ path, pkgName, alias, excludes }: AutoImportOptions): ImportsMap => {
  const sourceFile = project.addSourceFileAtPath(path || pkgName);
  const exportNameDeclarations = sourceFile.getExportDeclarations();
  const exportNames = exportNameDeclarations.map(item => item.getNamedExports().map(item => {
    const name = item.getName();
    const alias = item.getStructure().alias;
    const result = alias || name;
    if (result === 'default') return false;
    if (exclude(result, excludes)) return false;
    return result;
  })).flat().filter(Boolean) as string[];

  return {
    [pkgName]: exportNames.map(item => [item, alias ? alias(item) : item])
  }
}
