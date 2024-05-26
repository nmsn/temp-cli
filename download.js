import download from "download-git-repo";
import process from 'node:process';

download('nmsn/badge', `${process.cwd()}/下载目录`, {}, function (err) {
  console.log(err ? "下载失败" : "下载成功");
});
