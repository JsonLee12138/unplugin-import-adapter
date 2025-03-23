import { ImportsMap } from 'unplugin-auto-import/types';
export interface AutoImportOptions {
    path?: string;
    pkgName: string;
    alias?: (name: string) => string;
    excludes?: (string | RegExp)[];
}
export declare const autoImport: ({ path, pkgName, alias, excludes }: AutoImportOptions) => ImportsMap;
