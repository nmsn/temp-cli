import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import logSymbols from 'log-symbols'

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// 修改package.json配置
export async function changePackageJson(name, info) {
  try {
    const pkg = await fs.readJson(resolveApp(`${name}/package.json`));
    console.log();
    Object.keys(info).forEach((item) => {
      if (info[item] && info[item].trim()) {
        pkg[item] = info[item];
      }
    });
    await fs.writeJson(resolveApp(`${name}/package.json`), pkg, { spaces: 2 });
  } catch (err) {
    console.log(err);
    console.log(logSymbols.warning, chalk.yellow("更新项目信息失败,请手动修改package.json"));
  }
}
