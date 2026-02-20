---
title: OpenCV-颜色反转算法
date: "2022-06-01 14:42:22"
tags: 计算机视觉
---

##### 导读

1. 灰度图像颜色反转
2. 彩色图像颜色反转

---

# 1. 灰度图像颜色反转

```py
import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 1)
imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgInfo = img.shape

dst = np.zeros((imgInfo[0], imgInfo[1], 1), np.uint8)

for i in range(0, imgInfo[0]):
    for j in range(0, imgInfo[1]):
        dst[i, j] = 255-imgGray[i, j]

cv2.imshow("", dst)
cv2.waitKey(0)
```

---

# 2. 彩色图像颜色反转

```py
import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 1)
imgInfo = img.shape

dst = np.zeros((imgInfo[0], imgInfo[1], 3), np.uint8)

for i in range(0, imgInfo[0]):
    for j in range(0, imgInfo[1]):
        dst[i, j] = 255-img[i, j]

cv2.imshow("", dst)
cv2.waitKey(0)
```
