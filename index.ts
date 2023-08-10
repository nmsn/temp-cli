import download from "download-git-repo";
import ora from "ora";
import process from 'node:process';

const spinner = ora("Loading").start();

download("nmsn/badge", `${process.cwd()}/temp`, {}, function (err) {
  console.log(err ? "Error" : "Success", err);
  spinner.succeed("Download");
});
