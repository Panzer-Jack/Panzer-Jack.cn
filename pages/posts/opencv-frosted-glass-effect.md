---
title: OpenCV-毛玻璃算法
date: "2022-06-01 16:04:46"
tags: 计算机视觉
---

##### NOTES

1. 首先让 目标图像 获取 一遍原图像所有像素点的BGR, 因为 该算法实现会导致最外围的 maoRange 为 黑点
2. 其次使 目标图像 使用随机数算法获取 maoRange 内随机一个像素点
3. maoRange 为 规定的毛玻璃效果范围

---

# 1. 马赛克算法

```py
import random
import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 1)
imgInfo = img.shape

dst = np.zeros((imgInfo[0], imgInfo[1], imgInfo[2]), np.uint8)
maoRange = 8

for m in range(0, imgInfo[0]):
    for n in range(0, imgInfo[1]):
            dst[m, n] = img[m, n]

for m in range(0, imgInfo[0]-maoRange):
    for n in range(0, imgInfo[1]-maoRange):
            dst[m, n] = img[m+int(random.uniform(0, maoRange)), n+int(random.uniform(0, maoRange))]

cv2.imshow("dst", dst)
cv2.waitKey(0)
```
