---
title: OpenCV-边缘检测
date: "2022-06-01 19:17:26"
tags: 计算机视觉
---

# 1.步骤

1. sobel算子模板 2.图片卷积 3.阈值判定

# 2.源码实现

```python
import math

import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 1)
imgInfo = img.shape

yu = 100
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
dst = np.zeros((imgInfo[0], imgInfo[1], 1), np.uint8)
for i in range(0, imgInfo[0]-2):
    for j in range(0, imgInfo[1]-2):
        gy = gray[i, j]*1 + gray[i, j+1]*2 + gray[i, j+2]*1 - gray[i+2, j]*1 - gray[i+2, j+1]*2 - gray[i+2, j+2]*1
        gx = gray[i, j]*1 - gray[i, j+2]*1 + gray[i+1, j]*2 - gray[i+1, j+2]*2 + gray[i+2, j]*1 - gray[i+2, j+2]*1
        grad = math.sqrt(math.pow(gy, 2) + math.pow(gx, 2))
        if grad > yu:
            dst[i, j] = 255
        else:
            dst[i, j] = 0

cv2.imshow("dst", dst)
cv2.waitKey(0)
```
