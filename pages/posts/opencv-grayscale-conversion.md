---
title: OpenCV-灰度算法[API与源码实现]
date: "2022-06-01 13:52:36"
tags: 计算机视觉
---

##### 导读

1. API调用（2个方法）
2. 源码实现法（2个方法）

---

# API调用

## API调用法1 ----> imread 改参

```py
import cv2
import numpy as np

img = cv2.imread("../01_Img/01.jpg", 0)
cv2.imshow("", img)
cv2.waitKey(0)
```

## API调用法2 ----> cvtColor 函数

```python
import cv2
import numpy as np

# 方法2 ----> cvtColor 函数
img = cv2.imread("../01_Img/01.jpg", 1)
dst = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

cv2.imshow("", dst)
cv2.waitKey(0)
```

---

# 源码实现

## 源码实现法1 ----> 均值法

```python
    import cv2
    import numpy as np

    img = cv2.imread("../01_Img/01.jpg", 1)
    imgInfo = img.shape
    dst = np.zeros((imgInfo[0], imgInfo[1], imgInfo[2]), np.uint8)

    for i in range(0, imgInfo[0]):
        for j in range(0, imgInfo[1]):
            (b, g, r) = img[i, j]
            gray = (int(b)+int(g)+int(r))/3
            dst[i, j] = (gray, gray, gray)

    cv2.imshow("", dst)
    cv2.waitKey(0)
```

```py
## 源码实现法2 ----> 心理学法

    import cv2
    import numpy as np
    # 心理学法：gray = r*0.299+g*0.587+b*0.114

    img = cv2.imread("../01_Img/01.jpg", 1)
    imgInfo = img.shape
    dst = np.zeros((imgInfo[0], imgInfo[1], imgInfo[2]), np.uint8)

    for i in range(0, imgInfo[0]):
        for j in range(0, imgInfo[1]):
            (b, g, r) = img[i, j]
            gray = r * 0.299 + g * 0.587 + b * 0.114
            dst[i, j] = (gray, gray, gray)

    cv2.imshow("", dst)
    cv2.waitKey(0)

---

# 算法优化

1.  整型 速度快于 浮点型
2.  +-运算 速度快于 \*/运算

        import cv2
        import numpy as np

        img = cv2.imread("../01_Img/01.jpg", 1)
        imgInfo = img.shape
        dst = np.zeros((imgInfo[0], imgInfo[1], imgInfo[2]), np.uint8)

        for i in range(0, imgInfo[0]):
            for j in range(0, imgInfo[1]):
                (b, g, r) = img[i, j]
                # gray = (r * 1 + g * 2 + b * 1)/4
                gray = (r + (g<<1) + b) >> 2
                dst[i, j] = (gray, gray, gray)

        cv2.imshow("", dst)
        cv2.waitKey(0)
```
