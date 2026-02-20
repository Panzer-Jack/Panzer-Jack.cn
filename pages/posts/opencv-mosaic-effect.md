---
title: OpenCV-马赛克算法
date: "2022-06-01 15:40:06"
tags: 计算机视觉
---

##### 规定

m,n 变量为所取马赛克范围

---

# 1. 马赛克算法

```py
import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 1)
imgInfo = img.shape

for m in range(100, 150):
    for n in range(100, 150):
        if m%10 == 0 and n%10 == 0:
            for i in range(0, 10):
                for j in range(0, 10):
                    (b, g, r) = img[m, n]
                    img[i+m, j+n] = (b, g, r)

cv2.imshow("dst", img)
cv2.waitKey(0)
```
