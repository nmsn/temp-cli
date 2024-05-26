import ora from 'ora';
const spinner = ora('下载中，请等待')
spinner.start()
setTimeout(()=>{
    spinner.stop()
},3000)