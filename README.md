# 概念重点：
## 开发人员与运维人员的壁垒
运维人员要求稳定可靠，认为变更充满风险，开发人员则被鼓励频繁发布新代码，认为运维部门门对流程的坚持，阻碍了开发的速度。
开发与运维之间的脚本、配置、过程和环境存在差别。
开发和运维团队通常处于不同部门，通常有不同的管理者，通常是不信任的关系，而且通常工作在不同地点。
## DevOps的五要素
1. 文化
2. 自动化
3. 精益
4. 度量
5. 分享
## 操作实现：
1. 创建虚拟私有云、创建安全组、为安全组添加规则
2. 购买鲲鹏云服务器
3. 创建DevCloud项目
4. 上传代码
5. 编译构建
6. 部署应用
7. 实验验证
8. 资源释放
## 错误1-在第四步用小乌龟克隆本地仓库出现“git did not exit cleanly (exit code 128)”错误  
放弃使用小乌龟，使用Git Bash  
  1. 利用cd进入要上传的文件夹
  2. `git init` 创建本地仓库
  3. `git remote add origin SSH地址` 连接远程仓库
  4. `git remote -v` 查看连接情况
  5. `git pull --rebase origin master` 代码合并
  6. `git status` 查看当前目录提交状态
  7. `git add .` 提交到暂存区
  8. `git commit -m "描述信息"` 从暂存库提交到本地库
  9. `git push origin master` 推送到远程仓库
## 错误2-凭证管理出现错误
是因为之前我填写的用户名和密码出错了，所以git一直记住的是哪个凭证，我们需要把之前的凭证删除掉
## 错误3-JDK报错，TOM报错
仔细核对，发现JDK版本选错，绝对路径填写错了。

## 参考：
https://blog.csdn.net/weixin_44014201/article/details/109206167   
https://blog.csdn.net/weixin_44377911/article/details/105512102
