---
title: 关于 flask db 指令没法识别问题
date: "2023-04-25 13:13:28"
tags: 学习
---

###### Notes：本问题是关于 flask db init 使用出现 No such command “db” 这个问题 （ 或者flask自定义指令@app.cli.command()等无法识别 ）

可能 你会因为pip自命名来管理python版本等一系列原因为了方便而去录入python的Scripts目录到系统变量里。。或者你不习惯使用虚拟环境来开发项目。。。

# 那么。。。

**请一定注意**有优先看一下 Window的**环境变量**里 是否 存在 **两个拥有 Flask 库**的 Python环境被**录入到 系统环境变量里了**！！！！

如果有，并且你恰巧把另一个Python的Scripts路径 放到系统变量PATH里头，那么你需要注意了。

![](https://pic1.imgdb.cn/item/6998987bbb93d236450b6a65.png)

看到了吗。。。这边有个flask.exe

如果你在你的pycharm终端里执行flask db xxx命令 甚至或者是 你自定义的（@app.cli.command()） flask指令。。。那么你很幸运，你的终端执行和检查的并不是你的项目解释器版本的python，而是你系统变量里的那个。。。那么你不管怎么做。。当然都无法执行你想要的 Python解释器的 flask 指令。。他会被索引去执行你系统变量里的那个flask.exe。。。

---

# 解决方法

很简单 把系统环境变量里的那个Python的Scripts路径删了就行了。

那么怎么删？这个问题请百度: 系统环境变量设置。
