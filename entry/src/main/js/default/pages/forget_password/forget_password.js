import router from '@system.router'
import http from '@ohos.net.http';
import prompt from '@system.prompt';
var trueCode = ""
var role = "user"
export default {
    data: {
        title: "",
        radio1:true,
        radio2:false,
        radio3:false,
        account:"",
        code:"",
        password:"",
        repassword:""
    },
    onInit() {
        this.title = "Hello World";
    },
    back(){
        router.back()
    },
    change(e){
        this.account=e.text
    },
    change1(e){
        this.code=e.text;
    },
    change2(e){
        this.password=e.text
    },
    change3(e){
        this.repassword=e.text
    },
    onRadioChange(e) {
        console.log(JSON.stringify(e))
        if(e.value=='radio2') {
            this.radio1=false;
            this.radio2=true;
            this.radio3=false;
            role="expressman"
        }
        if(e.value=='radio3') {
            this.radio1=false;
            this.radio2=false;
            this.radio3=true;
            role="admin"
        }
        if(e.value=='radio1') {
            this.radio1=true;
            this.radio2=false;
            this.radio3=false;
            role="user"
        }
    },
    register(){
        if(this.repassword!=this.password){
            prompt.showToast({
                message: '两次密码输入不同',
                duration: 1000,
            });
        }else if(this.code!=trueCode){
            prompt.showToast({
                message: '邮箱验证码错误',
                duration: 1000,
            });
        }else {
            if(role=="user"){
                let httpRequest = http.createHttp();
                httpRequest.on('headerReceive', (err, data) => {
                });
                httpRequest.request(
                    // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                    "http://175.27.240.185:8080/user/updatePassword2",
                    {
                        method: 'POST', // 可选，默认为http.RequestMethod.GET
                        // 开发者根据自身业务需要添加header字段
                        header: {
                            'Content-Type': 'application/json',
                            Connection: 'Keep-Alive',
                        },
                        // 当使用POST请求时此字段用于传递内容
                        extraData: {
                            email: this.account,
                            password:this.password
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
            }else if(role=="admin"){
                let httpRequest = http.createHttp();
                httpRequest.on('headerReceive', (err, data) => {
                });
                httpRequest.request(
                    // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                    "http://175.27.240.185:8080/admin/networkAdminUpdatePassword2",
                    {
                        method: 'POST', // 可选，默认为http.RequestMethod.GET
                        // 开发者根据自身业务需要添加header字段
                        header: {
                            'Content-Type': 'application/json',
                            Connection: 'Keep-Alive',
                        },
                        // 当使用POST请求时此字段用于传递内容
                        extraData: {
                            email: this.account,
                            password:this.password
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
            }else {
                let httpRequest = http.createHttp();
                httpRequest.on('headerReceive', (err, data) => {
                });
                httpRequest.request(
                    // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                    "http://175.27.240.185:8080/expressman/updatePassword2",
                    {
                        method: 'POST', // 可选，默认为http.RequestMethod.GET
                        // 开发者根据自身业务需要添加header字段
                        header: {
                            'Content-Type': 'application/json',
                            Connection: 'Keep-Alive',
                        },
                        // 当使用POST请求时此字段用于传递内容
                        extraData: {
                            email: this.account,
                            password:this.password
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
        }
    },
    send() {
        var rule = /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/;

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
                "http://175.27.240.185:8080/global/forgetPassword/sendEmail",
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
                        email: this.account,
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
