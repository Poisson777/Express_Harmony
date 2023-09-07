import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';
export default {
    data: {
        title: "",
        weburl:"http://175.27.240.185:8080/img/",
        address:[{name:"名字",fid:"12345123452",face:"福建省福州市XXXXXX"},
                 {name:"名字2",fid:"12543543542",face:"福建省福州市XXXXXX"}],
        listdatas1:[],
        nowface:"",
        text: "加载更多",
        flag: false,
        currentnum: 1,
        //每页几条
        fixednum: 5,
        maxpage:0,
    },
    onInit() {
        this.GetFaceList();
    },
    back(){
        router.back({
            path: "pages/userCenter/userCenter"
        })
    },
    GetFaceList(){
        let httpRequest = http.createHttp();
        httpRequest.on('headerReceive', (err, data) => {
        });
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/global/getFaceList",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    "page_num":this.currentnum,
                    "page_size":this.fixednum,
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                var json=JSON.parse(data.result)
                console.info(json.code)
                console.info("查询")
                if(json.code==200){
                    console.info("进入code")
                    console.info("length:"+json.data.data.length)
                    console.info("count:"+json.data.count)
                    this.maxpage=json.data.count/this.fixednum;
                    for(var i =0;i< json.data.data.length;i++){
                        console.info(111)
                        console.info(JSON.stringify(json.data.data[i]));
                        var srcurl=this.weburl+json.data.data[i].url
                        this.listdatas1.push({
                            fid:json.data.data[i].fid,
                            face:json.data.data[i].url,
                            name:json.data.data[i].name
                        })
                    }
                    console.info(JSON.stringify(this.listdatas1))
                    this.address=this.listdatas1;
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },
    changeFace(a){
        prompt.showToast({
            message: '图像已更新选定，请确认修改',
            duration: 3000,
        });
        this.nowface=a;
    },
    setNewPhoto(a){
        if(this.nowface.length==0)
        {
            prompt.showToast({
                message: '请先选择头像',
                duration: 3000,
            });
        }
        else{
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
                "http://175.27.240.185:8080/user/updateInfo",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        uid: this.uid,
                        nickname: this.userName,
                        info: this.info,
                        face: this.nowface,
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
                    prompt.showToast({
                        message: '头像修改成功！',
                        duration: 3000,
                    });
                    router.back({
                        path: "pages/userCenter/userCenter"
                    })
                } else {
                    console.info('error:' + JSON.stringify(err));
                    // 当该请求使用完毕时，调用destroy方法主动销毁。
                    httpRequest.destroy();
                }
            })
        }
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
            this.GetFaceList();
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
