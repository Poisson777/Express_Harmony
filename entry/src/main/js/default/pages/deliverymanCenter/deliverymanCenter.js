import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        userName: "哈哈大王",
        number_finished:"12",
        number_unfinished:"30",
        mid:0
    },
    onInit() {
            console.info("这里是个人中心，mid是"+this.mid)
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

                this.userName=list.nickname





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
    to_delivermanDetial()
    {
        router.push({
            uri: "pages/delivermanDetial/delivermanDetial",
            params: {
                mid: this.mid,
            },
        })
    },
    torch1()
    {
        router.push({
            uri: "pages/delivermanDetial/delivermanDetial",
            params: {
                mid: this.mid,
            },
        })
    },
    torch2()
    {
        router.push({
            uri: "pages/index/index",
            params: {

            },
        })
    }

}
