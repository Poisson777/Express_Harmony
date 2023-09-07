import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';
export default {
    data: {
        title: "",
        mid:0,
        id:"",
        userName:"",
        realName:"",
        info:"",
        email:"",
        face:"",
        phone:"",
    },
    onInit() {
    },
    back(){
        router.back({
            path: "pages/userCenter/userCenter"
        })
    },
    showDialog() {
        console.log(11111)
        this.$element('hintDialog').show()
    },
    hideDialog() {
        this.$element('hintDialog').close()
    },
    messageSave(){
        if(this.id.length<18)
        {
            prompt.showToast({
                message: '身份证长度必须为18位',
                duration: 6000,
            });
        }
        else {
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
                "http://175.27.240.185:8080/expressman/updateInfo",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        mid: this.mid,
                        nickname: this.userName,
                        info: this.info,
                        face: this.face,
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
                    console.info('cookies:' + data.cookies); // 8+
                    var json = JSON.parse(data.result)

                    console.info("第一次修改结束")

                    let httpRequest2 = http.createHttp();
                    console.info("hhh" + JSON.stringify(httpRequest2))
                    httpRequest2.on('headerReceive', (err, data) => {
                        if (!err) {
                            console.info('Result:' + data.result);
                            console.info('code:' + data.responseCode);
                            console.info('header:' + JSON.stringify(data.header));
                            console.info('cookies:' + data.cookies); // 8+
                        } else {
                            console.info('error:' + JSON.stringify(err));
                        }
                    });
                    console.info("hhh2" + JSON.stringify(httpRequest2))
                    httpRequest2.request(
                        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                        "http://175.27.240.185:8080/expressman/authExpressman",
                        {
                            method: 'POST', // 可选，默认为http.RequestMethod.GET
                            // 开发者根据自身业务需要添加header字段
                            header: {
                                'Content-Type': 'application/json'
                            },
                            // 当使用POST请求时此字段用于传递内容
                            extraData: {
                                mid: this.mid,
                                id_card: this.id,
                                phone: this.phone,
                                real_name: this.realName,
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
                            console.info('cookies:' + data.cookies); // 8+
                            var json = JSON.parse(data.result)
                            console.info("实名认证成功")

                        } else {
                            console.info('error:' + JSON.stringify(err));
                            // 当该请求使用完毕时，调用destroy方法主动销毁。
                            httpRequest2.destroy();
                        }
                    })


                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            })
            this.$element('hintDialog').close()
            router.push({
                uri: "pages/deliverymanCenter/deliverymanCenter",
                params: {
                    mid: this.mid,
                },
            })
        }
    },
    changeNick(e){
        console.info(e.value);
        this.userName=e.value;
    },
    changePhone(e){
        console.info(e.value);
        this.phone=e.value;
    },
    changeReal(e){
        console.info(e.value);
        this.realName=e.value;
    },
    changeInfo(e){
        console.info(e.value);
        this.info=e.value;
    },
    changeId(e){
        console.info(e.value);
        this.id=e.value;
    },
    changeEmail(e){
        console.info(e.value);
        this.email=e.value;
    }
}
