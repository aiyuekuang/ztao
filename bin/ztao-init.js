#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const glob = require('glob') // npm i glob -D
const download = require('../lib/download')
const chalk = require('chalk')


program.usage('<project-name>').parse(process.argv)

// 根据输入，获取项目名称
let projectName = program.args[0]

if (!projectName) {  // project-name 必填
    // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
    program.help()
    return
}

fs.exists(projectName, function (exists) {
    if (exists) {
        console.log(chalk.red(`项目${projectName}已经存在`))
        return
    } else {
        download(projectName)
            .then(target => console.log(`创建${target}完毕`))
            .catch(err => console.log(err))
    }
});
