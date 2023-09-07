import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';
var type=1;
export default {
    data: {
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
        flag2:true,
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
        currentnum: 1,
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
            "http://175.27.240.185:8080/admin/getExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    page_num:this.currentnum,
                    page_size:5,
                    state:"目的站;中转站;"
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json=JSON.parse(data.result)
                console.info(json.code)
                if(json.code==200){
                    this.listdatas1=new Array()
                    for(var i =0;i< json.data.data.length;i++){
                        console.info(JSON.stringify(json.data.data[i]));
                        this.listdatas1.push({
                            id:json.data.data[i].eid,
                            from:json.data.data[i].from_location,
                            to:json.data.data[i].to_address
                        })
                    }
                    console.info(JSON.stringify(this.listdatas1))
                    this.listdatas=this.listdatas1
                    this.showData(this.currentnum)
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
            "http://175.27.240.185:8080/admin/getExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    page_num:this.currentnum,
                    page_size:5,
                    state:"待入库"
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json=JSON.parse(data.result)
                console.info(json.code)
                if(json.code==200){
                    this.listdatas=new Array()
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



        let httpRequest3 = http.createHttp();
        httpRequest3.on('headerReceive', (err, data) => {
        });
        httpRequest3.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/admin/getExpressList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    page_num:this.currentnum,
                    page_size:5,
                    state:"配送中"
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json=JSON.parse(data.result)
                console.info(json.code)
                if(json.code==200){
                    this.listdatas=new Array()
                    for(var i =0;i< json.data.data.length;i++){
                        console.info(JSON.stringify(json.data.data[i]));
                        this.listdatas3.push({
                            id:json.data.data[i].eid,
                            from:json.data.data[i].from_address,
                            to:json.data.data[i].to_address
                        })
                    }
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest3.destroy();
            }
        }
        );

    },
    changetrack(e) {
        this.trackNumber = e.text;
    },
    search() {
        console.info(this.trackNumber)

        router.push({
            uri: 'pages/deliveryMail/deliveryMail',
            params: {
                eid:this.trackNumber
            },
        });
    },
    detailsearch(a) {
        console.info(a)
        router.push({
            uri: 'pages/deliveryMail/deliveryMail',
            params: {
                eid:a
            },
        });
    },
    statechange(a){
        router.push({
            uri:'pages/deliveryMail/deliveryMail',
            params:{
                eid:a,
                myshow:true,
                nid:this.nid,
            }
        })
    },
    deliSearch() {
        this.color = this.truecolor
        this.color1 = this.falsecolor;
        this.color2 = this.falsecolor;
        this.textcolor1 = this.falsecolor;
        this.textcolor2 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2;
        this.listdatas=this.listdatas1;
        this.currentnum=1;
        this.showData(this.currentnum);
        this.flag = false;
        this.text="加载更多";
        type=1;
        this.flag2=true;
    },
    deliSearch1() {
        this.color1 = this.truecolor
        this.color = this.falsecolor;
        this.color2 = this.falsecolor
        this.textcolor2 = this.falsecolor;
        this.textcolor1 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2
        this.listdatas=this.listdatas2;
        this.currentnum=1;
        this.showData(this.currentnum);
        this.flag2=true;
        this.flag = false;
        this.text="加载更多";
        type=2;
    },
    deliSearch2() {
        this.color2 = this.truecolor
        this.color1 = this.falsecolor;
        this.color = this.falsecolor
        this.textcolor3 = this.falsecolor;
        this.textcolor2 = this.falsecolor2;
        this.textcolor1 = this.falsecolor2
        this.listdatas=this.listdatas3;
        this.currentnum=1;
        this.showData(this.currentnum);
        this.flag = false;
        this.text="加载更多";
        this.flag2=false;
        type=3;
    },
    loaddata() {
        ++this.currentnum;
        if(type==1){
            console.info(this.currentnum)
            let httpRequest = http.createHttp();
            httpRequest.on('headerReceive', (err, data) => {
            });
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/admin/getExpressList",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        page_num:this.currentnum,
                        page_size:5,
                        state:"目的站;中转站;"
                    },
                    connectTimeout: 60000, // 可选，默认为60s
                    readTimeout: 60000, // 可选，默认为60s
                }, (err, data) => {
                if (!err) {
                    // data.result为http响应内容，可根据业务需要进行解析
                    var json=JSON.parse(data.result)
                    console.info(json.code)
                    if(json.code==200){
                        for(var i =0;i< json.data.data.length;i++){
                            console.info(JSON.stringify(json.data.data[i]));
                            this.listdatas1.push({
                                id:json.data.data[i].eid,
                                from:json.data.data[i].from_location,
                                to:json.data.data[i].to_address
                            })
                        }
                        console.info(JSON.stringify(this.listdatas1))
                        this.listdatas=this.listdatas1
                        this.showData(this.currentnum);
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            }
            );
        }
        if(type==2){
            let httpRequest2 = http.createHttp();
            httpRequest2.on('headerReceive', (err, data) => {
            });
            httpRequest2.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/admin/getExpressList",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        page_num:this.currentnum,
                        page_size:5,
                        state:"待入库"
                    },
                    connectTimeout: 60000, // 可选，默认为60s
                    readTimeout: 60000, // 可选，默认为60s
                }, (err, data) => {
                if (!err) {
                    // data.result为http响应内容，可根据业务需要进行解析
                    var json=JSON.parse(data.result)
                    console.info(json.code)
                    if(json.code==200){
                        for(var i =0;i< json.data.data.length;i++){
                            console.info(JSON.stringify(json.data.data[i]));
                            this.listdatas2.push({
                                id:json.data.data[i].eid,
                                from:json.data.data[i].from_location,
                                to:json.data.data[i].to_address
                            })
                        }
                        this.listdatas=this.listdatas2;
                        this.showData(this.currentnum);
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest2.destroy();
                }
            }
            );
        }
        if(type==3){
            let httpRequest3 = http.createHttp();
            httpRequest3.on('headerReceive', (err, data) => {
            });
            httpRequest3.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/admin/getExpressList",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        page_num:this.currentnum,
                        page_size:5,
                        state:"配送中"
                    },
                    connectTimeout: 60000, // 可选，默认为60s
                    readTimeout: 60000, // 可选，默认为60s
                }, (err, data) => {
                if (!err) {
                    // data.result为http响应内容，可根据业务需要进行解析
                    var json=JSON.parse(data.result)
                    console.info(json.code)
                    if(json.code==200){
                        for(var i =0;i< json.data.data.length;i++){
                            console.info(JSON.stringify(json.data.data[i]));
                            this.listdatas3.push({
                                id:json.data.data[i].eid,
                                from:json.data.data[i].from_address,
                                to:json.data.data[i].to_address
                            })
                        }
                        this.listdatas=this.listdatas3
                        this.showData(this.currentnum);
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest3.destroy();
                }
            }
            );
        }
    },
    showData(curnum) {
        //36/5=7..1  8页
        //三元运算符

        console.info("数据集"+JSON.stringify(this.listdatas))
        let pageSize = this.listdatas.length % this.fixednum == 0 ?
            this.listdatas.length / this.fixednum : Math.floor(this.listdatas.length / this.fixednum) + 1;

        if (curnum > pageSize) {
            prompt.showToast({
                message: "用户您好，数据已经到底了",
                duration: 4000
            })

            this.text = "用户您好，数据已经到底了";
            this.flag = true;


        }
        else {
            //执行分页  第一个参数:从0开始  第二个参数:不到end  (end-1)
            this.pagelists = this.listdatas.slice(0, curnum * this.fixednum);
        }


    }
}



