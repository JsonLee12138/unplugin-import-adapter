import { resolve } from 'path';
import { Project } from 'ts-morph';
import { describe, expect, test } from 'vitest';
import { autoImport } from '../src';

describe('test auto import', () => {
  const project = new Project();
  test('test auto import', async () => {
    const imports = await autoImport({
      pkgName: '@leeforge/components',
      path: resolve(__dirname, '../../components/src/index.ts'),
      excludes: ['Button']
    })
    console.log(imports);
    expect(imports).toEqual({ '@leeforge/components': [['Select', 'Select']] });
  });

  test('ts-morph', async () => {
    const srcPath = resolve(__dirname, './demo/var.ts');
    const src = project.addSourceFileAtPath(srcPath);
    const vars = src.getVariableDeclarations();
    console.log(vars.map(item => item.getName()));
  })

  test('regexp', async () => {
    const reg = /(.*)Route$/;
    const str = 'HomeRoute';
    const result = reg.exec(str);
    console.log(result?.[1]);
  })
})
