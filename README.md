# C++ 社团网站

简约科技风的响应式社团首页，使用原生 HTML、CSS 和 JavaScript，无需安装依赖。

主域名：**https://hellocpp.ccwu.cc/**。以 **Cloudflare Pages** 为主要托管平台。

## Cloudflare Pages 部署与域名绑定

仓库已配置首页 canonical、`robots.txt` 和 `sitemap.xml`，统一使用上述 HTTPS 主域名。线上生效还需要完成 Pages 部署、域名绑定和 DNS 验证。

### 1. 部署网站

当前使用 Cloudflare Pages **Direct Upload** 项目，发布信息如下：

| 设置 | 值 |
| --- | --- |
| 项目名称 | `hellocpp` |
| 默认地址 | `https://hellocpp.pages.dev/` |
| 生产分支 | `main` |
| 构建命令 | `node scripts/build.mjs` |
| 构建输出目录 | `dist` |

在仓库根目录运行以下命令更新线上网站（首次使用 Wrangler 时按提示登录有该项目权限的 Cloudflare 账号）：

```sh
node scripts/build.mjs
npx wrangler@latest pages deploy dist --project-name hellocpp --branch main
```

构建脚本使用 Node.js 内置模块，无需安装构建依赖，仅将网页、样式、脚本和搜索引擎文件复制到 `dist/`。Wrangler 是发布工具，由 `npx` 按需下载。也可以在 Pages 控制台上传 `dist/` 的内容；上传压缩包时，应让 `index.html` 位于压缩包根目录。

当前项目未连接 GitHub，推送 `WZQG-C/qgzy-website` 不会自动发布；更新网站后需运行上述发布命令。

### 2. 添加自定义域名

`hellocpp.ccwu.cc` 已添加到 `hellocpp` 项目。进入该 Pages 项目的 **Custom domains** 查看验证状态；完成下面的 DNS 设置并通过验证后才会显示 Active。如需重建绑定，使用 **Set up a domain** 输入同一域名。

如果 DNS 区域已由同一个 Cloudflare 账号管理，按界面提示确认自动创建的记录。否则在域名提供商的 DNS 面板添加：

| 类型 | 名称 | 目标 | TTL |
| --- | --- | --- | --- |
| `CNAME` | `hellocpp`（在 `ccwu.cc` 区域下） | `hellocpp.pages.dev` | 自动 |

如果提供商单独管理 `hellocpp.ccwu.cc` 区域，名称通常填 `@`；以该提供商的面板规则为准。目标只填域名，不带 `https://` 或路径。同名已有 A、AAAA 或 CNAME 记录时，先核对用途，再改为 Pages 要求的目标。

**先在 Pages 中添加自定义域名，再按提示设置 DNS。** 只添加 DNS CNAME 而不关联 Pages 项目，可能出现 522 错误。`hellocpp.ccwu.cc` 是子域名，可以继续使用域名提供商的 DNS，无需控制整个 `ccwu.cc` 的 NS。

仓库根目录已有的 `CNAME` 文件用于 GitHub Pages 的域名配置；Cloudflare Pages 不读取它，也不会因此自动完成 DNS 或域名绑定。Cloudflare 发布目录不包含这个文件。

### 3. 验证上线

- Pages 的自定义域名状态显示 **Active**，HTTPS 证书已签发。
- `https://hellocpp.ccwu.cc/` 正常打开，样式和交互加载成功。
- `https://hellocpp.ccwu.cc/robots.txt` 与 `https://hellocpp.ccwu.cc/sitemap.xml` 正常返回。

域名启用后，如需将生产 `*.pages.dev` 地址统一跳转到主域名，可按 Cloudflare 文档设置 Bulk Redirect；保留路径和查询参数，并仅匹配生产域名，以继续使用预览部署。

官方说明：[静态 HTML 部署](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) · [自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)

## 预览

直接用现代浏览器打开 `index.html`，或使用 VS Code Live Server。页面不依赖外部字体、图片或 CDN；学习资源链接需要联网访问。

## 文件

- `index.html`：首页、社团内容、成员、指导老师、学习资源和加入社团说明。
- `css/style.css`：设计变量、组件样式和移动端适配。
- `js/alert.js`：移动导航、滚动导航高亮、成员筛选、代码输出演示和原生弹窗。

## 更新资料

1. 在 `index.html` 中替换成员姓名、简介和教师信息。目前均明确标记为待补充，未填入虚构人物。
2. 成员卡片的 `data-category` 可设置为 `algorithm`、`project` 或 `learning`，分别对应三个筛选方向。复制已有卡片即可新增成员。
3. 在 `#join-dialog` 中填入已确认的联系方式、招新时间与报名地址。当前页面仅展示报名方式待公布的说明，不收集或提交个人信息。
4. 修改 `css/style.css` 顶部的 `:root` 变量，可调整主题颜色和字体。

代码编辑器为固定 C++ 示例，运行按钮仅演示对应输出，不提供在线编译。

## 后续接入 React / Fluent UI

现阶段保留原有三个文件，不引入构建工具。可按 Header、Hero、Activities、MemberGallery、Mentors、Resources 和 JoinDialog 拆分 React 组件；将成员与教师资料抽离为数据，再用 React 状态替代当前 DOM 事件逻辑。CSS 主题变量可映射到 Fluent UI 的主题配置。
