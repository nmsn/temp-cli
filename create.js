import download from "download-git-repo";
import ora from "ora";
import process from 'node:process';
import inquirer from 'inquirer';
import chalk from "chalk";
import fs from 'fs-extra';
import logSymbols from "log-symbols";
import { changePackageJson } from './utils.js';

const create = async () => {
  const answer = await inquirer.prompt([
    {
        type:"list",
        name:"project",
        message:"请选择项目模版",
        choices:['项目一','项目二']
    },
    {
      type:"input",
      name:"name",
      message:"请输入项目名称"
    },
    {
      type:"input",
      name:"description",
      message:"请输入项目介绍"
    },
  ]);
  
  
  const startTime = Date.now();
  
  const { project, name, description } = answer;
  
  const templateList = [{ name: '项目一', temp: 'github:vuejs/vue' }, { name: '项目二', temp: 'github:vuejs/vue' }];
  
  const cur = templateList.find(item => item.name === project);
  
  if (fs.existsSync('temp')) {
    const answer = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: '项目存在同名文件夹，请问是否进行覆盖？',
      }
    ]);

    if (!answer.confirm) {
      console.log(logSymbols.warning, chalk.yellow('项目存在同名文件夹，未进行覆盖，流程终止'));
      return;
    }
  }
  
  
  const spinner = ora(chalk.green("正在创建项目中")).start();
  
  download(cur.temp, `${process.cwd()}/temp`, {}, function (err) {
    const endTime = Date.now();
    if (err || !project || !name) {
      spinner.fail(chalk.red("项目创建失败, xxx 不能为空"));
      return;
    }
    
    changePackageJson('./temp', { name, description });
    
    spinner.succeed(`${chalk.green("项目创建完毕")}，花费时间为 ${chalk.blue(endTime - startTime)} ms`);
  });
};


create();

