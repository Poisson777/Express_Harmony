import prompt from '@system.prompt';
import fetch from '@system.fetch';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        mid:0,

        trackNumber:"",
        lanjian:"接单",
        state:"待接单",
        //第几页
        currentnum:1,
        //分页的数据结果集:
        pagelists:[


                   ],
        text:"加载更多",
        flag:false,
        text1:"#ffffff",
        text2:"#1684FC",
        background1:"#FF9575",
        background2:"#ffffff"

    },
    onInit() {
        this.get_waitPick();
    },

    get_waitPick(){

        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/getUserRequest",
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
                    location:this.location

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
                var list=json.data.data
                for(var i=0;i<list.length;i++)
                {
                    this.pagelists.push(list[i])
                }
                if(list.length<5)
                {
                    this.flag=true
                }
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
    get_picked() {
        let httpRequest = http.createHttp();
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            "http://175.27.240.185:8080/expressman/getAcceptRequest",
            {
                method: 'POST', // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    eid:this.mid,
                    page_num:this.currentnum,
                    page_size:5

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
                var list=json.data.data
                for(var i=0;i<list.length;i++)
                {
                    this.pagelists.push(list[i])
                }
                if(list.length<5)
                {
                    this.flag=true
                }
                if(json.code==200){

                }
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );
    },

    search_waitPick(){
        if(this.state!="待接单"){
            this.flag=false;
            this.currentnum=1;
            this.pagelists=[];
            this.lanjian="接单";
            this.get_waitPick();
            this.state="待接单";
            this.text1="#ffffff",
            this.text2="#1684FC",
            this.background1="#FF9575",
            this.background2="#ffffff"
        }
    },
    search_Picked(){
        if(this.state!="已接单"){
            this.flag=false;
            this.currentnum=1;
            this.pagelists=[];
            this.lanjian="创建订单";
            this.get_picked();
            this.state="已接单";
            this.text1="#1684FC",
            this.text2="#ffffff",
            this.background1="#ffffff",
            this.background2="#FF9575"
        }
    },
    loaddata()
    {
        ++this.currentnum;
        if(this.flag)
        {
            prompt.showToast({
                message:"用户您好，数据已经到底了",
                duration:4000

            })

            this.text="用户您好，数据已经到底了";
        }
        else{
            if(this.state=="待接单")
            {
                this.get_waitPick()
            }
            else if(this.state=="已接单")
            {
                this.get_picked()
            }

        }

    },
    torch(item){
        if(this.state=="待接单")
        {
            for(var i=0;i<this.pagelists.length;i++)
            {
                if(item.request_id==this.pagelists[i].request_id)
                {
                    this.pagelists.splice(i,1);
                    break
                }
            }
            let httpRequest = http.createHttp();
            httpRequest.request(
                // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
                "http://175.27.240.185:8080/expressman/acceptRequest",
                {
                    method: 'POST', // 可选，默认为http.RequestMethod.GET
                    // 开发者根据自身业务需要添加header字段
                    header: {
                        'Content-Type': 'application/json'
                    },
                    // 当使用POST请求时此字段用于传递内容
                    extraData: {
                        uid:item.uid,
                        eid:this.mid,
                    request_id:item.request_id


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
                    if(json.code==200){
                        prompt.showToast({
                            message: '成功接受订单',
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
            /**/
        }
        else
        {
            router.push({
                uri: 'pages/send/send',
                params: {
                    request_id:item.request_id,
                    type:"expressman",
                    mid:this.mid,
                    current_location:item.location


                },
            });
        }

    }


}



