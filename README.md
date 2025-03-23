# unplugin-import-adapter

一个用于分析 TypeScript 文件并自动提取导出内容的工具库，专为 unplugin-auto-import 设计。这个工具简化了在项目中自动导入组件、工具函数和其他模块导出的设置过程。

## 安装

```bash
# npm
npm install -D unplugin-import-adapter

# yarn
yarn add -D unplugin-import-adapter

# pnpm
pnpm add -D unplugin-import-adapter
```

> **注意：** 如果报 `ts-morph` 错误, 请单独安装一下, 方法如下：
> ```bash
> npm install -D ts-morph
> 或者
> yarn add -D ts-morph
> 或者
> pnpm add -D ts-morph
> ```

## 为什么使用 unplugin-import-adapter？

- **节省时间**：自动从模块中提取所有导出，无需手动配置
- **减少错误**：防止在配置导入列表时出现拼写错误和其他错误
- **保持更新**：当您向模块添加新的导出时，自动获取它们
- **灵活配置**：轻松排除特定导出或使用别名转换导出名称

## 基本用法

```typescript
// vite.config.ts
import { autoImport } from 'unplugin-import-adapter';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';

const imports = await autoImport({
  pkgName: '@rgx/components',
  path: resolve(__dirname, './components/src/index.ts')
});

// 当前以`radash`和`antd`为例
export default {
  plugins: [
    AutoImport({
      imports: [
        // 自动引入`radash`
        autoImport({
          pkgName: 'radash',
          // 当前路径不知道是什么就去`node_modules`里找
          path: resolve(__dirname, './node_modules/radash/dist/esm/index.mjs'),
          // 别名转换, 例如`map` => `_map_`
          alias: (name) => `_${name}_`
        })
        autoImport({
          pkgName: 'antd',
          path: resolve(__dirname, './node_modules/antd/es/index.js'),
          alias: (name) => `Antd${name}`
        })
      ],
      // 以下是`unplugin-auto-import/vite`的配置内容, 请自行参阅文档(https://www.npmjs.com/package/unplugin-auto-import)
      eslintrc: {
        enabled: true,
      },
      dts: resolve(__dirname, './src/auto-imports.d.ts')
    })
  ]
}
```

## API 参考

### autoImport(options)

分析 TypeScript 文件并提取用于自动导入的导出信息。

#### 选项

| 选项       | 类型                       | 必填 | 默认值    | 描述                                                        |
| ---------- | -------------------------- | ---- | --------- | ----------------------------------------------------------- |
| `pkgName`  | `string`                   | 是   | -         | 将用于导入的包名                                            |
| `path`     | `string`                   | 否   | `pkgName` | 要分析的包名或文件入口（如果不是包可以是文件入口）          |
| `alias`    | `(name: string) => string` | 否   | -         | 转换导出名称的函数                                          |
| `excludes` | `(string \| RegExp)[]`     | 否   | -         | 要排除的导出列表（字符串用于精确匹配，RegExp 用于模式匹配） |

## 故障排除

### 常见问题

1. **未找到导出**
   - 检查文件的路径是否正确
   - 确保文件实际上有命名导出（不仅仅是默认导出）
   - 验证导出没有被您的排除模式排除

2. **ts-morph 错误**
   - 确保已安装 ts-morph 作为对等依赖
   - 检查 TypeScript 版本兼容性

3. **路径解析问题**
   - 使用 `path.resolve` 确保绝对路径
   - 检查文件路径是否存在

## 支持

- **GitHub Issues**：在我们的 GitHub 仓库上报告 bug 或功能请求
- **文档**：参考此 README 获取最新文档

## 兼容性

- 适用于 TypeScript 4.0+
- 兼容所有主要的打包工具（Vite、Webpack、Rollup）
- 支持 ESM 和 CommonJS 环境

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

MIT
