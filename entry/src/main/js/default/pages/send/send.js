import prompt from '@system.prompt';
import router from '@system.router';

import http from '@ohos.net.http';

export default {
    data: {
        title: "",
        teltext: "",
        postext: "",
        nametext: "",
        teltext2: "",
        postext2: "",
        nametext2: "",
        text_button:"寄！",
    },
    onInit() {
        this.title = "";
        this.postext = "";
        this.teltext = "";
        this.nametext = "";
        console.info(this.type)
    },
    back() {
        router.back()
    },
    change0(e) {
        this.nametext = e.text;
        console.log(this.nametext)
    },
    change(e) {
        this.teltext = e.text;
    },
    change1(e) {
        this.postext = e.text;
    },
    change2(e) {
        this.nametext2 = e.text;
    },
    change3(e) {
        this.teltext2 = e.text;
    },
    change4(e) {
        this.postext2 = e.text;
    },
    getuidbytel(i) {
    },
    send() {
        console.info(this.type)
        if (this.postext2 != "" && this.postext != '' && this.teltext2 != "" && this.teltext != "" && this.nametext != "" && this.nametext2 != "") {
            var address1 = this.postext;
            var address2 = this.postext2;
            //对address1进行解析
            var location1 = address1.split("市")[0] + "市";
            var location2 = address2.split("市")[0] + "市";
            var uid1;
            var uid2;
            let httpRequest = http.createHttp();
            httpRequest.on('headerReceive', (err, data) => {
            });
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/user/getUidByPhone",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json',
                        Connection: 'Keep-Alive',
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        phone: this.teltext,
                    },
                    connectTimeout: 60000, // 可选，默认为60s
                    readTimeout: 60000, // 可选，默认为60s
                }, (err, data) => {
                if (!err) {
                    // data.result为http响应内容，可根据业务需要进行解析
                    var json = JSON.parse(data.result)
                    if (json.code == 200) {
                        console.info(json.data.uid)
                        console.info("成功")
                        uid1 = json.data.uid;
                        let httpRequest = http.createHttp();
                        httpRequest.on('headerReceive', (err, data) => {
                        });
                        httpRequest.request(
                            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                            "http://175.27.240.185:8080/user/getUidByPhone",
                            {
                                method: 'POST', // 可选，默认为http.RequestMethod.GET
                                // 开发者根据自身业务需要添加header字段
                                header: {
                                    'Content-Type': 'application/json',
                                    Connection: 'Keep-Alive',
                                },
                                // 当使用POST请求时此字段用于传递内容
                                extraData: {
                                    phone: this.teltext2,
                                },
                                connectTimeout: 60000, // 可选，默认为60s
                                readTimeout: 60000, // 可选，默认为60s
                            }, (err, data) => {
                            if (!err) {
                                // data.result为http响应内容，可根据业务需要进行解析
                                var json = JSON.parse(data.result)
                                if (json.code == 200) {
                                    console.info(json.data.uid)
                                    console.info("成功")
                                    /**/
                                    uid2 = json.data.uid;
                                    if (this.type == "admin") {
                                        var expressname = this.nametext + "的快递";
                                        var nid = 1;
                                        let httpRequest = http.createHttp();
                                        httpRequest.on('headerReceive', (err, data) => {
                                        });
                                        httpRequest.request(
                                            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                                            "http://175.27.240.185:8080/network/insertExpress",
                                            {
                                                method: 'POST', // 可选，默认为http.RequestMethod.GET
                                                // 开发者根据自身业务需要添加header字段
                                                header: {
                                                    'Content-Type': 'application/json',
                                                    Connection: 'Keep-Alive',
                                                },
                                                // 当使用POST请求时此字段用于传递内容
                                                extraData: {
                                                    nid: this.nid,
                                                    name: expressname,
                                                    from_uid: uid1,
                                                    to_uid: uid2,
                                                    from_location: location1,
                                                    from_address: address1,
                                                    to_location: location2,
                                                    to_address: address2,
                                                    weight: 1,
                                                    type: "随便写",

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
                                                if (json.code == 200) {
                                                    prompt.showToast({
                                                        message: '寄出成功',
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
                                    } else if (this.type == "expressman") {
                                        console.info(this.type+"hahahahahaha")
                                        var expressname = this.nametext + "的快递";
                                        var nid = 1;
                                        let httpRequest = http.createHttp();
                                        httpRequest.on('headerReceive', (err, data) => {
                                        });
                                        httpRequest.request(
                                            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                                            "http://175.27.240.185:8080/expressman/finishUserRequest",
                                            {
                                                method: 'POST', // 可选，默认为http.RequestMethod.GET
                                                // 开发者根据自身业务需要添加header字段
                                                header: {
                                                    'Content-Type': 'application/json',
                                                    Connection: 'Keep-Alive',
                                                },
                                                // 当使用POST请求时此字段用于传递内容
                                                extraData: {
                                                    request_id: this.request_id,

                                                    eid: this.mid,
                                                    name: "日用品",
                                                    from_uid: uid1,
                                                    to_uid: uid2,
                                                    from_location: location1,
                                                    from_address: address1,
                                                    to_location: location2,
                                                    to_address: address2,
                                                    weight: 1,
                                                    state: "待入库",
                                                    type: "随便写",


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
                                                console.info("请求的id是：" + this.request_id + "  " + this.current_location)
                                                var json = JSON.parse(data.result)
                                                console.info(json.code)
                                                if (json.code == 200) {
                                                    this.text_button="已寄件"
                                                    prompt.showToast({
                                                        message: '寄出成功',
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
                                    }
                                    /**/
                                }
                            } else {
                                console.info('error:' + JSON.stringify(err));
                                // 当该请求使用完毕时，调用destroy方法主动销毁。
                                httpRequest.destroy();
                            }
                        }
                        );
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
                message: '信息不完全',
                duration: 3000,
            });
        }
    }
}
