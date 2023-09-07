
import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';

export default {
    data: {
        title: "",
        radio1: true,
        radio2: false,
        radio3: false,
        account: "",
        password: ""
    },
    onInit() {
        router.clear();//清楚页面栈
        this.title = this.$t('strings.world');
    },
    onShow(){
        router.clear();//清楚页面栈
    },
    accountchange(e){
        console.info(JSON.stringify(e))
        this.account=e.value

    },
    passwordchange(e){
        this.password=e.value

    },
    onRadioChange(e) {
        console.log(JSON.stringify(e))

        if (e.value == 'radio2') {
            this.radio1 = false;
            this.radio2 = true;
            this.radio3 = false;
        }
        if (e.value == 'radio3') {
            this.radio1 = false;
            this.radio2 = false;
            this.radio3 = true;
        }
        if (e.value == 'radio1') {
            this.radio1 = true;
            this.radio2 = false;
            this.radio3 = false;
        }
    },
    enter() {

        if (this.radio1) {
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
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/user/login",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        username:this.account,
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

                    var json=JSON.parse(data.result)
                    console.info(json.code)
                    console.info(json.data.uid)
                    if(json.code==200){
                    prompt.showToast({
                        message: 'hao',
                        duration: 3000,
                    });
                        router.replace({
                            uri: 'pages/user/user',
                            params: {
                                uid:json.data.uid
                            },
                        });
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            }
            );
             /**/
        }
        if (this.radio2) {

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
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/expressman/login",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        username:this.account,
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

                    var json=JSON.parse(data.result)
                    console.info(json.code)
                    console.info(json.data)
                    if(json.code==200){
                        prompt.showToast({
                            message: 'hao',
                            duration: 3000,
                        });
                        router.push({
                            uri: 'pages/deliveryman/deliveryman',
                            params: {
                                mid:json.data.mid
                            },
                        });
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            }
            );
        }
        if (this.radio3) {
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
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/admin/adminLogin",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        username:this.account,
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

                    var json=JSON.parse(data.result)
                    console.info(json.code)
                    console.info(json.data.uid)
                    if(json.code==200){
                        prompt.showToast({
                            message: 'hao',
                            duration: 3000,
                        });

                        router.push({
                            uri: 'pages/manage/manage',
                            params: {
                                account:this.account,
                                nid:json.data.nid
                            },
                        });
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            }
            );
        }
    },
    forget() {

        router.push({
            uri: 'pages/forget_password/forget_password',
            params: {},
        });
    },
    register() {
        console.log(1)
        router.push({
            uri: 'pages/index_register/index_register',
            params: {},
        });
    },
    about() {

    }
}
