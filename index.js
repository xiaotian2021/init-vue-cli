#! /usr/bin/env node
// 使用node环境执行当前文件,必须添加在首行


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

const { program } = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')

program
    .version('1.0.2') //cls 输入 -v || --version 输出的版本号
    .description('An application for pizza ordering')

/**
 * 2、定义模版选择
 * demo init a aName
 * 基于 a 模版进行初始化
 * */
const Templates = {
    templateA: {
        url: 'https://github.com/xiaotian2021/test.git', // 仓库地址
        downloadUrl: 'http://github.com:xiaotian2021/test#master', // 下载地址
        desc: '模版A'
    },
    templateB: {
        url: 'https://github.com/xiaotian2021/vue-markdown.git',
        downloadUrl: 'http://github.com:xiaotian2021/vue-markdown#master',
        desc: '模版B'
    }
}

/**
 * 命令行测试：demo init webpack abc
 * templateName : 模版名称，projectName:项目名称
 * */
program
    .command('init <template> <project>')
    .description("初始化模版")
    .action((templateName, projectName) => {
        //开始下载loading
        const spinner = ora('正在下载文本').start()
        // 根据模版名称下载对应的模版，并且命名未 projectName
        const { downloadUrl }  = Templates[templateName]
        download(downloadUrl, projectName, {clone: true}, (err) => {
            if (err) return spinner.fail()
            spinner.succeed()
            // 1、读取package.json文件内容
            // 2、采集用户输入的值，使用模版引擎解析内容后重新写入文件
            inquirer
                .prompt([
                    /* Pass your questions in here */
                    {
                        type: 'input',
                        name: 'name',
                        message: "请输入项目名称",
                    },
                    {
                        type: 'input',
                        name: 'description',
                        message: "请输入项目描述",
                    },
                    {
                        type: 'input',
                        name: 'author',
                        message: "请输入作者",
                    }
                ])
                .then(answers => {
                    // 解析替换文件中的字段
                    const content = fs.readFileSync(`${projectName}/package.json`, 'utf8')
                    const result = handlebars.compile(content)(answers)
                    fs.writeFileSync(`${projectName}/package.json`, result)
                    console.log(chalk.blue("初始化成功"))
                })
                .catch(error => {
                    if(error.isTtyError) {
                        // Prompt couldn't be rendered in the current environment
                    } else {
                        // Something else went wrong
                    }
                })
        })
    })

program
    .command('list')
    .description("查看所有的模版")
    .action(() => {
        for (let key in Templates) {
            console.log(`${key} ${Templates[key].desc}`)
        }
    })

program.parse();

/**
 * 1、npm login
 * 2、npm pulish
 * */
