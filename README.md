# 数据库管理后台

![GitHub](https://img.shields.io/github/license/mharry32/DBManageSys-Web)
![node-current](https://img.shields.io/node/v/v)

## 项目架构
本项目采用整洁架构（又称洋葱架构），使用前后端分离的开发模式。并附带基本的单元测试、集成测试和功能测试。

## 功能

- 在Web端添加、管理MySQL和SQL SERVER数据库，查看数据库的表和列架构
- 执行SQL语句，并得到执行结果
- 监控成功执行的SQL语句
- 角色、权限管理等基本后台管理功能
- 前后端分离架构
- ...

## 在线demo
[demo](http://mharry.eastasia.cloudapp.azure.com:8080/)  

默认账号：admin  

密码：DbSys888888!  

请不要更改密码！

## 运行环境

- Node.js
- Vue
- Nginx

## 如何编译和运行
本项目为前端项目。  
项目克隆到本地后  
- 安装依赖：npm install
- 调试运行：npm run serve
- 编译打包：npm run build
后端项目：[DBManageSystem](https://github.com/mharry32/DBManageSystem)

## 设置说明：
调试运行需要更改webpack devserver的代理配置。将前缀为/api的请求转发到后端地址  
正式上线则需要配置Nginx

## 项目截图
- 添加数据库
![image](https://user-images.githubusercontent.com/8725661/195496737-75ce00f6-709a-443b-b0d2-af9e8fbfd431.png)
- 查看数据库架构
![image](https://user-images.githubusercontent.com/8725661/195496942-0f8294bd-7ff6-4580-8bd8-5c7ac0aa2f2f.png)
- 执行SQL
![image](https://user-images.githubusercontent.com/8725661/195497875-d45eff48-8793-4635-b590-573713a531b3.png)
- 数据库管理
![image](https://user-images.githubusercontent.com/8725661/195497133-f49c68c0-2efe-4359-a232-297844682cf8.png)
- SQL报表
![image](https://user-images.githubusercontent.com/8725661/195497176-0997e7b7-90ec-473e-a14a-96cb31722f3c.png)

