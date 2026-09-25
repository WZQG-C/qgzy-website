# C++ 社团网站

简约科技风的响应式社团首页，使用原生 HTML、CSS 和 JavaScript，无需安装依赖。

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
