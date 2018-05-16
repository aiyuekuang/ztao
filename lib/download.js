const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')


module.exports = function (target) {
    return new Promise((resolve, reject)=> {
        // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
        const url = 'https://github.com:aiyuekuang/react_home#master'
        const spinner = ora(`创建项目中...`)
        spinner.start()
        download(url,target, {clone: true}, (err) => {
                if (err) {
                    spinner.text = chalk.red('创建项目失败');
                    spinner.fail()
                    reject(err)
                } else {
                    // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
                    spinner.text = chalk.green('创建项目成功');
                    spinner.succeed()
                    resolve(target)
                }
            })
    })
}