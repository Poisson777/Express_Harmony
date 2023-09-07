import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';
export default {
    data: {
        uid:0,
        color1: "#FFFFFF",
        color: "#FF9575",
        color2: "#FFFFFF",
        textcolor1: "#FFFFFF",
        textcolor2: "#1684FC",
        textcolor3: "#1684FC",
        truecolor: "#FF9575",
        falsecolor: "#FFFFFF",
        falsecolor2: "#1684FC",
        trackNumber: "",
        //建议大家1.本地数据  2.网络数据
        //为什么要分页？
        // 分页会减少前端加载的负荷，提升页面执行的性能，带来良好的用户体验。
        //100条数据，100条数据一次性加载，会带来浪费。
        //如果从网络请求数据，分页会减轻服务器的压力和传输的压力。
        // 移动端分页 ，加载更多
        // 第几页，每页几条  固定10条，数组的内置的方法
        listdatas:[],
        listdatas1: [{
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                     }],//已经入库的数据
        listdatas2:[],//未入库的数据
        listdatas3:[],//已经派件的数据
        //第几页
        currentnum1: 1,
        currentnum2: 1,
        nowpage:1,
        maxpage1:0,
        maxpage2:0,
        //每页几条
        fixednum: 5,
        //分页的数据结果集:
        pagelists: [],
        text: "加载更多",
        flag: false
    },
    onInit() {
        let httpRequest = http.createHttp();
        httpRequest.on('headerReceive', (err, data) => {
        });
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/user/getSendExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    uid:this.uid,
                    page_num:1,
                    page_size:5,
                    state:"所有"
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                this.listdatas1=new Array();
                // data.result为http响应内容，可根据业务需要进行解析
                var json=JSON.parse(data.result)
                console.info("count"+json.data.count)
                this.maxpage1=json.data.count/this.fixednum;
                if(json.code==200){
                    for(var i =0;i< json.data.data.length;i++){
                        console.info(111)
                        console.info(JSON.stringify(json.data.data[i]));
                        this.listdatas1.push({
                            id:json.data.data[i].eid,
                            from:json.data.data[i].from_address,
                            to:json.data.data[i].to_address
                        })
                    }
                    console.info(JSON.stringify(this.listdatas1))
                    this.pagelists=this.listdatas1
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );

        let httpRequest2 = http.createHttp();
        httpRequest2.on('headerReceive', (err, data) => {
        });
        httpRequest2.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/user/getReceiptExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    uid:this.uid,
                    page_num:1,
                    page_size:5,
                    state:"所有"
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json=JSON.parse(data.result)
                console.info(json.data.count)
                this.maxpage2=json.data.count/this.fixednum;
                if(json.code==200){
                    for(var i =0;i< json.data.data.length;i++){
                        console.info(JSON.stringify(json.data.data[i]));
                        this.listdatas2.push({
                            id:json.data.data[i].eid,
                            from:json.data.data[i].from_location,
                            to:json.data.data[i].to_address
                        })
                    }
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest2.destroy();
            }
        }
        );
//
//
//
//        let httpRequest3 = http.createHttp();
//        httpRequest3.on('headerReceive', (err, data) => {
//        });
//        httpRequest3.request(
//            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
//            "http://175.27.240.185:8080/admin/getExpressList",
//            {
//                method: 'POST', // 可选，默认为http.RequestMethod.GET
//                // 开发者根据自身业务需要添加header字段
//                header: {
//                    'Content-Type': 'application/json'
//                },
//                // 当使用POST请求时此字段用于传递内容
//                extraData: {
//                    page_num:1,
//                    page_size:5,
//                    state:"配送中"
//                },
//                connectTimeout: 60000, // 可选，默认为60s
//                readTimeout: 60000, // 可选，默认为60s
//            }, (err, data) => {
//            if (!err) {
//                // data.result为http响应内容，可根据业务需要进行解析
//                var json=JSON.parse(data.result)
//                console.info(json.code)
//                if(json.code==200){
//                    this.listdatas=new Array()
//                    for(var i =0;i< json.data.data.length;i++){
//                        console.info(JSON.stringify(json.data.data[i]));
//                        this.listdatas3.push({
//                            id:json.data.data[i].eid,
//                            from:json.data.data[i].from_address,
//                            to:json.data.data[i].to_address
//                        })
//                    }
//                }
//            } else {
//                console.info('error:' + JSON.stringify(err));
//                // 当该请求使用完毕时，调用destroy方法主动销毁。
//                httpRequest3.destroy();
//            }
//        }
//        );

    },
    changetrack(e) {
        this.trackNumber = e.text;
    },
    search() {
        console.info(this.trackNumber)

        router.push({
            uri: 'pages/deliveryMail/deliveryMail',
            params: {
                eid:this.trackNumber,
                uid:this.uid
            },
        });
    },
    detailsearch(a) {
        console.info(a)
        if(this.nowpage==1)
        {
            router.push({
                uri: 'pages/deliveryMail/deliveryMail',
                params: {
                    eid:a,
                    uid:this.uid,
                },
            });
        }
        else if(this.nowpage==2)
        {
            router.push({
                uri: 'pages/deliveryMail/deliveryMail',
                params: {
                    eid:a,
                    uid:this.uid,
                    user:1
                },
            });
        }
    },
    deliSearch() {
        this.color = this.truecolor
        this.color1 = this.falsecolor;
        this.color2 = this.falsecolor;
        this.textcolor1 = this.falsecolor;
        this.textcolor2 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2;
        this.pagelists=this.listdatas1;
        this.nowpage=1;
        this.flag=false;
        this.text="加载更多"
    },
    deliSearch1() {
        this.color1 = this.truecolor
        this.color = this.falsecolor;
        this.color2 = this.falsecolor
        this.textcolor2 = this.falsecolor;
        this.textcolor1 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2
        this.pagelists=this.listdatas2;
        this.nowpage=2;
        this.flag=false;
        this.text="加载更多"
    },
    deliSearch2() {
        console.info(2222)
        router.push({
            uri: 'pages/DoorPickup/DoorPickup',
            params: {
                uid:this.uid,
            },
        })
//        this.color2 = this.truecolor
//        this.color1 = this.falsecolor;
//        this.color = this.falsecolor
//        this.textcolor3 = this.falsecolor;
//        this.textcolor2 = this.falsecolor2;
//        this.textcolor1 = this.falsecolor2
//        this.listdatas=this.listdatas3;
//        this.currentnum=1;
//        this.showData(this.currentnum);
    },
    loaddata() {
        if(this.nowpage==1)
        {
            ++this.currentnum1;
            this.showData(this.currentnum1,1);
        }
        else{
            ++this.currentnum2;
            this.showData(this.currentnum2,2);
        }
    },
    showData(curnum,a) {
        //36/5=7..1  8页
        //三元运算符
        if(a==1)
        {
            if(curnum<=this.maxpage1)
            {
                let httpRequest = http.createHttp();
                httpRequest.on('headerReceive', (err, data) => {
                });
                httpRequest.request(
                    // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                    "http://175.27.240.185:8080/user/getSendExpressList",
                    {
                        method: 'POST', // 可选，默认为http.RequestMethod.GET
                        // 开发者根据自身业务需要添加header字段
                        header: {
                            'Content-Type': 'application/json'
                        },
                        // 当使用POST请求时此字段用于传递内容
                        extraData: {
                            uid:this.uid,
                            page_num:this.currentnum1,
                            page_size:this.fixednum,
                            state:"所有"
                        },
                        connectTimeout: 60000, // 可选，默认为60s
                        readTimeout: 60000, // 可选，默认为60s
                    }, (err, data) => {
                    if (!err) {
                        // data.result为http响应内容，可根据业务需要进行解析
                        var json=JSON.parse(data.result)
                        console.info(json.data.count)
                        this.maxpage1=json.data.count/this.fixednum;
                        if(json.code==200){
                            for(var i =0;i< json.data.data.length;i++){
                                console.info(111)
                                console.info(JSON.stringify(json.data.data[i]));
                                this.listdatas1.push({
                                    id:json.data.data[i].eid,
                                    from:json.data.data[i].from_address,
                                    to:json.data.data[i].to_address
                                })
                            }
                            console.info(JSON.stringify(this.listdatas1))
                            this.pagelists=this.listdatas1
                        }
                    } else {
                        console.info('error:' + JSON.stringify(err));
                        // 当该请求使用完毕时，调用destroy方法主动销毁。
                        httpRequest.destroy();
                    }
                }
                );
            }
            else
            {
                prompt.showToast({
                    message: "用户您好，数据已经到底了",
                    duration: 4000
                })

                this.text = "用户您好，数据已经到底了";
                this.flag = true;
            }
        }
        else{
            if(curnum<=this.maxpage2)
            {
                let httpRequest2 = http.createHttp();
                httpRequest2.on('headerReceive', (err, data) => {
                });
                httpRequest2.request(
                    // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                    "http://175.27.240.185:8080/user/getReceiptExpressList",
                    {
                        method: 'POST', // 可选，默认为http.RequestMethod.GET
                        // 开发者根据自身业务需要添加header字段
                        header: {
                            'Content-Type': 'application/json'
                        },
                        // 当使用POST请求时此字段用于传递内容
                        extraData: {
                            uid:this.uid,
                            page_num:this.currentnum2,
                            page_size:this.fixednum,
                            state:"所有"
                        },
                        connectTimeout: 60000, // 可选，默认为60s
                        readTimeout: 60000, // 可选，默认为60s
                    }, (err, data) => {
                    if (!err) {
                        // data.result为http响应内容，可根据业务需要进行解析
                        var json=JSON.parse(data.result)
                        console.info(json.data.count)
                        this.maxpage2=json.data.count/this.fixednum;
                        if(json.code==200){
                            for(var i =0;i< json.data.data.length;i++){
                                console.info(JSON.stringify(json.data.data[i]));
                                this.listdatas2.push({
                                    id:json.data.data[i].eid,
                                    from:json.data.data[i].from_location,
                                    to:json.data.data[i].to_address
                                })
                            }
                            console.info(JSON.stringify(this.listdatas2))
                            this.pagelists=this.listdatas2
                        }
                    } else {
                        console.info('error:' + JSON.stringify(err));
                        // 当该请求使用完毕时，调用destroy方法主动销毁。
                        httpRequest2.destroy();
                    }
                }
                );
            }
            else
            {
                prompt.showToast({
                    message: "用户您好，数据已经到底了",
                    duration: 4000
                })

                this.text = "用户您好，数据已经到底了";
                this.flag = true;
            }
        }


    }
}



