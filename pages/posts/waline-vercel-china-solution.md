---
title: 关于waline评论功能在 国内无法使用的解决方案 （vercel.app国内无法使用问题）
date: "2022-10-20 00:06:43"
tags: 学习
---

##### Notes

总结一下，如果直接使用Vercel搭建的waline评论系统，评论系统出现问题，多半是vercel.app域名在国内遭到污染无法访问。这里提供一个实用的解决方案：用你已有的博客域名去免费申请一个子域名来代替vercel.app那个被污染的域名。

---

# 你需要什么？

1. 你拥有一个博客并且给它申请了域名。
   比如我的Blog： `www.panzer-jack.cn`
2. 按照步骤开通了waline所需的环境（leancloud、vercel那些）这里我就默认waline你已经搭建好了。

# 你需要做什么？

1. 打开你的域名管理控制台。
   · 比如我的腾讯云：
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/41047ce4ec9448c2ab7403c194318de7.png#pic_center)

2. **然后进去给你已有博客域名 添加一个 二级域名**：
   · 比如我 在腾讯云里的 `主机记录`里增加了一个叫做comment 并且 `CNAME` 解析记录指向了 cname.vercel-dns.com ， 如下图：
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/14f831afe4744176acd8a3b2634a244d.png#pic_center)
   这样我就拥有了一个 `comment.panzer-jack.cn` 的子域名了！

3. 在setting里设置 让你原有的vercel上的waline地址指向你设置的子域名上：
   ·![在这里插入图片描述](https://img-blog.csdnimg.cn/98a86a56d4374678a38b14ad558b5f0e.png#pic_center)

4. 最后
   · 酱酱！ 问题解决了![在这里插入图片描述](https://img-blog.csdnimg.cn/c51556e1121243fe82f01c1f4b5679c4.png#pic_center)
