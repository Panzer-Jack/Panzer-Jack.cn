---
title: 基于Python socket利用TCP协议让上下位机 传输图片
date: "2023-01-17 19:27:38"
tags:
    - 学习
---

##### Notes

之前用来做 基于QT 的物联网图形化软件的其中一个功能，因为在这遇到过许多坑所以分享一下我的解决方案，比如图片传输只传输了一部分。。各种丢数据。。最后终于实现了一个有效的方法。

---

## 1. 原理

1. 在接受图片数据帧前 先让下位机发送一个 图片数据帧的字长。然后在以此为循环出口，不断把接收过来的图片数据帧加起来，最后得到图片的数据帧。

<br><br>

## 2. 下位机代码：

```python

# 服务端的IP地址 + 建立TCP客户端
Server_Host = '192.168.1.1'
ListenSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ListenSocket.connect((Server_Host, 1919))

def send_msg(self):
    """发送身份信息到上位机"""
    # 图片数据帧的长度
    encode_len = str(len(self.pic_data)).encode()
    print(len(encode_len))

    # 发送图片数据帧的长度
    ListenSocket.send(encode_len)
    time.sleep(1)
    # 发送图片数据帧
    ListenSocket.send(self.pic_data)

	# 下面是用来防差错测试的（可以不写）
	# 验证发送的图片 是否正确
    nparr = np.fromstring(self.pic_data, dtype='uint8')
    img_decode = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print(img_decode)
    cv2.imshow("img_decode", img_decode)  # 显示图片
    cv2.waitKey(0)
```

<br><br>

## 3. 上位机代码：

```python
# TCP服务端
Server_Host = '192.168.137.1'  # 填写上位机的 IP地址
Client_Host = '192.168.137.47'  # 填写下位机的 IP地址

tcpServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
tcpServer.bind((Server_Host, 1919))
tcpServer.listen(10)

img_decode = None

class recvTCP_thread():
	def my_recv(self, sock, count):
		"""利用接收的图片长度把图片数据帧加起来"""
        data = b''
        while count:
            recvData = sock.recv(count)
            if not recvData:
                return None
            data += recvData
            count -= len(recvData)
        return data

	def recv_img(self):
		"""主函数"""
	    client, address = tcpServer.accept()
	    while True:
			# 接收二进制图片数据帧长度
	        tempdata_len = client.recv(1024).decode()
	        print(int(tempdata_len))
			# 使用my_recv函数来 接收二进制图片数据帧
	        data = self.my_recv(client, int(tempdata_len))
			# 把二进制图片转换格式
	        nparr = np.fromstring(data, dtype='uint8')
	        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
	        break

		# 显示图片
	    cv2.imshow("img_decode", img)  # 显示图片
	    cv2.waitKey(0)
```
