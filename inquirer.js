import inquirer from 'inquirer';
// prompt 方法，传入对象数组，对象中type问题类型
inquirer.prompt([
    {
        type:"list",
        name:"项目一",
        message:"请选择项目模版",
        choices:['项目一','项目二']
    },
    {
      type:"input",
      name:"project",
      message:"请输入项目名称"
  },
]).then(answer=>{
    console.log(answer)
})