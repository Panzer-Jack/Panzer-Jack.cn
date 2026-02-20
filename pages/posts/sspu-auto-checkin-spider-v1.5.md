---
title: 上海第二工业大学-自动签到爬虫 V1.5
date: "2021-09-23 24:00:00"
tags: 爬虫
top_img: https://pic.imgdb.cn/item/624bf170239250f7c55c5fc1.jpg
---

##### 前言

项目是基于 今天下午被班长打电话 被告知了《论早晨签到重要性与不签会被处分的可能性》后 仔细思索一番 。。。 然后发现比起依赖自己那和鲸鱼一样的记忆力。。不如还是直接依赖电脑算了。。。所以就写了这个爬虫。。。

自动签到爬虫步骤：
· 准备相关模块
· python脚本编写
· Python程序 EXE执行文件 包装
· Win10 系统下 按时间自动运行脚本代码

---

<br><br><br>

#### V1.5 更新

1. 加入反游览器自动脚本检测
2. 加入伪装IP地址（代理IP）
3. 后台运行

---

<br><br><br>

# <font color=#FF0000 >准备：</font>

1. Python
2. selenium模块
3. chromedriver（对应你自己的谷歌游览器的版本，可以使用镜像网站下载）

---

<br><br><br>

# <font color=#FF0000 >脚本编写：</font>

---

### 导入相关模块：

导入相关模块，建立模拟游览器，我用的是Chrome，也可以使用其他游览器：

    import time
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    import selenium.webdriver

---

### 反爬技术：

    <!-- 反自动脚本检测 -->
    opt = Options()
    opt.add_experimental_option('excludeSwitches', ['enable-automation'])
    driver = selenium.webdriver.Chrome(options=opt)

    <!-- IP伪装 -->
    opt.add_argument("--proxy-server=http://代理IP地址:端口")

---

### 后台自动运行：

    opt.add_argument('--headless')
    opt.add_argument('disbale-gpu')

---

### 打开校园网：

    url = "https://hsm.sspu.edu.cn/"
    driver.get(url)
    time.sleep(2)

---

### 自动签到：

    driver.find_element_by_id("username").send_keys("你的账号")
    driver.find_element_by_id("password").send_keys("你的密码")
    driver.find_element_by_class_name("submit_button").click()
    time.sleep(1)
    driver.find_element_by_class_name("icos").click()
    driver.find_element_by_id("fineui_2-inputEl-icon").click()
    driver.find_element_by_id("p1_TiWen-inputEl").send_keys("36")
    driver.find_element_by_class_name("f-field-checkbox-switch").click()
    time.sleep(2)
    driver.find_element_by_class_name("f-btn-text").click()

---

### 自动退出游览器

    time.sleep(3)
    driver.quit()

---

<br><br><br>

# <font color=#FF0000 >Python程序 EXE 包装：</font>

---

### pip3 安装 pyinstaller

    <!-- 使用cmd命令台 -->
    pip3 install pyinstaller

---

### pyinstaller 包装 python脚本

    <!-- 使用cmd命令切换到当前路径下 -->
    <!-- 然后执行指令(下面的xxxx写你自己程序的名字)： -->
    pyinstaller  xxxx.py
    <!-- 然后在该目录下./dist/xxxx/xxxx.exe出现exe文件 -->

---

<br><br><br>

# <font color=#FF0000 >Win10 系统下 按时间自动运行脚本代码：</font>

1. 打开 控制面板\系统和安全\管理工具\任务计划程序
2. 创建基本任务（在右边那栏里头）：名称描述你自己随便写
3. 然后签到时间为 每天 （反正我们这边是每天都要签到的）
4. 每日：开始时间 就是 开始时间
5. 操作：启动程序
6. 将程序与脚本 牵引至 之前你所包装的python exe执行文件上
7. 点击完成
8. 重复设立 多个执行任务 （防止某一次卡机 爬虫程序失败）

---
