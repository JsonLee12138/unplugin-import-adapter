# unplugin-import-adapter
[中文文档](https://github.com/JsonLee12138/unplugin-import-adapter/blob/main/README.md)

A tool library designed to analyze TypeScript files and automatically extract export information, specifically built for unplugin-auto-import. This tool simplifies the setup process for automatically importing components, utility functions, and other module exports in your projects.

## Installation

```bash
# npm
npm install -D unplugin-import-adapter

# yarn
yarn add -D unplugin-import-adapter

# pnpm
pnpm add -D unplugin-import-adapter
```

> **Note:** If you encounter a `ts-morph` error, please install it separately using one of the following commands:
> ```bash
> npm install -D ts-morph
> # or
> yarn add -D ts-morph
> # or
> pnpm add -D ts-morph
> ```

## Why Use unplugin-import-adapter?

- **Time Saver:** Automatically extracts all exports from modules, eliminating the need for manual configuration.
- **Error Reduction:** Prevents typos and other errors when manually setting up the import list.
- **Automatic Updates:** Automatically detects new exports when you add them to your modules.
- **Flexible Configuration:** Easily exclude specific exports or rename them with alias transformations.

## Basic Usage

```typescript
// vite.config.ts
import { autoImport } from 'unplugin-import-adapter';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';

const imports = await autoImport({
  pkgName: '@rgx/components',
  path: resolve(__dirname, './components/src/index.ts')
});

// Example using `radash` and `antd`
export default {
  plugins: [
    AutoImport({
      imports: [
        // Automatically import `radash`
        autoImport({
          pkgName: 'radash',
          // If the current path is not known, it will be resolved from `node_modules`
          path: resolve(__dirname, './node_modules/radash/dist/esm/index.mjs'),
          // Alias transformation, e.g., `map` => `_map_`
          alias: (name) => `_${name}_`
        }),
        autoImport({
          pkgName: 'antd',
          path: resolve(__dirname, './node_modules/antd/es/index.js'),
          alias: (name) => `Antd${name}`
        })
      ],
      // Below are configurations for `unplugin-auto-import/vite`.
      // Please refer to the documentation (https://www.npmjs.com/package/unplugin-auto-import) for more details.
      eslintrc: {
        enabled: true,
      },
      dts: resolve(__dirname, './src/auto-imports.d.ts')
    })
  ]
}
```

## API Reference

### autoImport(options)

Analyzes a TypeScript file and extracts the export information needed for automatic importing.

#### Options

| Option     | Type                       | Required   | Default   | Description                                                                                      |
| ---------- | -------------------------- | ---------- | --------- | ------------------------------------------------------------------------------------------------ |
| `pkgName`  | `string`                   | Yes        | -         | The package name to be used for importing                                                        |
| `path`     | `string`                   | No         | `pkgName` | The package name or file entry point to analyze. (Can be a file path if not analyzing a package) |
| `alias`    | `(name: string) => string` | No         | -         | A function to transform the export name                                                          |
| `excludes` | `(string                   | RegExp)[]` | No        | -                                                                                                | A list of exports to exclude (string for exact matching, RegExp for pattern matching) |

## Troubleshooting

### Common Issues

1. **Exports Not Found**
   - Verify whether the file path is correct.
   - Ensure that the file has named exports (not just a default export).
   - Check that the exports are not excluded by your exclusion patterns.

2. **ts-morph Errors**
   - Ensure that ts-morph is installed as a peer dependency.
   - Check for compatibility with your TypeScript version.

3. **Path Resolution Problems**
   - Use `path.resolve` to ensure absolute paths.
   - Double-check that the file path exists.

## Support

- **GitHub Issues:** Report bugs or feature requests on our GitHub repository.
- **Documentation:** Refer to this README for the latest documentation.

## Compatibility

- Works with TypeScript 4.0+
- Compatible with major bundlers (Vite, Webpack, Rollup)
- Supports both ESM and CommonJS environments

## Contribution

Contributions are welcome! Feel free to submit pull requests.

## License

MIT
