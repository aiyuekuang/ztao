const program = require('commander')
const fs = require('fs')
const download = require('../lib/download')
const chalk = require('chalk')
const co = require('co')
const prompt = require('co-prompt')


module.exports = () => {
    co(function *() {
// 根据输入，获取项目名称
        let type = yield prompt('项目是使用react还是vue？（react直接回车，vue则输入vue）：')
        let projectName = yield prompt('项目名称：')

        if (!projectName) {  // project-name 必填
            // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
            program.help()
            return
        }

        fs.exists(projectName, function (exists) {
            if (exists) {
                console.log(chalk.red(`项目${projectName}已经存在`))
                process.exit()
            } else {
                download(projectName,type)
                    .then(target => process.exit())
                    .catch(err => console.log(err))
            }
        });
    })
}
