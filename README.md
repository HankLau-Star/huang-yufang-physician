# 黄玉芳医师个人网站

黄玉芳（Huang Yufang）医师的公开个人介绍网站。设计方向为现代临床医学的庄重感、中医文化的含蓄气质与清晰可信的移动端阅读体验。

- 主站：https://huang-yufang-physician.valid-gnat-7482.chatgpt.site/
- GitHub Pages：https://hanklau-star.github.io/huang-yufang-physician/
- 联系电话：150 3826 4053
- 微信号：a15038264053

## 交给其他 GPT 修改

把本仓库地址和你的修改要求发给新的 GPT，并告诉它：

> 请先完整阅读仓库根目录的 `AGENTS.md` 和 `README.md`，保持当前视觉体系、医学信息边界、国内移动端兼容性与 GitHub Pages 导出方式，再开始修改。完成后运行构建与测试，并更新 `docs/`。

建议让 GPT 在修改前先建立分支或保留一次提交，方便随时恢复。不要只把在线网址交给 GPT；仓库源码才是可持续修改的母版。

## 内容与代码位置

- `app/page.tsx`：人物资料、履历、专业方向、医者自述、电话、微信号、页面结构与交互。
- `app/globals.css`：全站视觉、字体层级、卡片、背景、动效和移动端适配。
- `app/layout.tsx`：网站标题、摘要、搜索与社交分享信息。
- `public/`：医师照片、形象横幅和分享图。
- `app/fonts.local.css`：本地中文字体资源，避免依赖境外字体服务。
- `tests/rendered-html.test.mjs`：个人资料、照片和移动端导出的基础检查。
- `scripts/export-github-pages.mjs`：把构建结果转为 GitHub Pages 可用的 `docs/`。
- `.openai/hosting.json`：当前主站的托管项目配置，请勿删除或改写项目编号。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开开发服务器显示的本地地址即可预览。

## 修改后的检查

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

重点人工检查：

- 360px 左右的窄屏不横向溢出。
- 微信内浏览器中电话和微信号清晰可见、复制按钮可用。
- 姓名、人物照片、按钮和联系方式没有被裁切。
- 页面没有依赖 Google Fonts 等境外运行时资源。
- 医疗内容保持“个人经历与专业方向介绍”，不写诊断承诺、疗效保证或线上处方暗示。

## 更新 GitHub Pages

先生成最新版静态页面：

```bash
npm run publish:github
```

该命令会重新构建网站，并更新仓库中的 `docs/`。然后提交并推送全部变更：

```bash
git add .
git commit -m "Describe the website update"
git push origin main
```

当前 GitHub Pages 使用仓库 `main` 分支的 `/docs` 目录。推送后通常会自动更新。若仓库设置被改变，请在 GitHub 的 Settings → Pages 中重新选择 `main` 与 `/docs`。

## 发布主站

主站由 OpenAI Sites 托管。具备 Sites 工具和该项目访问权限的 GPT，应读取 `sites-building` 与 `sites-hosting` 的工作说明，复用 `.openai/hosting.json` 中的现有项目，不要创建新的站点。没有相应权限时，仍可完整修改源码并发布 GitHub Pages。

## 信息与隐私边界

当前仓库和网站均为公开内容，包含医师照片、职业经历、电话号码和微信号。修改真实姓名、资历、机构、专业方向或联系方式前，应由网站所有者确认。不要加入患者资料、病历、身份证件、住址、内部证书编号或未获授权的医疗文件。
