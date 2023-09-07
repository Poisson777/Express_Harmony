import router from '@system.router'
import prompt from '@system.prompt';
import http from '@ohos.net.http';

var trueCode = ""
var role = "user"

export default {
    data: {
        title: "",
        account: "",
        email: "",
        code: "",
        password: "",
        rePassword: "",
        radio1: true,
        radio2: false,
        radio3: false
    },
    onInit() {
        this.title = "Hello World";
    },
    back() {
        router.back()
    },
    onRadioChange(e) {
        console.log(JSON.stringify(e))
        if (e.value == 'radio2') {
            this.radio1 = false;
            this.radio2 = true;
            this.radio3 = false;
            role = "expressman"
        }
        if (e.value == 'radio3') {
            this.radio1 = false;
            this.radio2 = false;
            this.radio3 = true;
            role = "admin"
        }
        if (e.value == 'radio1') {
            this.radio1 = true;
            this.radio2 = false;
            this.radio3 = false;
            role = "user"
        }
    },
    register() {
        if (this.account == "" || this.password == "" || this.rePassword == "" || this.email == "" || this.code == "") {
            prompt.showToast({
                message: '信息填写不完整',
                duration: 3000,
            });
        } else {
            if (this.password != this.rePassword) {
                prompt.showToast({
                    message: '两次密码不相同',
                    duration: 3000,
                });
            } else if (this.code != trueCode) {
                prompt.showToast({
                    message: '邮箱验证码错误',
                    duration: 3000,
                });
            } else {
                //开始提交注册
                if (role == "user") {
                    let httpRequest = http.createHttp();
                    httpRequest.on('headerReceive', (err, data) => {
                        if (!err) {
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8+
                        } else {
                            console.info('error:' + JSON.stringify(err));
                        }
                    });
                    httpRequest.withCredentials=true;
                    httpRequest.request(
                        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                        "http://175.27.240.185:8080/user/register2",
                        {
                            method: 'POST', // 可选，默认为http.RequestMethod.GET
                            // 开发者根据自身业务需要添加header字段
                            header: {
                                'Content-Type': 'application/json',
                                Connection: 'Keep-Alive',
                            },
                            // 当使用POST请求时此字段用于传递内容
                            extraData: {
                                username:this.account,
                                password:this.password,
                                email: this.email,
                                nickname:this.account
                            },
                            connectTimeout: 60000, // 可选，默认为60s
                            readTimeout: 60000, // 可选，默认为60s
                        }, (err, data) => {
                        if (!err) {
                            // data.result为http响应内容，可根据业务需要进行解析
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            // data.header为http响应头，可根据业务需要进行解析
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8

                            var json = JSON.parse(data.result)
                            console.info(json.code)
                            if (json.code == 200) {
                                router.replace({
                                    uri: "pages/index/index",
                                    params: {

                                    }
                                })
                            }
                        } else {
                            console.info('error:' + JSON.stringify(err));
                            // 当该请求使用完毕时，调用destroy方法主动销毁。
                            httpRequest.destroy();
                        }
                    }
                    );
                }
                if (role == "admin") {
                    let httpRequest = http.createHttp();
                    httpRequest.on('headerReceive', (err, data) => {
                        if (!err) {
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8+
                        } else {
                            console.info('error:' + JSON.stringify(err));
                        }
                    });
                    httpRequest.withCredentials=true;
                    httpRequest.request(
                        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                        "http://175.27.240.185:8080/admin/networkAdminRegister2",
                        {
                            method: 'POST', // 可选，默认为http.RequestMethod.GET
                            // 开发者根据自身业务需要添加header字段
                            header: {
                                'Content-Type': 'application/json',
                                Connection: 'Keep-Alive',
                            },
                            // 当使用POST请求时此字段用于传递内容
                            extraData: {
                                username:this.account,
                                password:this.password,
                                email: this.email,
                                nickname:this.account
                            },
                            connectTimeout: 60000, // 可选，默认为60s
                            readTimeout: 60000, // 可选，默认为60s
                        }, (err, data) => {
                        if (!err) {
                            // data.result为http响应内容，可根据业务需要进行解析
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            // data.header为http响应头，可根据业务需要进行解析
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8

                            var json = JSON.parse(data.result)
                            console.info(json.code)
                            if (json.code == 200) {
                                prompt.showToast({
                                    message: 'hao',
                                    duration: 3000,
                                });
                                router.replace({
                                    uri: "pages/index/index",
                                    params: {

                                    }
                                })
                            }
                        } else {
                            console.info('error:' + JSON.stringify(err));
                            // 当该请求使用完毕时，调用destroy方法主动销毁。
                            httpRequest.destroy();
                        }
                    }
                    );
                }
                if (role == "expressman") {
                    let httpRequest = http.createHttp();
                    httpRequest.on('headerReceive', (err, data) => {
                        if (!err) {
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8+
                        } else {
                            console.info('error:' + JSON.stringify(err));
                        }
                    });
                    httpRequest.withCredentials=true;
                    httpRequest.request(
                        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                        "http://175.27.240.185:8080/expressman/register2",
                        {
                            method: 'POST', // 可选，默认为http.RequestMethod.GET
                            // 开发者根据自身业务需要添加header字段
                            header: {
                                'Content-Type': 'application/json',
                                Connection: 'Keep-Alive',
                            },
                            // 当使用POST请求时此字段用于传递内容
                            extraData: {
                                username:this.account,
                                password:this.password,
                                email: this.email,
                                nickname:this.account,
                                nid:1,
                            },
                            connectTimeout: 60000, // 可选，默认为60s
                            readTimeout: 60000, // 可选，默认为60s
                        }, (err, data) => {
                        if (!err) {
                            // data.result为http响应内容，可根据业务需要进行解析
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            // data.header为http响应头，可根据业务需要进行解析
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8

                            var json = JSON.parse(data.result)
                            console.info(json.code)
                            if (json.code == 200) {
                                router.replace({
                                    uri: "pages/index/index",
                                    params: {

                                    }
                                })
                            }
                        } else {
                            console.info('error:' + JSON.stringify(err));
                            // 当该请求使用完毕时，调用destroy方法主动销毁。
                            httpRequest.destroy();
                        }
                    }
                    );
                }
            }
        }
    },
    onTextChange(e) {
        console.info(JSON.stringify(e))
        console.info(e["target"]["attr"]["className"])
        var t = e["target"]["attr"]["className"];
        if (t == "account_input") {
            this.account = e.text;
        }
        if (t == "email_input") {
            this.email = e.text;
        }
        if (t == "code_input") {
            this.code = e.text;
        }
        if (t == "password_input") {
            this.password = e.text;
        }
        if (t == "repassword_input") {
            this.rePassword = e.text;
        }
    },
    send() {
        var rule = /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/;
        if (rule.test(this.email)) {
            let httpRequest = http.createHttp();
            console.info("hhh" + JSON.stringify(httpRequest))
            httpRequest.on('headerReceive', (err, data) => {
                if (!err) {
                    console.info('Result:' + data.result);
                    console.info('code:' + data.responseCode);
                    console.info('header:' + JSON.stringify(data.header));
                    console.info('cookies:' + data.cookies); // 8+
                } else {
                    console.info('error:' + JSON.stringify(err));
                }
            });
            console.info("hhh2" + JSON.stringify(httpRequest))
            httpRequest.withCredentials=true;
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/global/sendEmail",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json',
                        Connection: 'Keep-Alive',
                        withCredentials:true,
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        email: this.email,
                        role: role
                    },
                    connectTimeout: 60000, // 可选，默认为60s
                    readTimeout: 60000, // 可选，默认为60s
                }, (err, data) => {
                if (!err) {
                    // data.result为http响应内容，可根据业务需要进行解析
                    console.info('Result:' + data.result);
                    console.info('code:' + data.responseCode);
                    // data.header为http响应头，可根据业务需要进行解析
                    console.info('header:' + JSON.stringify(data.header));
                    console.info('cookies:' + data.cookies); // 8

                    var json = JSON.parse(data.result)
                    console.info(json.code)
                    if (json.code == 200) {
                        trueCode = json.data;
                    }else if(json.code==500212){

                        prompt.showToast({
                            message: '邮箱已经被使用了',
                            duration: 3000,
                        });
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            }
            );
        } else {
            prompt.showToast({
                message: '邮箱格式不正确',
                duration: 3000,
            });
        }
    }
}
