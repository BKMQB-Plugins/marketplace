# 提交插件

1. 使用 [`BKMQB-Plugins/plugin-template`](https://github.com/BKMQB-Plugins/plugin-template) 创建独立仓库。
2. 为版本创建 GitHub Release，并上传 `.bkm-plugin` 与 SHA-256 文件。
3. Fork 本仓库，在 `index.json` 中追加插件记录。
4. 提交 Pull Request，并说明测试方式、请求能力和源码仓库。

插件 ID 必须长期稳定。版本必须遵循 SemVer；下载地址必须固定到具体版本，不接受会随时间
变化的 `latest` 下载地址。市场合并前会核对包内 Manifest、Component ABI 和 SHA-256。

`official` 仅用于 `BKMQB-Plugins` 组织直接维护的插件；外部开发者应使用 `community`，
通过审核后可以标记为 `verified`。
