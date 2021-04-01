# 前端脚手架: init-vue-cli

## 项目技术栈

```
/**
 * 1、获取用户输入命令
 * a、原生获取命令行  console.log(process.argv)
 * b、commander   模块处理命令行
 * c、download    下载库到本地
 * d、handlebars  模版引擎
 * e、inquirer    命令行向导
 * f、ora         下载中的loading效果
 * g、chalk       提示中的文字颜色等处理
 * h、logSymbols  成功、失败符号
 * */
```
```json
{
  "name": "init-vue-cli", // 要传到npm 的脚手架名称
  "version": "1.0.2", // 版本号，每次上传都需要更新
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bin": {
    "init-vue": "index.js"
  },
  "dependencies": {
    "commander": "^7.2.0",
    "download-git-repo": "^3.0.2",
    "handlebars": "^4.7.7",
    "inquirer": "^8.0.0",
    "ora": "^5.4.0",
    "chalk": "^4.1.0"
  }
}
```
## 项目运行

```bash
# 安转全局依赖
npm install -g init-vue-cli
```
## 选择模版安装
> init-vue-cli init templateA test

