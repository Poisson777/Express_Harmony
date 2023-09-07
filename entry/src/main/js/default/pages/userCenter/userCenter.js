import router from '@system.router';
import prompt from '@system.prompt';
import fetch from '@system.fetch';
import http from '@ohos.net.http';

export default {
    data: {
        uid: 0,
        weburl:"http://175.27.240.185:8080/img/",
        imageurl:"",
        face:"",
        title: "",
        userName: "哈哈大王",
        realName:"",
        id:"",
        info:"",
        email:"",
        number_finished:0,
        number_unfinished: 0,
        data1:[],
        phone:"",
    },
    onInit() {
        console.info("个人中心uid"+this.uid);
        this.title = "个人中心";
        this.getAllUserMessage();
        this.getSendNum();
        this.getReceiveNum();
    },
    onShow(){
        this.getAllUserMessage();
    },
    exit(){
        router.push({
            uri: "pages/index/index",
            params: {
            },
        })
    },
    getAllUserMessage() {
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
            "http://175.27.240.185:8080/user/getUserByUid",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    uid:this.uid,
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
                this.data1=json.data;
                this.userName=json.data.nickname;
                this.realName=json.data.real_name;
                this.email=json.data.email;
                this.info=json.data.info;
                this.id=json.data.id_card;
                this.face=json.data.face;
                this.phone=json.data.phone;
                this.imageurl=this.weburl+this.face;
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        })
    },
    getSendNum(){
        let httpRequest1 = http.createHttp();
        httpRequest1.on('headerReceive', (err, data) => {
        });
        httpRequest1.request(
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
                this.number_finished=json.data.count;
                console.info("count"+json.data.count)
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest1.destroy();
            }
        }
        );
    },
    getReceiveNum(){
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
                this.number_unfinished=json.data.count;
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest2.destroy();
            }
        }
        );
    },
    GotoDetail() {
        router.push({
            uri: "pages/userCenterDetail/userCenterDetail",
            params: {
                uid:this.uid,
                userName:this.userName,
                realName:this.realName,
                email:this.email,
                info:this.info,
                id:this.id,
                face:this.face,
                phone:this.phone,
            },
        })
    },
    GotoAddress() {
        router.push({
            uri: "pages/photoModify/photoModify",
            params: {
                uid:this.uid,
                face:this.face,
                userName:this.userName,
                info:this.info,
            },
        })
    },
    GotoAboutUs(){
        router.push({
            uri: "pages/aboutUs/aboutUs",
            params: {
                uid:this.uid,
                face:this.face,
                userName:this.userName,
                info:this.info,
            },
        })
    }
}
