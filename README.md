# 扇贝学习工具

扇贝学习浏览器扩展插件。功能：

* 翻译（单词/短语）
* 添加生词本的

> 基于 [shanbay-tools](https://github.com/ethanyang163/shanbay-tools) 开发，使用 [Plasmo extension](https://docs.plasmo.com/) 重构并修复了一些问题。

## 开发

首先，运行开发服务器：

```bash
pnpm dev
#或
npm run dev
```

打开浏览器，加载相应的开发构建。例如，如果你正在为chrome浏览器开发，使用 manifest v3，请使用： `build/chrome-mv3-dev`。

[参考文档](https://docs.plasmo.com/)

## 生产构建

运行以下程序：

```bash
pnpm build
#或者
npm run build
```

这将为你的扩展创建一个生产包，准备好被压缩并发布到商店。

## 提交到应用商店

部署 Plasmo 扩展的最简单方法是使用内置的 [bpp](https://bpp.browser.market) GitHub 动作。不过在使用这个动作之前，请确保建立你的扩展并将第一个版本上传到商店，以建立基本的凭证。然后，只需按照[这个设置说明](https://docs.plasmo.com/framework/workflows/submit)，你就可以实现自动提交了!
