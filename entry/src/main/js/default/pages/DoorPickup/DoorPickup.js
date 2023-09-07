import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';

export default {
    data: {
        uid: 0,
        title: "",
        nowid:0,
        nowindex:0,
        trackNumber: "",
        //建议大家1.本地数据  2.网络数据
        //为什么要分页？
        // 分页会减少前端加载的负荷，提升页面执行的性能，带来良好的用户体验。
        //100条数据，100条数据一次性加载，会带来浪费。
        //如果从网络请求数据，分页会减轻服务器的压力和传输的压力。
        // 移动端分页 ，加载更多
        // 第几页，每页几条  固定10条，数组的内置的方法
        listdatas: [],
        listdatas1: [{
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                         status: "accept"
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                         status: "isAccept"
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                         status: "finished"
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                         status: "finished"
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                         status: "finished"
                     }, {
                         id: "DF456456456",
                         from: "福州市",
                         to: "泉州",
                         status: "finished"
                     }], //已经入库的数据
        listdatas2: [], //未入库的数据
        listdatas3: [], //已经派件的数据
        //第几页
        currentnum: 1,
        //每页几条
        fixednum: 5,
        maxpage:0,
        //分页的数据结果集:
        pagelists: [],
        text: "加载更多",
        flag: false
    },
    onInit() {
        console.info(1111)
        let httpRequest = http.createHttp();
        httpRequest.on('headerReceive', (err, data) => {
        });
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/user/getUserRequest",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    uid: this.uid,
                    page_num: 1,
                    page_size: 5
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json = JSON.parse(data.result)
                console.info(json.code)
                this.maxpage=json.data.length/this.fixednum;
                console.info("最大数"+json.data.length)
                if (json.code == 200) {
                    this.listdatas = new Array()
                    this.listdatas1 = new Array()
                    for (var i = 0;i < json.data.data.length; i++) {
                        console.info(111)
                        console.info(JSON.stringify(json.data.data[i]));
                        this.listdatas1.push({
                            id: json.data.data[i].request_id,
                            from: json.data.data[i].address,
                            to: json.data.data[i].content,
                            status: json.data.data[i].status
                        })
                    }
                    console.info(JSON.stringify(this.listdatas1))
                    this.pagelists = this.listdatas1
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
//        this.listdatas = this.listdatas1
//        this.showData(this.currentnum)
    },
    back() {
        router.back({
            path: "pages/userSearch/userSearch"
        })
    },
    showDialog(a,b) {
        this.nowid=a;
        this.nowindex=b
        this.$element('hintDialog').show()
    },
    hideDialog() {
        this.$element('hintDialog').close()
    },
    changetrack(e) {
        this.trackNumber = e.value;
    },
    search() {
        console.log(this.trackNumber)
    },
    detailsearch(a,b) {
        a=this.nowid
        b=this.nowindex
        console.info(a)
        console.info(b)
        let httpRequest2 = http.createHttp();
        httpRequest2.on('headerReceive', (err, data) => {
        });
        httpRequest2.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/user/cancelUserRequest",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    uid: this.uid,
                    request_id:a,
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json = JSON.parse(data.result)
                console.info(json.code)
                this.listdatas1[b].status="cancel";
                this.listdatas = this.listdatas1
                this.showData(this.currentnum)
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest2.destroy();
            }
        }
        );
    },
    deliSearch() {
        this.color = this.truecolor
        this.color1 = this.falsecolor;
        this.color2 = this.falsecolor;
        this.textcolor1 = this.falsecolor;
        this.textcolor2 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2;
        this.listdatas = this.listdatas1;
        this.currentnum = 1;
        this.showData(this.currentnum);
    },
    deliSearch1() {
        this.color1 = this.truecolor
        this.color = this.falsecolor;
        this.color2 = this.falsecolor
        this.textcolor2 = this.falsecolor;
        this.textcolor1 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2
        this.listdatas = this.listdatas2;
        this.currentnum = 1;
        this.showData(this.currentnum);
    },
    loaddata() {
        ++this.currentnum;
        this.showData(this.currentnum);
    },
    showData(curnum) {
        //36/5=7..1  8页
        //三元运算符
        if(curnum<=this.maxpage)
        {
            let httpRequest1 = http.createHttp();
            httpRequest1.on('headerReceive', (err, data) => {
            });
            httpRequest1.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/user/getUserRequest",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        uid: this.uid,
                        page_num: this.currentnum,
                        page_size: this.fixednum
                    },
                    connectTimeout: 60000, // 可选，默认为60s
                    readTimeout: 60000, // 可选，默认为60s
                }, (err, data) => {
                if (!err) {
                    // data.result为http响应内容，可根据业务需要进行解析
                    var json = JSON.parse(data.result)
                    console.info(json.code)
                    this.maxpage=json.data.length/this.fixednum;
                    if (json.code == 200) {
                        for (var i = 0;i < json.data.data.length; i++) {
                            console.info(111)
                            console.info(JSON.stringify(json.data.data[i]));
                            this.listdatas1.push({
                                id: json.data.data[i].request_id,
                                from: json.data.data[i].address,
                                to: json.data.data[i].content,
                                status: json.data.data[i].status
                            })
                        }
                        console.info(JSON.stringify(this.listdatas1))
                        this.pagelists = this.listdatas1
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest1.destroy();
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
