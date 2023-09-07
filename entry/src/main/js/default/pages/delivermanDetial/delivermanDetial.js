import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        mid:0,
        id:"",
        userName:"",
        realName:"",
        info:"",
        email:"",
        face:"",
        weburl:"http://175.27.240.185:8080/img/",
        imageurl:"",
        phone:"",
    },
    onInit() {
        console.info("这里是快递员信息，mid是"+this.mid)
        this.imageurl=this.weburl+this.face;
        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/getExpressmanByMid",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    mid:this.mid


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
                var list=json.data
                this.imageurl=list.face+this.weburl
                this.userName=list.nickname
                this.email=list.email
                this.phone=list.phone
                this.realName=list.real_name
                this.id=list.id_card
                this.info=list.info


                if(json.code==200){
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
        /**/
    },
    back(){
        router.back({
            path: "pages/deliverymanCenter/deliverymanCenter"
        })
    },
    GotoModify(){
        router.push({
            uri: "pages/deliverymanModify/deliverymanModify",
            params: {
                mid:this.mid,
                userName:this.userName,
                realName:this.realName,
                email:this.email,
                info:this.info,
                id:this.id,
                face:this.face,
                phone:this.phone,
            },
        })
    }
}
