---
title: 关于 flask-mail 部署在云端 nginx服务器上 504 Gateway Time-out 超时问题
date: "2023-04-25 13:17:15"
tags: 学习
---

### Notes：

系统环境：

- Ubuntu 20
- Python 3.8
- Nginx
- Flask
- Vue3
- redis
- mysql

###### CSDN、StackOverflow、百度、Google。。。能想的地方都去翻了个遍都没能找到这个问题的解答（悲）。。

问题是这样的：因为不分离开发不是很方便后续扩展维护，我将前端移植到vue3 经过Restful API 将原项目前后端分离并部署在了nginx上。但是在新网站上发现 原有的邮件验证码发送功能给堵死了。。对是堵死了。。这个功能给卡住，导致它后面的程序也执行不了。。我用异步发送的形式重新实现了下，但是还是依旧504 超时。。并且它后续程序依然没有执行, 对及时是启动异步，但还是卡死了。。。

```python

def send_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            print(e)
            pass

# 发送邮件
class Get_email_captcha(Resource):
    def get(self):
        email = request.args.get("email")
        print(email)
        captcha = str(random.randint(1000, 9999))
        message = Message(subject="xxx·注册验证码",
                          recipients=[email],
                          body=f"您的验证码是: {captcha}")

        # 验证码存储
        redis_client.set("captcha", captcha)
        print(redis_client.get("captcha"))

        # 发送邮件异步优化
        Thread(target=send_email, args=[current_app._get_current_object(), message]).start()

        return jsonify({"code": 200, "message": "", "data": None})

```

通过排错测试，我发现在基于Restful API 的 邮件发送接口处 mail.send(msg) 这个函数 直接堵死。但我原来网站是做成不分离的形式，并没有出现这个问题。并且这个问题只出现在了云端服务器上，我在本地测试时候是没有这个问题了。

刚开始时我在想是不是因为Nginx上配置错了导致的。。。但测了后发现 很明显前端能发送到该API接口处。。（做了print），因此定位到了mail.send()这个函数上。

然后我去各种网站上翻，无一例外都在说，是服务器给smtp邮件开的端口号被blocked导致的。。那么问题来了，如果真的blocked 那我不分离时的老程序 为什么能运行。。。

最后没办法 只能将发送邮件从路由处去除放到根路由 然后拿老程序对比做测试

#### 新程序：

```python
import datetime
from flask import Flask, session, g, make_response
import config
from exts import db, cors, migrate, socketio, mail, api, auth
from models import UserModel
from blueprints.qa.qa import bp as qa_bp
from blueprints.auth.auth import bp as auth_bp
from utils.jwt import jwt_token_required
from flask_migrate import Migrate

from flask_socketio import SocketIO, send, emit, join_room, leave_room
import eventlet

eventlet.monkey_patch()

app = Flask(__name__)

# 绑定配置文件
app.config.from_object(config)
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(days=7)
socketio.init_app(app, cors_allowed_origins='*', async_mode="threading")
cors.init_app(app, supports_credentials=True)
db.init_app(app)
migrate.init_app(app, db)
mail.init_app(app)
api.init_app(app)
```

#### 老程序：

```python
from flask import Flask, session, g
import config
from exts import db, mail
from models import UserModel
from blueprints.qa import bp as qa_bp
from blueprints.auth import bp as auth_bp
from blueprints.console import bp as console_bp
from flask_migrate import Migrate

from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
# 绑定配置文件
app.config.from_object(config)
socketio = SocketIO(app)

db.init_app(app)
mail.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(qa_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(console_bp)
```

最后定位到了。。这个猴子补丁上。。( 恼

```python
import eventlet

eventlet.monkey_patch()
```

猴子补丁在云端环境下 好像和Flask-mail 的邮件发送有兼容性问题
把这个注释掉后在云服务器上的邮件就正常了。。。

### 后续问题

这个猴子补丁 本身是之前做websocket时加上去的
但该补丁在本地运行测试时是正常的（本地的版本是python3.11）
为什么放到云端环境运行就出现该问题了。。（ 云端的eventlet 和 flask-mail 均为 python3.8下的最新版本 ）
如果有人知道为什么。。方便的话 可以在评论区留言
