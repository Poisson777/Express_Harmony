import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';
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
        //建议大家1.本地数据  2.网络数据
        //为什么要分页？
        // 分页会减少前端加载的负荷，提升页面执行的性能，带来良好的用户体验。
        //100条数据，100条数据一次性加载，会带来浪费。
        //如果从网络请求数据，分页会减轻服务器的压力和传输的压力。
        // 移动端分页 ，加载更多
        // 第几页，每页几条  固定10条，数组的内置的方法
        listdatas: [{
                        id: "d3b7c090-5a3e-4ed1-a4d7-5e7ff08bc4d4",
                        from: "福建省福州市123",
                        to: "福建省福州市432",
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
                    }],
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
                    page_num:1,
                    page_size:5,
                    state:"目的站"
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
                         this.listdatas.push({
                            id:json.data.data[i].eid,
                            from:json.data.data[i].from_location,
                            to:json.data.data[i].to_address
                        })
                    }
                    this.showData(this.currentnum);
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },
    changetrack(e) {
        this.trackNumber = e.text;
    },
    search() {
        console.log(this.trackNumber)

        router.push({
            uri: 'pages/deliveryMail/deliveryMail',
            params: {
                eid:this.trackNumber
            },
        });
    },
    detailsearch(a) {
        console.log(a)
        router.push({
            uri: 'pages/deliveryMail/deliveryMail',
            params: {
                eid:a
            },
        });
    },
    deliSearch() {
        this.color = this.truecolor
        this.color1 = this.falsecolor;
        this.color2 = this.falsecolor;
        this.textcolor1 = this.falsecolor;
        this.textcolor2 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2;
    },
    deliSearch1() {
        this.color1 = this.truecolor
        this.color = this.falsecolor;
        this.color2 = this.falsecolor
        this.textcolor2 = this.falsecolor;
        this.textcolor1 = this.falsecolor2;
        this.textcolor3 = this.falsecolor2
    },
    deliSearch2() {
        this.color2 = this.truecolor
        this.color1 = this.falsecolor;
        this.color = this.falsecolor
        this.textcolor3 = this.falsecolor;
        this.textcolor2 = this.falsecolor2;
        this.textcolor1 = this.falsecolor2
    },
    loaddata() {
        ++this.currentnum;
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
                    state:"目的站"
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
                        this.listdatas.push({
                            id:json.data.data[i].eid,
                            from:json.data.data[i].from_location,
                            to:json.data.data[i].to_address
                        })
                    }
                    this.showData(this.currentnum);
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },
    showData(curnum) {
        //36/5=7..1  8页
        //三元运算符
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



