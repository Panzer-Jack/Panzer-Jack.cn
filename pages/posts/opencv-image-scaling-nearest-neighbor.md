---
title: OpenCV-图片缩放算法[最近领域插值法]
date: "2022-05-31 09:47:02"
tags: 计算机视觉
---

# 最近领域插值法

img.jpg = 10x20 ----> dst_img.jpg = 5x10

功能：图片缩放

案例：

dst_img(1, 2) <---- img(2, 4)

dst_img的x=1 来自 img的x=2

原图像的 x = 目标图像的 x*(原图像的行/目标图像的行) ----> 原图像的 2 = 目标图像的 1*(10/5)

原图像的 y = 目标图像的 y*(原图像的列/目标图像的列) ----> 原图像的 4 = 目标图像的 2*(20/10)

如果 x 或 y = 浮点型, 则结果化为整型 ----> 原图像的 x = 114.514 = 目标图像的 x = 114

Python 源码实现:

```py
import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 1)
imgInfo = img.shape
img_height, img_width, img_mode = imgInfo
dst_height = int(img_height/2)
dst_width = int(img_width/2)
dstImage = np.zeros((dst_height, dst_width, 3), np.uint8)  # 0 ~ 255
for i in range(0, dst_height):  # 行信息
    for j in range(0, dst_width):  # 列信息
        iNew = int(i*(img_height*1.0/dst_height))
        jNew = int(j*(img_width*1.0/dst_width))
        dstImage[i, j] = img[iNew, jNew]

cv2.imshow("dstImage", dstImage)
cv2.waitKey(0)
```
