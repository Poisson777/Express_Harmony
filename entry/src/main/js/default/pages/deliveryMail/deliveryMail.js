import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        pos:'是',
        posarr:['配送中', '待入库','中转站','目的站'],
        name:"示波器",
        myshow:false,
        number_mail:12,
        from:"福建省福州市",
        to:"福建省泉州市",
        uid:0,
        user:0,
        mid:0,

        eid:0,
        flag:1,
        flag_expressman:1,
        state:"配送中",
        now_location:"福建省福州市闽侯县",
        from_name:"张三",
        to_name:"李四",
        from_phonenum:"132746272",
        to_phonenum:"12415151",
        from_site:"福建省福州市闽侯县上街镇福州大学",
        to_site:"福建省泉州市南安县潘某家 ",
        type:"",
        is_picked:"确认揽件"


    },
    onInit() {

        this.number_mail=this.eid
        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/express/getExpressByEid",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    eid:this.eid

                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.info('Result1:' + data.result);
                console.info('code1:' + data.responseCode);
                var json=JSON.parse(data.result)
                console.info(json.code)
                console.info(json.message)
                console.info("要展示数据了："+json.data)
                var list=json.data
                this.from_name=list[0].from_name
                this.from_phonenum=list[0].from_phone
                this.from_site=list[0].from_location+list[0].from_address
                this.from=list[0].from_location
                this.to_name=list[0].to_name
                this.to_phonenum=list[0].to_phone
                this.to_site=list[0].to_location+list[0].to_address
                this.to=list[0].to_location
                this.state=list[0].state
                this.name=list[0].name
                this.pos=this.state;
                this.now_location=list[0].current_location
                console.info("user:"+this.user)
                console.info("state:"+this.state)
                if(this.state!="已送达" && this.user!=0)
                {
                    this.flag=0;
                }
                if(this.state=="目的站" && this.mid!=0)
                {
                    this.flag_expressman=0;
                }
                if(json.code==200){
                    prompt.showToast({
                        message: '查询成功',
                        duration: 3000,
                    });

                }
            } else {
                prompt.showToast({
                    message: '没有查询到该订单',
                    duration: 15000,
                });
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },
    showDialog() {
        console.log(11111)
        this.$element('hintDialog').show()
    },
    showDialog_expressman(){
        this.$element('hintDialog_expressman').show()
    },
    hideDialog() {
        this.$element('hintDialog').close()
        this.$element('hintDialog_expressman').close()
    },
    setPos(e){
        console.info(e)
        this.pos = e.newValue
        if(this.pos=="目的站"){
            let httpRequest = http.createHttp();
            httpRequest.on('headerReceive', (err, data) => {
            });
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/network/addExpress",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        eid:this.eid,
                        nid:this.nid
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
                    var json=JSON.parse(data.result)
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            })
        }
        if(this.pos=="周转中"){
            let httpRequest = http.createHttp();
            httpRequest.on('headerReceive', (err, data) => {
            });
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/network/deliverExpress",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        eid:this.eid,
                        nid:this.nid
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
                    var json=JSON.parse(data.result)
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            })
        }
        let httpRequest = http.createHttp();
        this.state=this.pos;
        console.info("hhh" + JSON.stringify(httpRequest))
        httpRequest.on('headerReceive', (err, data) => {
        });
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/express/setState",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    eid:this.eid,
                    state:this.state
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
                var json=JSON.parse(data.result)
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        })
    },
    confirmReceipt(){
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
            "http://175.27.240.185:8080/user/confirmReceipt",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    eid:this.eid,
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
                var json=JSON.parse(data.result)
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        })
        this.$element('hintDialog').close()
        router.back();
    },
    confirmReceipt_expressman()
    {
        let httpRequest3 = http.createHttp();
        console.info("hhh" + JSON.stringify(httpRequest3))
        httpRequest3.on('headerReceive', (err, data) => {
            if (!err) {
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
            } else {
                console.info('error:' + JSON.stringify(err));
            }
        });
        console.info("hhh2" + JSON.stringify(httpRequest3))
        httpRequest3.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/canvassExpress",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    eid:this.eid,
                    mid:this.mid
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
                var json=JSON.parse(data.result)
                this.data3=json.data;
                this.$element('hintDialog_expressman').close()
                this.is_picked="已揽件"



            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest3.destroy();
            }
        })
    }

}
