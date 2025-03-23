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

/**
 * Automatically imports specified modules and generates an import map.
 * 自动导入指定模块并生成导入映射。

 * @param {string} path - The path to the source file. If not provided, `pkgName` will be used.
 * @param {string} path - 源文件的路径。如果未提供，将使用 `pkgName`。

 * @param {string} pkgName - The name of the package to import from.
 * @param {string} pkgName - 要导入的包的名称。

 * @param {(name: string) => string} [alias] - A function to generate aliases for imported names.
 * @param {(name: string) => string} [alias] - 用于为导入名称生成别名的函数。

 * @param {string[]} [excludes] - A list of names to exclude from the import.
 * @param {string[]} [excludes] - 要从导入中排除的名称列表。
 */
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
